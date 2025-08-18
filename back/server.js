import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { nanoid } from 'nanoid';
import pg from 'pg';
import { Connector } from '@google-cloud/cloud-sql-connector';

const app = express();
const port = process.env.PORT || 8080;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

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

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
    const result = await model.generateContent({ contents: [{ role: 'user', parts: [{ text: userText }] }] });
    const text = result.response.text() || '응답이 비어 있습니다.';

    const botMsgId = nanoid();
    insertMessage.run(botMsgId, threadId, 'model', text, now());

    res.json({ reply: text, messageId: botMsgId, threadId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e) });
  }
});

// Search + Generate lineup
app.post('/api/lineup', async (req, res) => {
  try {
    const { mood = '신나는', budget = 50000000, count = 3, festival = '' } = req.body || {};

    // 1) get query embedding
    const embedModel = genAI.getGenerativeModel({ model: 'text-embedding-004' });
    const queryText = `행사:${festival} 분위기:${mood} 예산:${budget}`;
    const emb = await embedModel.embedContent(queryText);
    const qvec = emb.embedding.values;

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

    const topK = Math.max(count * 5, 15);
    // pg는 기본적으로 다중 문장을 한 번에 실행하지 않습니다. SET과 SELECT를 분리합니다.
    await pool.query('SET ivfflat.probes = 10');
    // pgvector는 벡터 리터럴 문자열('[v1,v2,...]')을 전달하고 ::vector로 캐스팅하는 것이 안전합니다.
    const vecLiteral = `[${qvec.join(',')}]`;
    const { rows: candidates } = await pool.query(
      `SELECT id,name,genre,appearance_fee,company_name
       FROM artist_clean
       WHERE appearance_fee <= $2
       ORDER BY embedding <=> $1::vector
       LIMIT $3`,
      [vecLiteral, budget, topK]
    );

    await pool.end();
    await connector.close();

    // 3) Ask Gemini 2.5 Pro to pick final lineup from candidates
    const genModel = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
    const prompt = `후보 아티스트 중에서 분위기:${mood}, 예산:${budget}원, 인원:${count}명을 만족하는 라인업을 JSON으로만 제시하세요.
JSON 스키마: {"lineup":[{"id":number,"name":string,"fee":number,"reason":string}],"total_fee":number}
후보:
${candidates.map(c => `- (${c.id}) ${c.name} | fee:${c.appearance_fee} | genre:${c.genre} | 회사:${c.company_name}`).join('\n')}`;
    const out = await genModel.generateContent(prompt);
    const text = out.response.text();
    res.json({ candidates, result: text });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e) });
  }
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});


