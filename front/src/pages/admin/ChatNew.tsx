
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Bot, MessageSquarePlus, Send, Search, Lightbulb, Star, Users, Reply } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";
interface ChatMsg {
  role: "user" | "model";
  content: string;
}

export default function ChatNew() {
  const [apiKey, setApiKey] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "model",
      content:
        "새 챗이 시작되었습니다. 제안서를 준비하거나 라인업을 추천해드릴게요. 메시지를 입력해보세요!",
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  type Mode = "proactive" | "general";
  const [mode, setMode] = useState<Mode>("proactive");

  useEffect(() => {
    const saved = localStorage.getItem("GEMINI_API_KEY") || "";
    setApiKey(saved);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages.length]);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  const send = async () => {
    if (!canSend) return;
    if (!apiKey) {
      toast({
        title: "Gemini API 키가 필요합니다",
        description: "상단 입력란에 키를 입력하고 저장하세요.",
        variant: "destructive",
      });
      return;
    }

    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              { role: "user", parts: [{ text: userText }] },
            ],
          }),
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("\n") ||
        "죄송합니다. 응답을 생성하지 못했습니다.";
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

  const saveKey = () => {
    localStorage.setItem("GEMINI_API_KEY", apiKey);
    toast({ title: "Gemini API 키 저장됨" });
  };

  return (
    <div className="flex h-[calc(100vh-5.5rem)] flex-col space-y-4 overflow-hidden">
      <SEO title="새 챗 - Gemini 연결 | Celefix" description="Gemini와 연결된 신규 채팅" />

      {/* 안내 영역: 키 입력 */}
      <section className="rounded-lg border border-border bg-card p-4 flex-shrink-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="text-sm text-muted-foreground">
            Gemini API 키를 입력하면 바로 대화할 수 있어요. 보안상 키는 브라우저 로컬에만 저장됩니다. (권장: Supabase 비밀 사용)
          </div>
          <div className="flex w-full gap-2 sm:w-auto sm:flex-1">
            <Input
              placeholder="AIza..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="font-mono"
            />
            <Button onClick={saveKey} variant="outline">저장</Button>
          </div>
        </div>
      </section>

      {/* 채팅 박스 */}
      <section className="flex flex-1 overflow-hidden rounded-xl border border-border bg-card">
        {/* 좌측 사이드바 */}
        <aside className="sidebar hidden w-1/4 min-w-[260px] border-r border-border bg-muted/30 p-4 lg:block">
          {/* 새 채팅 버튼 */}
          <Button variant="outline" className="mb-4 w-full justify-center gap-2 border-primary text-primary hover:bg-primary/10">
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

            {/* 일반 라인업 추천 */}
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
                <li className="chat-item cursor-pointer rounded-md border border-border bg-muted/30 p-3 transition hover:bg-muted/40">
                  <Link to="/admin/chat/dashboard?thread=seoul" className="block">
                    <div className="text-sm font-medium">서울대 축제 제안</div>
                    <div className="truncate text-xs text-muted-foreground">축제 라인업 추천 및 분석</div>
                  </Link>
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

        {/* 메인 대화 */}
        <div className="flex w-full flex-col">
          <header className="flex items-center justify-between gap-2 border-b border-border p-4 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">새 채팅</h2>
              <Badge variant="secondary" className="ml-1">
                {mode === "proactive" ? "선제 제안" : "일반 라인업 추천"}
              </Badge>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2" aria-label="채팅 옵션">
                  <SlidersHorizontal className="h-4 w-4" />
                  옵션
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-50">
                <DropdownMenuRadioGroup value={mode} onValueChange={(v) => setMode(v as Mode)}>
                  <DropdownMenuRadioItem value="proactive">선제 제안</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="general">일반 라인업 추천</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
