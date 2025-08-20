import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { nanoid } from 'nanoid';
import pg from 'pg';
import { Connector } from '@google-cloud/cloud-sql-connector';

const app = express();
// Cloud Run injects PORT. Fall back to 8080 locally.
const port = Number(process.env.PORT) || 8080;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
// Model selection: comma-separated list, we will try in order on 429/5xx
const GEMINI_MODELS = (process.env.GEMINI_MODELS || 'gemini-2.5-pro,gemini-1.5-flash').split(',').map(s=>s.trim()).filter(Boolean);
// Feature flags
const USE_EMBEDDING = String(process.env.USE_EMBEDDING || '').toLowerCase() === 'true';
const AGENT_JSON_ONLY = String(process.env.AGENT_JSON_ONLY || '').toLowerCase() === 'true';

app.use(cors());
app.use(express.json());
// Explicitly handle CORS preflight for all routes
app.options('*', cors());

// Initialize DB
const db = new Database('chat.db');
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS threads (
    id TEXT PRIMARY KEY,
    title TEXT,
    category TEXT,
    created_at INTEGER
  );
  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    thread_id TEXT,
    role TEXT,
    content TEXT,
    created_at INTEGER,
    FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE
  );
`);

// Helpers
const now = () => Date.now();
const getThread = db.prepare('SELECT * FROM threads WHERE id = ?');
const listThreads = db.prepare('SELECT * FROM threads ORDER BY created_at DESC');
const insertThread = db.prepare('INSERT INTO threads (id, title, category, created_at) VALUES (?, ?, ?, ?)');
const updateThreadTitle = db.prepare('UPDATE threads SET title = ? WHERE id = ?');
const deleteThreadStmt = db.prepare('DELETE FROM threads WHERE id = ?');

const listMessages = db.prepare('SELECT * FROM messages WHERE thread_id = ? ORDER BY created_at ASC');
const insertMessage = db.prepare('INSERT INTO messages (id, thread_id, role, content, created_at) VALUES (?, ?, ?, ?, ?)');
const deleteMessageStmt = db.prepare('DELETE FROM messages WHERE id = ? AND thread_id = ?');

async function generateTitleFromText(userText) {
  const base = String(userText || '').trim();
  const fallback = base.slice(0, 24) || '새 채팅';
  if (!process.env.GEMINI_API_KEY) return fallback;
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `문장: "${base}"
간결하고 의미를 잘 담은 한국어 제목을 만들어 주세요. 16자 이내, 구어체 금지, 특수문자 금지.`;
    const r = await model.generateContent({ contents: [{ role: 'user', parts: [{ text: prompt }] }] });
    const title = (r.response.text() || '').replace(/\n/g, ' ').trim().slice(0, 24);
    return title || fallback;
  } catch {
    return fallback;
  }
}

// Health and root
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.get('/', (_req, res) => res.type('text/plain').send('Backend is running. Use /api/health or POST /api/threads/:id/chat'));

// Threads
app.get('/api/threads', (_req, res) => {
  res.json({ threads: listThreads.all() });
});

app.post('/api/threads', (req, res) => {
  const id = nanoid();
  const { title = '새 채팅', category = 'general' } = req.body || {};
  insertThread.run(id, title, category, now());
  res.status(201).json({ id });
});

app.delete('/api/threads/:id', (req, res) => {
  deleteThreadStmt.run(req.params.id);
  res.json({ ok: true });
});

app.patch('/api/threads/:id', (req, res) => {
  const { title } = req.body || {};
  if (!title || String(title).trim().length === 0) {
    return res.status(400).json({ error: 'title required' });
  }
  updateThreadTitle.run(String(title).trim().slice(0, 80), req.params.id);
  res.json({ ok: true });
});

// Messages
app.get('/api/threads/:id/messages', (req, res) => {
  res.json({ messages: listMessages.all(req.params.id) });
});

app.delete('/api/threads/:id/messages/:msgId', (req, res) => {
  deleteMessageStmt.run(req.params.msgId, req.params.id);
  res.json({ ok: true });
});

// Chat with Gemini
app.post('/api/threads/:id/chat', async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Server missing GEMINI_API_KEY' });
    }
    const incomingId = req.params.id;
    const threadId = incomingId === 'new' ? nanoid() : incomingId;
    let thread = getThread.get(threadId);
    const userText = String(req.body?.message || '').trim();
    if (!userText) return res.status(400).json({ error: 'message required' });
    if (!thread) {
      const derivedTitle = (req.body.title || (await generateTitleFromText(userText))).trim() || '새 채팅';
      insertThread.run(threadId, derivedTitle, req.body.category || 'chat', now());
      thread = getThread.get(threadId);
    }

    // Persist user message
    const userMsgId = nanoid();
    insertMessage.run(userMsgId, threadId, 'user', userText, now());

    async function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }
    async function genWithFallback(contentsArray){
      const maxPerModel = 2;
      for (let idx = 0; idx < GEMINI_MODELS.length; idx++) {
        const modelName = GEMINI_MODELS[idx];
        const model = genAI.getGenerativeModel({ model: modelName });
        let delay = 600;
        for (let attempt = 0; attempt < maxPerModel; attempt++) {
          try {
            const r = await model.generateContent({ contents: contentsArray });
            return { r, modelName };
          } catch (e) {
            const msg = String(e||'');
            if (msg.includes('429') || /too many requests|quota/i.test(msg) || msg.includes('500')) {
              if (attempt < maxPerModel - 1) { await sleep(delay); delay *= 2; continue; }
              break; // try next model
            }
            throw e;
          }
        }
      }
      throw new Error('All Gemini models failed due to quota or transient errors');
    }
    const { r: result, modelName: usedModel } = await genWithFallback([{ role: 'user', parts: [{ text: userText }] }]);
    const text = result.response.text() || '응답이 비어 있습니다.';

    const botMsgId = nanoid();
    insertMessage.run(botMsgId, threadId, 'model', text, now());

    res.json({ reply: text, messageId: botMsgId, threadId, model: usedModel });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e) });
  }
});

// Search + Generate lineup
app.post('/api/lineup', async (req, res) => {
  try {
    const { mood = '신나는', budget = 50000000, count = 3, festival = '', genre = '', prefer = [] } = req.body || {};

    // 1) (optional) embedding utilities
    const normalizeAscii = (v) => String(v ?? '').replace(/[^\x00-\x7F]/g, '');
    const mapKoreanMood = (m) => {
      const s = String(m||'').toLowerCase();
      if (s.includes('신나')) return 'upbeat';
      if (s.includes('차분')||s.includes('발라드')) return 'calm';
      if (s.includes('감성')) return 'sentimental';
      return s || 'upbeat';
    };
    const mapKoreanGenre = (g) => {
      const s = String(g||'').toLowerCase();
      if (s.includes('댄스')) return 'dance';
      if (s.includes('발라드')) return 'ballad';
      if (s.includes('랩') || s.includes('힙합')) return 'hiphop';
      if (s.includes('r&b') || s.includes('알앤비')) return 'rnb';
      if (s.includes('록') || s.includes('메탈')) return 'rock';
      if (s.includes('인디')) return 'indie';
      if (s.includes('트로트') || s.includes('성인가요')) return 'trot';
      if (s.includes('포크') || s.includes('블루스')) return 'folk';
      if (s.includes('pop') || s.includes('팝')) return 'pop';
      return '';
    };
    const asciiMood = normalizeAscii(mapKoreanMood(mood));
    const asciiFestival = normalizeAscii(festival) || 'festival';
    const asciiGenre = normalizeAscii(mapKoreanGenre(genre));

    // 2) PG connect via Cloud SQL Connector if available
    const connector = new Connector();
    const connection = await connector.getOptions({
      instanceConnectionName: process.env.PG_CONNECTION_NAME, // project:region:instance
    });
    const pool = new pg.Pool({
      ...connection,
      user: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASS,
      database: process.env.PG_DATABASE || 'artist',
    });

    const topK = Math.max(count * 50, 100);
    let candidatesVec = [];
    if (USE_EMBEDDING) {
      const embedModel = genAI.getGenerativeModel({ model: 'text-embedding-004' });
      const queryText = `festival:${asciiFestival} mood:${asciiMood}${asciiGenre?` genre:${asciiGenre}`:''} budget:${budget} count:${count}`;
      const emb = await embedModel.embedContent({ content: { parts: [{ text: queryText }] } });
      const qvec = emb.embedding.values;
      // pg는 기본적으로 다중 문장을 한 번에 실행하지 않습니다. SET과 SELECT를 분리합니다.
      await pool.query('SET ivfflat.probes = 10');
      // pgvector는 벡터 리터럴 문자열('[v1,v2,...]')을 전달하고 ::vector로 캐스팅하는 것이 안전합니다.
      const vecLiteral = `[${qvec.join(',')}]`;
      const where = [ 'appearance_fee <= $2' ];
      const params = [vecLiteral, budget, topK];
      if (genre && String(genre).trim()) {
        // Allow multiple genres separated by comma or slash; match Korean/English synonyms
        const raw = String(genre).split(/[\/,|\s]+/).filter(Boolean);
        const synonyms = (g) => {
          const s = g.toLowerCase();
          if (s.includes('댄스') || s.includes('dance')) return ['댄스', 'dance'];
          if (s.includes('발라드') || s.includes('ballad')) return ['발라드', 'ballad'];
          if (s.includes('힙합') || s.includes('랩') || s.includes('hiphop') || s.includes('rap')) return ['랩/힙합', '힙합', '랩', 'hiphop', 'rap'];
          if (s.includes('soul') || s.includes('알앤비') || s.includes('r&b')) return ['R&B/Soul', 'soul', 'R&B'];
          if (s.includes('록') || s.includes('메탈') || s.includes('rock') || s.includes('metal')) return ['록/메탈', 'rock', 'metal'];
          if (s.includes('인디') || s.includes('indie')) return ['인디음악', 'indie'];
          if (s.includes('트로트') || s.includes('성인가요')) return ['성인가요/트로트', '트로트'];
          if (s.includes('포크') || s.includes('블루스') || s.includes('folk') || s.includes('blues')) return ['포크/블루스', 'folk', 'blues'];
          if (s.includes('pop') || s.includes('팝')) return ['POP', 'pop'];
          return [g];
        };
        const flat = raw.flatMap(synonyms);
        if (flat.length > 0) {
          const startIdx = params.length + 1;
          where.push('(' + flat.map((_, i) => `genre ILIKE $${startIdx + i}`).join(' OR ') + ')');
          for (const g of flat) params.push(`%${g}%`);
        }
      }
      const q = await pool.query(
        `SELECT id,name,genre,appearance_fee,company_name
         FROM artist_clean
         WHERE ${where.join(' AND ')}
         ORDER BY embedding <=> $1::vector
         LIMIT $3`,
        params
      );
      candidatesVec = q.rows || [];
    }

    // Also collect pure budget/genre candidates (increase budget weight)
    const where2 = ['appearance_fee <= $1'];
    const params2 = [budget];
    if (genre && String(genre).trim()) {
      const raw2 = String(genre).split(/[\/,|\s]+/).filter(Boolean);
      const synonyms2 = (g) => {
        const s = g.toLowerCase();
        if (s.includes('댄스') || s.includes('dance')) return ['댄스', 'dance'];
        if (s.includes('발라드') || s.includes('ballad')) return ['발라드', 'ballad'];
        if (s.includes('힙합') || s.includes('랩') || s.includes('hiphop') || s.includes('rap')) return ['랩/힙합', '힙합', '랩', 'hiphop', 'rap'];
        if (s.includes('soul') || s.includes('알앤비') || s.includes('r&b')) return ['R&B/Soul', 'soul', 'R&B'];
        if (s.includes('록') || s.includes('메탈') || s.includes('rock') || s.includes('metal')) return ['록/메탈', 'rock', 'metal'];
        if (s.includes('인디') || s.includes('indie')) return ['인디음악', 'indie'];
        if (s.includes('트로트') || s.includes('성인가요')) return ['성인가요/트로트', '트로트'];
        if (s.includes('포크') || s.includes('블루스') || s.includes('folk') || s.includes('blues')) return ['포크/블루스', 'folk', 'blues'];
        if (s.includes('pop') || s.includes('팝')) return ['POP', 'pop'];
        return [g];
      };
      const flat2 = raw2.flatMap(synonyms2);
      if (flat2.length > 0) {
        const base = params2.length + 1;
        where2.push('(' + flat2.map((_, i) => `genre ILIKE $${base + i}`).join(' OR ') + ')');
        for (const g of flat2) params2.push(`%${g}%`);
      }
    }
    const { rows: candidatesBudget } = await pool.query(
      `SELECT id,name,genre,appearance_fee,company_name
       FROM artist_clean
       WHERE ${where2.join(' AND ')}
       ORDER BY appearance_fee DESC
       LIMIT 500`,
      params2
    );

    // Union candidates (vector + budget)
    const unionMap = new Map();
    for (const r of candidatesVec) unionMap.set(Number(r.id), r);
    for (const r of candidatesBudget) unionMap.set(Number(r.id), r);
    const candidates = Array.from(unionMap.values());

    // Ensure preferred artists are present in candidates
    const preferNames = Array.isArray(prefer) ? prefer.map((n)=>String(n).trim()).filter(Boolean) : [];
    let preferRows = [];
    if (preferNames.length > 0) {
      const lower = preferNames.map((n)=>n.toLowerCase());
      const q = await pool.query(
        `SELECT id,name,genre,appearance_fee,company_name
         FROM artist_clean
         WHERE lower(name) = ANY($1)`,
        [lower]
      );
      preferRows = q.rows || [];
    }

    await pool.end();
    await connector.close();

    // 3) Deterministic best-spend selection (maximize total_fee <= budget with exactly `count` artists)
    // Merge preferred into candidate set
    const byId = new Map();
    for (const c of candidates) byId.set(Number(c.id), c);
    for (const m of preferRows) byId.set(Number(m.id), m);
    const merged = Array.from(byId.values());

    const preferIdSet = new Set(preferRows.map((r)=>Number(r.id)));
    const fees = merged.map(c => ({ id: Number(c.id), fee: Number(c.appearance_fee) || 0 }));

    // If small team size, enumerate and return top 3 combos as well
    if (count === 2 || count === 3) {
      const sorted = [...fees].sort((a, b) => b.fee - a.fee);
      const CAP = Math.min(sorted.length, 100);
      const arr = sorted.slice(0, CAP);
      const combos = [];
      if (count === 2) {
        for (let i = 0; i < arr.length; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            const a = arr[i], b = arr[j];
            const total = a.fee + b.fee;
            if (total > budget) continue;
            const picked = new Set([a.id, b.id]);
            let ok = true;
            for (const pid of preferIdSet) { if (!picked.has(pid)) { ok = false; break; } }
            if (!ok) continue;
            combos.push({ lineup: [a, b], total_fee: total });
          }
        }
      } else {
        for (let i = 0; i < arr.length; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            for (let k = j + 1; k < arr.length; k++) {
              const a = arr[i], b = arr[j], c = arr[k];
              const total = a.fee + b.fee + c.fee;
              if (total > budget) continue;
              const picked = new Set([a.id, b.id, c.id]);
              let ok = true;
              for (const pid of preferIdSet) { if (!picked.has(pid)) { ok = false; break; } }
              if (!ok) continue;
              combos.push({ lineup: [a, b, c], total_fee: total });
            }
          }
        }
      }
      combos.sort((x, y) => y.total_fee - x.total_fee);
      // pick top 3 with no artist overlap across combos
      const unique = [];
      const usedIdsGlobal = new Set();
      for (const c of combos) {
        const overlap = c.lineup.some(e => usedIdsGlobal.has(e.id));
        if (overlap) continue;
        unique.push(c);
        for (const e of c.lineup) usedIdsGlobal.add(e.id);
        if (unique.length === 3) break;
      }
      const top3 = unique.length > 0 ? unique : combos.slice(0, 3);
      if (top3.length > 0) {
        // Still compute best single result below, but include lineups for UI
        // We'll continue to run the exact maximizer and then return at the end
        // attaching lineups to the response.
        var precomputedTop3 = top3; // var so it is visible later in scope
      }
    }
    let bestTotal = -1;
    let best = [];
    function choose(start, picked, total) {
      if (picked.length === count) {
        // Enforce that all preferred IDs are included if specified
        const pickedIds = new Set(picked.map(p=>p.id));
        let preferSatisfied = true;
        for (const pid of preferIdSet) { if (!pickedIds.has(pid)) { preferSatisfied = false; break; } }
        if (!preferSatisfied) return;
        if (total <= budget && total > bestTotal) {
          bestTotal = total;
          best = [...picked];
        }
        return;
      }
      if (start >= fees.length) return;
      for (let i = start; i < fees.length; i++) {
        const next = fees[i];
        const newTotal = total + next.fee;
        if (newTotal > budget) continue; // prune
        choose(i + 1, [...picked, next], newTotal);
      }
    }
    choose(0, [], 0);

    // If count is 2, also run a two-pointer maximizer as a safety net
    if (count === 2) {
      const sorted = [...fees].sort((a,b)=>a.fee-b.fee);
      let i=0,j=sorted.length-1;
      let tpBestTotal = -1; let tpBest = [];
      while(i<j){
        const s = sorted[i].fee + sorted[j].fee;
        if (s>budget) { j--; continue; }
        if (s>tpBestTotal) { tpBestTotal=s; tpBest=[sorted[i], sorted[j]]; }
        if (s===budget) break; // optimal
        i++;
      }
      if (tpBestTotal>bestTotal) { bestTotal=tpBestTotal; best=tpBest; }
    }

    if (best.length === count) {
      if (typeof precomputedTop3 !== 'undefined' && Array.isArray(precomputedTop3) && precomputedTop3.length > 0) {
        return res.json({ candidates, result: { lineup: best, total_fee: bestTotal }, lineups: precomputedTop3 });
      }
      return res.json({ candidates, result: { lineup: best, total_fee: bestTotal } });
    }

    // 4) Ask Gemini 2.5 Pro to pick final lineup from candidates (fallback)
    const genModel = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
    const slim = candidates.map(c => ({ id: Number(c.id), fee: Number(c.appearance_fee) || 0 }));
    const prompt = `From the candidate artists, choose ${count} IDs under total budget ${budget} for mood ${asciiMood}. ` +
      `Respond with JSON ONLY matching this schema: {"lineup":[{"id":number,"fee":number}],"total_fee":number}. ` +
      `Do not include any text outside JSON.` +
      `\nCandidates (id,fee):\n` + slim.map(c => `${c.id},${c.fee}`).join('\n');
    const out = await genModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' }
    });
    const raw = out.response.text() || '';
    const cleaned = raw.replace(/```json|```/g, '').trim();
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      const start = cleaned.indexOf('{');
      const end = cleaned.lastIndexOf('}');
      if (start !== -1 && end !== -1 && end > start) {
        try { parsed = JSON.parse(cleaned.slice(start, end + 1)); } catch {}
      }
    }
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.lineup)) {
      // Fallback: greedy lineup by cheapest fees under budget
      const sorted = [...slim].sort((a, b) => a.fee - b.fee);
      const lineup = [];
      let total = 0;
      for (const c of sorted) {
        if (lineup.length < count && total + c.fee <= budget) {
          lineup.push(c);
          total += c.fee;
        }
      }
      if (typeof precomputedTop3 !== 'undefined' && Array.isArray(precomputedTop3) && precomputedTop3.length > 0) {
        return res.json({ candidates, result: { lineup, total_fee: total }, lineups: precomputedTop3, result_raw: raw });
      }
      return res.json({ candidates, result: { lineup, total_fee: total }, result_raw: raw });
    }
    if (typeof precomputedTop3 !== 'undefined' && Array.isArray(precomputedTop3) && precomputedTop3.length > 0) {
      return res.json({ candidates, result: parsed, lineups: precomputedTop3 });
    }
    res.json({ candidates, result: parsed });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e) });
  }
});

// Search with LLM-agent: Gemini can call a DB tool to fetch artists, then decide lineup itself
app.post('/api/lineup-agent', async (req, res) => {
  try {
    const { mood = '신나는', budget = 50000000, count = 3, festival = '', genre = '' } = req.body || {};

    // Cloud SQL connection
    const connector = new Connector();
    const connection = await connector.getOptions({ instanceConnectionName: process.env.PG_CONNECTION_NAME });
    const pool = new pg.Pool({
      ...connection,
      user: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASS,
      database: process.env.PG_DATABASE || 'artist',
    });

    // Tool: queryArtists
    async function queryArtistsTool(args) {
      const { genre: g, maxFee, limit = 50 } = args || {};
      const lim = Math.min(Math.max(Number(limit) || 10, 1), 100);
      const fee = Math.max(Number(maxFee) || budget, 1);

      function expandGenreTerms(input) {
        const raw = String(input || '').toLowerCase();
        const tokens = raw.split(/[,/\\&\s]+|와|과/).map(s => s.trim()).filter(Boolean);
        const synonyms = (t) => {
          if (!t) return [];
          const s = t.toLowerCase();
          if (s.includes('댄스') || s.includes('dance')) return ['댄스', 'dance'];
          if (s.includes('소울') || s.includes('soul') || s.includes('r&b') || s.includes('알앤비')) return ['R&B/Soul', 'R&B', 'soul', '알앤비'];
          if (s.includes('힙합') || s.includes('랩') || s.includes('hiphop') || s.includes('rap')) return ['랩/힙합', '힙합', '랩', 'hiphop', 'rap'];
          if (s.includes('발라드') || s.includes('ballad')) return ['발라드', 'ballad'];
          if (s.includes('록') || s.includes('메탈') || s.includes('rock') || s.includes('metal')) return ['록/메탈', 'rock', 'metal'];
          if (s.includes('인디') || s.includes('indie')) return ['인디음악', 'indie'];
          if (s.includes('트로트') || s.includes('성인가요')) return ['성인가요/트로트', '트로트'];
          if (s.includes('포크') || s.includes('블루스') || s.includes('folk') || s.includes('blues')) return ['포크/블루스', 'folk', 'blues'];
          if (s.includes('pop') || s.includes('팝')) return ['POP', 'pop'];
          return [t];
        };
        const expanded = tokens.flatMap(synonyms);
        return Array.from(new Set(expanded));
      }

      const terms = g ? expandGenreTerms(g) : [];

      let clauses = ['appearance_fee <= $1'];
      let params = [fee];
      if (terms.length > 0) {
        const start = params.length + 1;
        clauses.push('(' + terms.map((_, i) => `genre ILIKE $${start + i}`).join(' OR ') + ')');
        for (const t of terms) params.push(`%${t}%`);
      }
      let rows = [];
      const q1 = await pool.query(
        `SELECT id,name,genre,appearance_fee,company_name FROM artist_clean
         WHERE ${clauses.join(' AND ')}
         ORDER BY appearance_fee DESC
         LIMIT ${lim}`,
        params
      );
      rows = q1.rows || [];
      if (rows.length === 0 && terms.length > 0) {
        // Fallback without genre filter
        const q2 = await pool.query(
          `SELECT id,name,genre,appearance_fee,company_name FROM artist_clean
           WHERE appearance_fee <= $1
           ORDER BY appearance_fee DESC
           LIMIT ${lim}`,
          [fee]
        );
        rows = q2.rows || [];
      }
      return rows;
    }

    const tools = {
      functionDeclarations: [
        {
          name: 'queryArtists',
          description: 'Query artists by optional genre and max fee. Returns an array of rows with id, name, genre, appearance_fee, company_name',
          parameters: {
            type: 'OBJECT',
            properties: {
              genre: { type: 'STRING' },
              maxFee: { type: 'NUMBER' },
              limit: { type: 'NUMBER' },
            },
          },
        },
      ],
    };

    function makeModel(name){ return genAI.getGenerativeModel({ model: name, tools }); }
    const sysLines = [
      `당신은 행사 라인업 기획자입니다.`,
      `목표: 예산(${budget}) 이하에서 정확히 ${count}팀의 조합을 3개 도출.`,
      `필요하면 queryArtists 함수를 호출하여 DB에서 후보를 조회하세요.`,
    ];
    if (AGENT_JSON_ONLY) {
      sysLines.push(
        `항상 JSON만 반환(마크다운/설명 금지).`,
        `JSON 스키마: {"lineup":[{"id":number,"fee":number}],"total_fee":number,"combos":[{"lineup":[{"id":number,"fee":number}],"total_fee":number},{...},{...}]}`
      );
    } else {
      sysLines.push(
        `응답 형식: 한국어, 간결한 텍스트. 조합 3개를 항목으로 제시하고 각 조합에 아티스트 이름과 섭외비, 총액을 표시.`,
        `제약: 각 조합은 예산 이하, 정확히 ${count}팀, 같은 조합 내 중복 금지, 조합끼리도 멤버 중복 금지, 불필요한 설명 최소화.`
      );
    }
    const sys = sysLines.join('\n');

    const userPrompt = [
      `festival=${festival || ''}`,
      `mood=${mood || ''}`,
      `genre=${genre || ''}`,
      `budget=${budget}`,
      `count=${count}`,
      `먼저 적합한 후보를 queryArtists로 조회한 후, 섭외비를 고려해 최종 lineup을 선택하세요.`,
    ].join('\n');

    // 1st turn with model fallback and backoff on 429/5xx
    async function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }
    async function callWithFallback(contentsArray){
      const maxPerModel = 2;
      for (let idx = 0; idx < GEMINI_MODELS.length; idx++) {
        const modelName = GEMINI_MODELS[idx];
        const model = makeModel(modelName);
        let delay = 600;
        for (let attempt = 0; attempt < maxPerModel; attempt++) {
          try {
            const r = await model.generateContent({ contents: contentsArray, generationConfig: AGENT_JSON_ONLY ? { responseMimeType: 'application/json' } : undefined });
            return { r, modelName };
          } catch (e) {
            const msg = String(e||'');
            if (msg.includes('429') || /too many requests|quota/i.test(msg) || msg.includes('500')) {
              if (attempt < maxPerModel - 1) { await sleep(delay); delay *= 2; continue; }
              break; // try next model
            }
            throw e;
          }
        }
      }
      throw new Error('All Gemini models failed due to quota or transient errors');
    }
    const first = await callWithFallback([
      { role: 'user', parts: [{ text: sys }] },
      { role: 'user', parts: [{ text: userPrompt }] },
    ]);
    let r1 = first.r;
    let modelUsed = first.modelName;

    function extractFunctionCalls(resp) {
      const calls = [];
      try {
        const cands = resp.response?.candidates || [];
        for (const c of cands) {
          const parts = c.content?.parts || [];
          for (const p of parts) {
            if (p.functionCall) calls.push(p.functionCall);
          }
        }
      } catch {}
      return calls;
    }

    const calls = extractFunctionCalls(r1);
    let final;
    if (calls.length > 0) {
      const call = calls[0];
      let toolResult = [];
      if (call.name === 'queryArtists') {
        const args = call.args || call.arguments || {};
        toolResult = await queryArtistsTool({
          genre: args.genre ?? genre,
          maxFee: args.maxFee ?? budget,
          limit: args.limit ?? 50,
        });
      }

      // 2nd turn: provide toolResult as plain JSON context (avoids functionResponse schema issues)
      const toolJson = JSON.stringify(toolResult).slice(0, 50000); // keep within limits
      const followLines = [
        '아래는 DB에서 조회한 후보 JSON입니다. 이 데이터만 사용하여 조건을 만족하는 라인업 3개를 고르세요.'
      ];
      if (AGENT_JSON_ONLY) {
        followLines.push('반드시 JSON으로만 응답: {"lineup":[{"id":number,"fee":number}],"total_fee":number,"combos":[{"lineup":[{"id":number,"fee":number}],"total_fee":number},{...},{...}]}');
      } else {
        followLines.push('응답은 간결한 한국어 텍스트로, 조합 3개를 항목으로 제시하고 이름·섭외비·총액만 포함하세요.');
      }
      followLines.push(toolJson);
      const follow = followLines.join('\n');
      const second = await callWithFallback([
        { role: 'user', parts: [{ text: sys }] },
        { role: 'user', parts: [{ text: userPrompt }] },
        { role: 'user', parts: [{ text: follow }] },
      ]);
      final = (second.r.response?.text?.() || '').trim();
      modelUsed = second.modelName;
    } else {
      final = (r1.response?.text?.() || '').trim();
    }

    // Try to parse JSON result
    const cleaned = final.replace(/```json|```/g, '').trim();
    let parsed;
    try { parsed = JSON.parse(cleaned); } catch {}
    if (AGENT_JSON_ONLY && parsed && (Array.isArray(parsed.lineup) || Array.isArray(parsed.combos))) {
      const idSet = new Set();
      if (Array.isArray(parsed.lineup)) parsed.lineup.forEach(e=>idSet.add(Number(e.id)));
      if (Array.isArray(parsed.combos)) parsed.combos.forEach(c => (c?.lineup||[]).forEach(e=>idSet.add(Number(e.id))));
      let map = new Map();
      if (idSet.size > 0) {
        const q = await pool.query(`SELECT id,name,appearance_fee FROM artist_clean WHERE id = ANY($1)`, [[...idSet]]);
        map = new Map(q.rows.map(r=>[Number(r.id), { name: r.name, fee: Number(r.appearance_fee)||0 }]));
      }
      const enrich = (arr=[]) => arr.map(e=>({ id: Number(e.id), fee: Number(e.fee)||map.get(Number(e.id))?.fee||0, name: map.get(Number(e.id))?.name }));
      const main = Array.isArray(parsed.lineup) ? enrich(parsed.lineup) : [];
      // Normalize combos and enforce cross-combo uniqueness (no shared artists across combos)
      const rawCombos = Array.isArray(parsed.combos) ? parsed.combos.map(c=>({ lineup: enrich(c.lineup||[]), total_fee: Number(c.total_fee)||((c.lineup||[]).reduce((s,x)=>s+(Number(x.fee)||0),0)) })) : [];
      const uniqueCombos = [];
      const used = new Set();
      for (const c of rawCombos) {
        const overlap = (c.lineup||[]).some(e => used.has(e.id));
        if (overlap) continue;
        uniqueCombos.push(c);
        for (const e of c.lineup||[]) used.add(e.id);
        if (uniqueCombos.length === 3) break;
      }
      const combos = uniqueCombos.length > 0 ? uniqueCombos : rawCombos.slice(0,3);
      await pool.end();
      await connector.close();
      return res.json({ ok: true, result: { lineup: main, total_fee: Number(parsed.total_fee)||main.reduce((s,x)=>s+(x.fee||0),0), combos }, raw: final, model: modelUsed });
    }
    await pool.end();
    await connector.close();
    if (AGENT_JSON_ONLY) {
      return res.json({ ok: false, result_raw: final, model: modelUsed });
    }
    // 자유 텍스트 모드: 원문 텍스트 그대로 반환
    return res.json({ ok: true, text: final, model: modelUsed });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e) });
  }
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});


