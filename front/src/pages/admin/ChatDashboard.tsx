import SEO from "@/components/SEO";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Bot,
  CalendarDays,
  FileText,
  FileSignature,
  Lightbulb,
  MessageSquarePlus,
  MoreVertical,
  Reply,
  Search,
  Send,
  Share2,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SeoulFestivalThread, { SeoulFestivalAnswer } from "./threads/SeoulFestivalThread";

export default function ChatDashboard() {
  const [activeThread, setActiveThread] = useState<"samsung" | "seoul">("seoul");
  const location = useLocation();

  // Predefined bot responses (Seoul Univ. Festival)
  const botSteps: JSX.Element[] = [
    (
      <div className="max-w-3xl rounded-md bg-muted/40 p-4">
        <p className="mb-3">
          안녕하세요, 김희연 관리자님. 오늘은
          <span className="chat-highlight font-semibold text-primary"> 가천대학교 축제</span>
          라인업 제안을 드립니다.
        </p>
        <p className="mb-3">
          요청하신 조건(댄스·힙합 중심)과 타깃(재학생 위주)을 반영해
          <span className="chat-highlight text-primary"> 최종 8팀 라인업</span>을 구성했습니다.
        </p>

        <div className="mb-3">
          <div className="font-semibold">최종 추천 라인업 및 섭외비</div>
          <ul className="text-sm leading-6">
            <li>• 크러쉬 – 70,000,000원</li>
            <li>• 산다라박 – 150,000,000원</li>
            <li>• 권은비 – 47,500,000원</li>
            <li>• 청하 – 45,000,000원</li>
            <li>• 다이나믹듀오 – 50,000,000원</li>
            <li>• 박재범(Jay Park) – 72,500,000원</li>
            <li>• 빅나티 – 25,000,000원</li>
            <li>• 스윙스 – 35,000,000원</li>
          </ul>
        </div>

        <p className="text-sm text-muted-foreground">
          * 운영·무대·안전 등 부대비용은 별도 산정 가능. 러닝타임/세트 전환/합동 엔딩 시나리오도 요청 시 제공.
        </p>
      </div>
    ),
    (
      <div className="max-w-3xl rounded-md bg-muted/40 p-4">
        <p className="mb-3">아티스트별 선정 근거를 간단·명료하게 정리했습니다.</p>

        <div className="mb-3">
          <div className="font-semibold">선정 근거</div>
          <ul className="text-sm leading-6">
            <li>• <b>크러쉬 (₩70,000,000)</b>: R&amp;B/힙합 보컬 퍼포먼스로 중후반 몰입·싱어롱 유도 용이</li>
            <li>• <b>산다라박 (₩150,000,000)</b>: 대중적 인지도와 세련된 이미지, 진행/토크 가능으로 흐름 안정</li>
            <li>• <b>권은비 (₩47,500,000)</b>: 퍼포먼스·보컬 균형, Z세대 팬덤과 릴스·숏폼 확산 기대</li>
            <li>• <b>청하 (₩45,000,000)</b>: 댄스 중심 솔로 무대 강점, 분위기 고조 및 비주얼 임팩트</li>
            <li>• <b>다이나믹듀오 (₩50,000,000)</b>: 히트곡 다수·콜앤리스폰스로 현장 에너지 극대화</li>
            <li>• <b>박재범 (₩72,500,000)</b>: 글로벌 팬덤, 힙합/R&amp;B 무대 경험 풍부, SNS 확산 효과 큼</li>
            <li>• <b>빅나티 (₩25,000,000)</b>: 1020 중심 트렌디 감각, 신예 파워로 타깃 친화</li>
            <li>• <b>스윙스 (₩35,000,000)</b>: 존재감 있는 랩 퍼포먼스로 무대 긴장감 유지 및 힙합 팬층 공략</li>
          </ul>
        </div>

        <p className="text-sm">
          본 라인업은 <b>대중성 × 현장 에너지 × 트렌디함</b>을 균형 있게 충족하여, 다양한 세대와 취향을 아우르는 축제 무대 구성에 적합함.
        </p>
      </div>
    ),
    (
      <div className="max-w-3xl rounded-md bg-muted/40 p-4">
        <p className="mb-4">다음 자료로 바로 진행 가능합니다.</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="gap-2">
            <Link to="/admin/chat/proposal">
              <FileText className="h-4 w-4" /> 제안서 작성하기
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10">
            <Link to="/admin/chat/dashboard-detail">
              <Share2 className="h-4 w-4" /> 세부 대시보드 보기
            </Link>
          </Button>
        </div>
      </div>
    ),
    (
      <div className="max-w-3xl rounded-md bg-muted/40 p-4">
        <p className="mb-4">확정 시 계약서 초안으로 이어집니다.</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="gap-2">
            <Link to="/admin/chat/contract">
              <FileSignature className="h-4 w-4" /> 계약서 확인하기
            </Link>
          </Button>
        </div>
      </div>
    ),
  ];

  const [messages, setMessages] = useState<{ role: "ai" | "user"; node?: JSX.Element; text?: string }[]>([
    { role: "ai", node: botSteps[0] },
  ]);
  const [seoulMessages, setSeoulMessages] = useState<{ role: "ai" | "user"; node?: JSX.Element; text?: string }[]>([]);
  const [nextBotIndex, setNextBotIndex] = useState(1);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thread = new URLSearchParams(location.search).get("thread");
    if (thread === "seoul" || thread === "samsung") {
      setActiveThread(thread as "samsung" | "seoul");
    }
  }, [location.search]);

  useEffect(() => {
    if (activeThread === "samsung") {
      // 삼성 쓰레드도 서울 템플릿로 시작하도록 통일
      setMessages([{ role: "ai", node: botSteps[0] }]);
      setNextBotIndex(1);
      setTyping(false);
    } else if (activeThread === "seoul") {
      setSeoulMessages([]);
      setTyping(false);
      setInput("");
    }
  }, [activeThread]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    const content = input.trim();
    if (!content) return;

    if (activeThread === "samsung") {
      setMessages((m) => [...m, { role: "user", text: content }]);
      setInput("");

      if (nextBotIndex < botSteps.length) {
        setTyping(true);
        const idx = nextBotIndex;
        setTimeout(() => {
          setMessages((m) => [...m, { role: "ai", node: botSteps[idx] }]);
          setNextBotIndex(idx + 1);
          setTyping(false);
        }, 3000);
      }
      return;
    }

    if (activeThread === "seoul") {
      setSeoulMessages((m) => [...m, { role: "user", text: content }]);
      setInput("");
      setTyping(true);
      setTimeout(() => {
        setSeoulMessages((m) => [...m, { role: "ai", node: <SeoulFestivalAnswer /> }]);
        setTyping(false);
      }, 3000);
    }
  };

  return (
    <div className="flex h-[calc(100vh-5.5rem)] flex-col space-y-4 overflow-hidden">
      <SEO
        title="챗봇 인터페이스 - 가천대 축제 | Celefix"
        description="가천대 축제 라인업 제안 대화 인터페이스"
      />

      {/* Chat container */}
      <section
        className="chat-container flex flex-1 overflow-hidden rounded-xl border border-border bg-card"
        aria-label="챗봇 인터페이스"
      >
        {/* Left sidebar */}
        <aside className="sidebar w-1/4 min-w-[260px] border-r border-border bg-muted/30 p-4">
          {/* New chat */}
          <Button
            asChild
            variant="outline"
            className="new-chat-btn mb-4 w-full justify-center gap-2 border-primary text-primary hover:bg-primary/10"
          >
            <Link to="/admin/chat/new">
              <MessageSquarePlus className="h-4 w-4" /> 새 채팅 시작하기
            </Link>
          </Button>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="채팅 검색..."
              className="pl-9 bg-background/60"
              aria-label="채팅 검색"
            />
          </div>

          <div className="flex h-[calc(100%-132px)] flex-col overflow-y-auto pr-1">
            {/* Proactive proposals */}
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
                <li
                  className="chat-item cursor-pointer rounded-md border border-border bg-muted/30 p-3 transition hover:bg-muted/40 ring-0 data-[active=true]:bg-muted/50 data-[active=true]:border-l-2 data-[active=true]:border-l-primary"
                  data-active={activeThread === "samsung"}
                  onClick={() => setActiveThread("samsung")}
                >
                  <div className="text-sm font-medium">가천대 축제 제안</div>
                  <div className="truncate text-xs text-muted-foreground">댄스·힙합 8팀 라인업 제안...</div>
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

            {/* General lineup */}
            <div className="category-section">
              <div className="category-header mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="category-icon grid h-6 w-6 place-items-center rounded bg-info/15 text-[hsl(var(--info))]">
                    <Users className="h-3.5 w-3.5" />
                  </div>
                  <h3 className="text-sm font-semibold text-[hsl(var(--info))]">일반 라인업 추천</h3>
                </div>
                <Reply className="h-3.5 w-3.5 text-[hsl(var(--info))]" />
              </div>

              <ul className="space-y-2">
                <li
                  className="chat-item cursor-pointer rounded-md border border-border bg-muted/30 p-3 transition hover:bg-muted/40 ring-0 data-[active=true]:bg-muted/50 data-[active=true]:border-l-2 data-[active=true]:border-l-[hsl(var(--info))]"
                  data-active={activeThread === "seoul"}
                  onClick={() => setActiveThread("seoul")}
                >
                  <div className="text-sm font-medium">가천대 축제 제안</div>
                  <div className="truncate text-xs text-muted-foreground">축제 라인업 추천 및 분석</div>
                </li>
                <li className="chat-item cursor-pointer rounded-md border border-border bg-muted/30 p-3 transition hover:bg-muted/40">
                  <div className="text-sm font-medium">부산 음악 페스티벌</div>
                  <div className="truncate text-xs text-muted-foreground">해외 아티스트 섭외 논의</div>
                </li>
                <li className="chat-item cursor-pointer rounded-md border border-border bg-muted/30 p-3 transition hover:bg-muted/40">
                  <div className="text-sm font-medium">고려대 가을 축제</div>
                  <div className="truncate text-xs text-muted-foreground">힙합 아티스트 라인업 추천</div>
                </li>
              </ul>
            </div>

            <Separator className="my-3" />
          </div>
        </aside>

        {/* Main chat area */}
        <section className="flex w-3/4 flex-col">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-border p-4">
            <h2 className="text-lg font-semibold">가천대 축제 제안</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Share2 className="h-4 w-4 cursor-pointer hover:text-foreground" />
              <MoreVertical className="h-4 w-4 cursor-pointer hover:text-foreground" />
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4" ref={listRef}>
            {activeThread === "samsung" ? (
              <>
                {messages.map((msg, idx) =>
                  msg.role === "ai" ? (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </div>
                      {msg.node}
                    </div>
                  ) : (
                    <div key={idx} className="ml-auto flex max-w-3xl items-start gap-3">
                      <div className="rounded-md bg-primary/10 p-4">
                        <p>{msg.text}</p>
                      </div>
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-foreground">김</div>
                    </div>
                  )
                )}

                {typing && (
                  <div className="flex items-start gap-3 animate-fade-in">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="max-w-3xl rounded-md bg-muted/40 p-4">
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-pulse" />
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:150ms]" />
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <SeoulFestivalThread />
                {seoulMessages.map((msg, idx) =>
                  msg.role === "ai" ? (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </div>
                      {msg.node}
                    </div>
                  ) : (
                    <div key={idx} className="ml-auto flex max-w-3xl items-start gap-3">
                      <div className="rounded-md bg-primary/10 p-4">
                        <p>{msg.text}</p>
                      </div>
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-foreground">김</div>
                    </div>
                  )
                )}

                {typing && (
                  <div className="flex items-start gap-3 animate-fade-in">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="max-w-3xl rounded-md bg-muted/40 p-4">
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-pulse" />
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:150ms]" />
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Input */}
          <footer className="border-t border-border p-4">
            <div className="relative">
              <Input
                placeholder="메시지 입력…"
                className="message-input w-full pr-11"
                aria-label="메시지 입력"
                value={input}
                disabled={typing}
                onChange={(e) => setInput(e.target.value)}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    const native: any = e.nativeEvent;
                    if (native?.isComposing || isComposing) return;
                    e.preventDefault();
                    send();
                  }
                }}
              />
              <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={send} disabled={!input.trim() || typing}>
                <Send className="h-5 w-5 text-primary" />
              </Button>
            </div>
          </footer>
        </section>
      </section>
    </div>
  );
}
