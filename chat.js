// api/chat.js  — Vercel Serverless Function
// 채팅 메시지를 인메모리로 저장 (Vercel 무료플랜 한계 내)
// 실제 영구 저장이 필요하면 Upstash Redis 추가 가능

const messages = []; // 서버 인메모리 (재배포 시 초기화됨)
const MAX = 300;

export default function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET — 메시지 목록 반환
  if (req.method === 'GET') {
    const since = parseInt(req.query.since || '0');
    const result = since > 0
      ? messages.filter(m => m.id > since)
      : messages.slice(-100); // 최근 100개
    return res.status(200).json({ messages: result, total: messages.length });
  }

  // POST — 메시지 전송
  if (req.method === 'POST') {
    const { name, text, role } = req.body;
    if (!name || !text || text.length > 300) {
      return res.status(400).json({ error: 'invalid' });
    }
    const msg = {
      id: Date.now(),
      name: name.slice(0, 20),
      text: text.slice(0, 300),
      role: role || '조직원',
      time: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
    };
    messages.push(msg);
    if (messages.length > MAX) messages.splice(0, messages.length - MAX);
    return res.status(200).json({ ok: true, message: msg });
  }

  // DELETE — 전체 삭제 (관리자용)
  if (req.method === 'DELETE') {
    const { adminKey } = req.body;
    if (adminKey !== process.env.ADMIN_KEY && adminKey !== '0024534X') {
      return res.status(403).json({ error: 'forbidden' });
    }
    messages.splice(0, messages.length);
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'method not allowed' });
}
