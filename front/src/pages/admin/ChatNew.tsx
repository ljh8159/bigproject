
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Bot, MessageSquarePlus, Send, Search, Lightbulb, Star } from "lucide-react";
interface ChatMsg {
  role: "user" | "model";
  content: string;
}

export default function ChatNew() {
  // API 키 제거: 백엔드 호출 사용
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "model",
      content:
        "새 챗이 시작되었습니다. 제안서를 준비하거나 라인업을 추천해드릴게요. 메시지를 입력해보세요!",
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  // 카테고리는 기본값만 유지(옵션 제거)
  type Mode = "proactive" | "general";
  const [mode] = useState<Mode>("proactive");
  const [threadId, setThreadId] = useState<string | null>(null);
  const [threads, setThreads] = useState<{ id: string; title: string; category: string; created_at: number }[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/threads`)
      .then((r) => r.json())
      .then((d) => setThreads(d.threads || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages.length]);

  const canSend = useMemo(() => input.trim().length > 0, [input]);
  const RAW_BASE = (import.meta as any).env?.VITE_API_BASE_URL || "";
  const API_BASE = RAW_BASE.replace(/\/+$/, "");

  const send = async () => {
    if (!canSend) return;
    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);

    // 라인업 추천 의도 감지 → 백엔드 /api/lineup 호출 후 응답을 채팅에 표시하고 종료
    const intent = parseLineupIntent(userText);
    if (intent) {
      try {
        const res = await fetch(`${API_BASE}/api/lineup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(intent),
        });
        if (res.ok) {
          const data = await res.json();
          const candidates: Array<{ id: string; name: string; appearance_fee: string }> = data.candidates || [];
          const result = data.result || {};
          if (Array.isArray(result.lineup)) {
            const idToName = new Map<number, string>();
            for (const c of candidates) idToName.set(Number(c.id), c.name);
            const lines = result.lineup.map((e: { id: number; fee: number }) => `- ${idToName.get(e.id) || e.id} (₩${formatMoney(e.fee)})`);
            const summary = [
              `추천 라인업 (${intent.festival || '행사'}, ${intent.mood || '분위기'}${intent.genre ? `/${intent.genre}` : ''} / ${intent.count}명 / 예산 ₩${formatMoney(intent.budget)})`,
              ...lines,
              `총액: ₩${formatMoney(result.total_fee || 0)}`,
            ].join('\n');
            setMessages((prev) => [...prev, { role: 'model', content: summary }]);
            return;
          }
          if (data.result_raw) {
            setMessages((prev) => [...prev, { role: 'model', content: `라인업 결과(원문):\n${String(data.result_raw)}` }]);
            return;
          }
        }
      } catch {
        // 의도 파싱 실패 시 일반 채팅 처리로 폴백
      }
    }

    // 라인업 관련 키워드는 포함하지만 파싱이 실패한 경우: 안내 메시지 출력 후 종료
    const wantsLineup = /라인업|추천|섭외|구성/.test(userText);
    if (wantsLineup && !intent) {
      setMessages((prev) => [
        ...prev,
        { role: 'model', content: lineupGuideText() },
      ]);
      return;
    }

    try {
      const url = threadId ? `${API_BASE}/api/threads/${threadId}/chat` : `${API_BASE}/api/threads/new/chat`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, category: mode }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const text = data?.reply || "죄송합니다. 응답을 생성하지 못했습니다.";
      if (data?.threadId) setThreadId(data.threadId);
      // 처음 생성된 경우에만 목록 갱신
      fetch(`${API_BASE}/api/threads`).then(r=>r.json()).then(d=>setThreads(d.threads||[])).catch(()=>{});
      setMessages((prev) => [...prev, { role: "model", content: text }]);
    } catch (err: any) {
      console.error(err);
      toast({ title: "요청 실패", description: String(err), variant: "destructive" });
      setMessages((prev) => [
        ...prev,
        { role: "model", content: "요청 중 오류가 발생했습니다. API 키 및 네트워크 상태를 확인해주세요." },
      ]);
    }
  };

  function formatMoney(v: number) {
    try { return Number(v || 0).toLocaleString('ko-KR'); } catch { return String(v); }
  }

  function parseLineupIntent(text: string): null | { festival?: string; mood?: string; budget: number; count: number; genre?: string } {
    const t = text.replace(/\s+/g, ' ').trim();
    // 예산: 숫자 + (만원|천만원|억)
    const budgetRe = /(예산|budget)[^0-9]*(.+)$/i; // 뒤쪽에서 한글 금액 구문 전체를 받아 별도 파싱
    const countRe = /([0-9]+)\s*(명|팀|인)/; // 팀/인도 허용
    const moodRe = /(분위기|mood)[^가-힣a-zA-Z]*([가-힣A-Za-z]+)/i;
    const festivalRe = /([가-힣A-Za-z0-9]+)\s*(축제|페스티벌)/;
    const genreRe = /(장르|genre)[^가-힣a-zA-Z]*([가-힣A-Za-z/&]+)/i;

    let budget = 0;
    const b = t.match(budgetRe);
    if (b) budget = parseKoreanBudget(b[2] || b[1] || '');
    const c = t.match(countRe);
    const count = c ? Number(c[1]) : NaN;
    const m = t.match(moodRe);
    const mood = m ? m[2] : undefined;
    const f = t.match(festivalRe);
    const festival = f ? `${f[1]} 축제` : undefined;
    const g = t.match(genreRe);
    const rawGenre = g ? g[2] : undefined;
    const genre = rawGenre ? normalizeGenre(rawGenre) : undefined;

    if (!budget || !count || Number.isNaN(count)) return null;
    return { festival, mood, budget, count, genre };
  }

  function lineupGuideText(): string {
    return [
      '라인업 추천을 위해 아래 형식으로 입력해 주세요:',
      '- 예: 머드 축제에 신나는 분위기로 3명 섭외해줘. 예산은 8천만원.',
      '- 필수: 예산(예: 5천만원/8천만원/1억), 인원수(예: 3명/3팀/3인)',
      '- 선택: 행사/축제명, 분위기(예: 신나는/차분한/힙한 등), 장르(예: 장르는 댄스/힙합/발라드)',
    ].join('\n');
  }

  function normalizeGenre(v: string) {
    const s = v.toLowerCase();
    if (s.includes('댄스') || s.includes('dance')) return '댄스';
    if (s.includes('발라드') || s.includes('ballad')) return '발라드';
    if (s.includes('힙합') || s.includes('랩') || s.includes('hiphop') || s.includes('rap')) return '랩/힙합';
    if (s.includes('r&b') || s.includes('알앤비')) return 'R&B/Soul';
    if (s.includes('록') || s.includes('메탈') || s.includes('rock') || s.includes('metal')) return '록/메탈';
    if (s.includes('인디') || s.includes('indie')) return '인디음악';
    if (s.includes('트로트') || s.includes('성인가요')) return '성인가요/트로트';
    if (s.includes('포크') || s.includes('블루스') || s.includes('folk') || s.includes('blues')) return '포크/블루스';
    if (s.includes('pop') || s.includes('팝')) return 'POP';
    return v;
  }

  // 한글 혼합 금액 파서: "2억 2천", "2억2천만원", "8천만원", "5000만원" 등
  function parseKoreanBudget(raw: string): number {
    const s = String(raw).replace(/[,\s]/g, '');
    // 1) x억y천(만원 생략 가능)
    let m = s.match(/(\d+)억(\d+)천?만?원?/);
    if (m) return Number(m[1]) * 100000000 + Number(m[2]) * 10000000;
    // 2) x억
    m = s.match(/(\d+)억(만?원?)?/);
    if (m) return Number(m[1]) * 100000000;
    // 3) y천만원 또는 y천만
    m = s.match(/(\d+)천만(원)?/);
    if (m) return Number(m[1]) * 10000000;
    // 4) z만원
    m = s.match(/(\d+)만(원)?/);
    if (m) return Number(m[1]) * 10000;
    // 5) 숫자 + 선택적 단위 (fallback)
    m = s.match(/(\d+)(억|천만|만)?/);
    if (m) {
      const n = Number(m[1]);
      const unit = m[2] || '';
      if (unit.includes('억')) return n * 100000000;
      if (unit.includes('천만')) return n * 10000000;
      if (unit.includes('만')) return n * 10000;
      return n; // 단위 없으면 원 가정
    }
    return 0;
  }

  return (
    <div className="flex h-[calc(100vh-5.5rem)] flex-col space-y-4 overflow-hidden">
      <SEO title="새 챗 - Gemini 연결 | Celefix" description="Gemini와 연결된 신규 채팅" />

      {/* 안내 영역 제거 (백엔드 사용) */}

      {/* 채팅 박스 */}
      <section className="flex flex-1 overflow-hidden rounded-xl border border-border bg-card">
        {/* 좌측 사이드바 */}
        <aside className="sidebar hidden w-1/4 min-w-[260px] border-r border-border bg-muted/30 p-4 lg:block">
          {/* 새 채팅 버튼 */}
          <Button
            variant="outline"
            className="mb-4 w-full justify-center gap-2 border-primary text-primary hover:bg-primary/10"
            onClick={() => {
              setThreadId(null);
              setMessages([
                { role: 'model', content: '새 챗이 시작되었습니다. 제안서를 준비하거나 라인업을 추천해드릴게요. 메시지를 입력해보세요!' },
              ]);
            }}
          >
            <MessageSquarePlus className="h-4 w-4" /> 새 채팅 시작하기
          </Button>
          {/* 검색 */}
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="채팅 검색..." className="pl-9 bg-background/60" aria-label="채팅 검색" />
          </div>

          <div className="flex h-[calc(100%-132px)] flex-col overflow-y-auto pr-1">
            {/* 선제 제안 */}
            <div className="category-section mb-4">
              <div className="category-header mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="category-icon grid h-6 w-6 place-items-center rounded bg-primary/15 text-primary">
                    <Lightbulb className="h-3.5 w-3.5" />
                  </div>
                  <h3 className="text-sm font-semibold text-primary">선제 제안</h3>
                </div>
                <Star className="h-3.5 w-3.5 text-primary" />
              </div>
              <ul className="space-y-2">
                <li className="chat-item cursor-pointer rounded-md border border-border bg-muted/30 p-3 transition hover:bg-muted/40 ring-0 data-[active=true]:bg-muted/50 data-[active=true]:border-l-2 data-[active=true]:border-l-primary">
                  <Link to="/admin/chat/dashboard?thread=samsung" className="block">
                    <div className="text-sm font-medium">삼성전자 런칭쇼 제안</div>
                    <div className="truncate text-xs text-muted-foreground">아이유, 적재, 에픽하이 라인업 제안...</div>
                  </Link>
                </li>
                <li className="chat-item cursor-pointer rounded-md border border-border bg-muted/30 p-3 transition hover:bg-muted/40">
                  <div className="text-sm font-medium">LG 신제품 발표회</div>
                  <div className="truncate text-xs text-muted-foreground">유명 인플루언서 섭외 제안</div>
                </li>
                <li className="chat-item cursor-pointer rounded-md border border-border bg-muted/30 p-3 transition hover:bg-muted/40">
                  <div className="text-sm font-medium">현대자동차 론칭쇼</div>
                  <div className="truncate text-xs text-muted-foreground">유명 아이돌 그룹 섭외 전략</div>
                </li>
              </ul>
            </div>

            {/* 일반 라인업 추천 섹션 제거 */}

            <Separator className="my-3" />

            {/* 사용자 채팅 기록 */}
            <div className="category-section">
              <div className="category-header mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold">일반 채팅 기록</h3>
              </div>
              <ul className="space-y-2">
                {threads.map((t) => (
                  <li
                    key={t.id}
                    className="chat-item cursor-pointer rounded-md border border-border bg-muted/30 p-3 transition hover:bg-muted/40"
                    onClick={async () => {
                      setThreadId(t.id);
                      // 메시지 불러오기
                      try {
                        const r = await fetch(`${API_BASE}/api/threads/${t.id}/messages`);
                        const d = await r.json();
                        const loaded: ChatMsg[] = (d.messages || []).map((m: any) => ({ role: m.role, content: m.content }));
                        if (loaded.length === 0) {
                          setMessages([{ role: 'model', content: '이 대화에는 아직 메시지가 없습니다.' }]);
                        } else {
                          setMessages(loaded);
                        }
                      } catch {
                        setMessages([{ role: 'model', content: '대화 불러오기에 실패했습니다.' }]);
                      }
                    }}
                  >
                    <div className="text-sm font-medium truncate" title={t.title}>
                      {t.title}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">{t.category}</div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </aside>

        {/* 메인 대화 */}
        <div className="flex w-full flex-col">
          <header className="flex items-center justify-between gap-2 border-b border-border p-4 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">새 채팅</h2>
            </div>
          </header>

          <div ref={listRef} className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "ml-auto max-w-3xl" : "max-w-3xl"}>
                <div
                  className={
                    m.role === "user"
                      ? "rounded-md bg-primary/10 p-4"
                      : "rounded-md bg-muted/40 p-4"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <footer className="border-t border-border p-4 flex-shrink-0">
            <div className="relative">
              <Input
                placeholder="메시지 입력…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                className="pr-11"
                aria-label="메시지 입력"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={send}
                disabled={!canSend}
              >
                <Send className="h-5 w-5 text-primary" />
              </Button>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
