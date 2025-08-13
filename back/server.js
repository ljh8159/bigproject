import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { nanoid } from 'nanoid';

const app = express();
const port = process.env.PORT || 4000;
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

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
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

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});


