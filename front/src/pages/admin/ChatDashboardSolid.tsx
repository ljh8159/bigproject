import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  Bot,
  FileText,
  FileSignature,
  Lightbulb,
  MessageSquarePlus,
  MoreVertical,
  Reply,
  Search,
  Share2,
  Star,
  Users,
} from "lucide-react";

import { useRef } from "react";
export default function ChatDashboardSolid() {
  const botSteps: JSX.Element[] = [
    (
      <div className="max-w-3xl rounded-md bg-muted/40 p-4">
        <p className="mb-3">
          안녕하세요, 김희연 관리자님. 오늘은
          <span className="font-semibold text-primary"> 삼성전자의 신제품 갤럭시 Z 폴드 5 런칭쇼</span>
          에 대한 제안을 드리고자 합니다.
        </p>
        <p className="mb-3">
          8월 내 출시 예정인 삼성전자의 신제품 행사에
          <span className="text-primary"> 아이유, 적재, 에픽하이</span>
          를 메인 라인업으로 제안하는 것이 어떨까요? 최근 아이유의 인기, 적재의 음악성, 에픽하이의 대중적 인지도를 고려할 때 매우 효과적일 것으로 분석됩니다.
        </p>
        <p>
          예상 예산은 <span className="text-primary">5억 5천만원</span> 선으로, 런칭쇼의 규모와 영향력을 고려했을 때 투자 대비 효과가 높을 것으로 예측됩니다. 어떻게 생각하시나요?
        </p>
      </div>
    ),
    (
      <div className="max-w-3xl rounded-md bg-muted/40 p-4">
        <p className="mb-3">네, 자세히 설명드리겠습니다.</p>
        <p className="mb-3">
          <span className="font-semibold text-primary">아이유</span>는 최근 새 앨범이 2500만 스트리밍을 달성했으며, 20-30대 소비자층에게 96% 호감도를 기록하고 있습니다. 갤럭시의 주요 타겟층과 정확히 일치합니다.
        </p>
        <p className="mb-3">
          <span className="font-semibold text-primary">적재</span>는 인디 음악계의 대표 기타리스트로, 최근 콜라보레이션 앨범으로 스트리밍 차트 상위권을 유지하고 있습니다. 특히 감성적인 곡들로 2030 세대에게 높은 평가를 받고 있어 갤럭시의 감성적 브랜딩에 적합합니다.
        </p>
        <p className="mb-3">
          <span className="font-semibold text-primary">에픽하이</span>는 국내 힙합 음악의 대표주자로, 장수 그룹이지만 꾸준히 신곡을 발매하며 대중성과 음악성을 모두 인정받고 있습니다. 특히 남녀노소 모두에게 사랑받는 음악 스타일로 제품의 폭넓은 소구력을 강화할 수 있습니다.
        </p>
        <p className="mb-3">세 아티스트를 함께 섭외함으로써 다양한 연령층과 취향에 동시에 어필할 수 있습니다. 삼성전자의 브랜드 이미지와도 매우 적합하며, 런칭쇼 영상이 SNS에서 바이럴 컨텐츠가 될 가능성이 높습니다.</p>
        <p>추가로, 예상 미디어 노출 효과는 약 15억원 상당으로 예측됩니다. 투자 대비 약 2.7배의 마케팅 효과를 기대할 수 있습니다.</p>
      </div>
    ),
    (
      <div className="max-w-3xl rounded-md bg-muted/40 p-4">
        <p className="mb-4">감사합니다! 삼성전자에 제안하실 때 도움이 되도록 아래 자료들을 바로 확인하실 수 있습니다.</p>
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
        <p className="mb-4">축하드립니다! 빠른 승인을 받으셨네요. 삼성전자 런칭쇼 계약을 위한 계약서를 바로 준비해드리겠습니다.</p>
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

  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-[calc(100vh-5.5rem)] flex-col space-y-4 overflow-hidden">
      <SEO title="삼성전자 런칭쇼 제안 - 고정 보기 | Celefix" description="애니메이션 없이 즉시 확인하는 삼성전자 런칭쇼 제안 대화" />

      {/* Chat container */}
      <section className="chat-container flex flex-1 overflow-hidden rounded-xl border border-border bg-card" aria-label="챗봇 고정 보기">
        {/* Left sidebar */}
        <aside className="sidebar w-1/4 min-w-[260px] border-r border-border bg-muted/30 p-4">
          {/* New chat */}
          <Button asChild variant="outline" className="new-chat-btn mb-4 w-full justify-center gap-2 border-primary text-primary hover:bg-primary/10">
            <Link to="/admin/chat/new">
              <MessageSquarePlus className="h-4 w-4" /> 새 채팅 시작하기
            </Link>
          </Button>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="채팅 검색..." className="pl-9 bg-background/60" aria-label="채팅 검색" />
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
                <li className="chat-item rounded-md border border-border bg-muted/30 p-3 ring-0 data-[active=true]:bg-muted/50 data-[active=true]:border-l-2 data-[active=true]:border-l-primary" data-active>
                  <div className="text-sm font-medium">삼성전자 런칭쇼 제안</div>
                  <div className="truncate text-xs text-muted-foreground">아이유, 적재, 에픽하이 라인업 제안...</div>
                </li>
                <li className="chat-item rounded-md border border-border bg-muted/30 p-3">
                  <div className="text-sm font-medium">LG 신제품 발표회</div>
                  <div className="truncate text-xs text-muted-foreground">유명 인플루언서 섭외 제안</div>
                </li>
                <li className="chat-item rounded-md border border-border bg-muted/30 p-3">
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
                <li className="chat-item cursor-pointer rounded-md border border-border bg-muted/30 p-3 transition hover:bg-muted/40">
                  <Link to="/admin/chat/dashboard?thread=seoul" className="block">
                    <div className="text-sm font-medium">서울대 축제 제안</div>
                    <div className="truncate text-xs text-muted-foreground">축제 라인업 추천 및 분석</div>
                  </Link>
                </li>
                <li className="chat-item rounded-md border border-border bg-muted/30 p-3">
                  <div className="text-sm font-medium">부산 음악 페스티벌</div>
                  <div className="truncate text-xs text-muted-foreground">해외 아티스트 섭외 논의</div>
                </li>
                <li className="chat-item rounded-md border border-border bg-muted/30 p-3">
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
            <h2 className="text-lg font-semibold">삼성전자 런칭쇼 제안</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Share2 className="h-4 w-4 cursor-pointer hover:text-foreground" />
              <MoreVertical className="h-4 w-4 cursor-pointer hover:text-foreground" />
            </div>
          </header>

          {/* Messages - static */}
          <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4" ref={listRef}>
            {/* Bot 1 */}
            <div className="flex items-start gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              {botSteps[0]}
            </div>

            {/* User between 1 and 2 */}
            <div className="ml-auto flex max-w-3xl items-start gap-3">
              <div className="rounded-md bg-primary/10 p-4">
                <p>추천 이유가 궁금합니다.</p>
              </div>
              <div className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-foreground">김</div>
            </div>

            {/* Bot 2 */}
            <div className="flex items-start gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              {botSteps[1]}
            </div>

            {/* User between 2 and 3 */}
            <div className="ml-auto flex max-w-3xl items-start gap-3">
              <div className="rounded-md bg-primary/10 p-4">
                <p>담당자에게 내용을 전달할게요.</p>
              </div>
              <div className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-foreground">김</div>
            </div>

            {/* Bot 3 */}
            <div className="flex items-start gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              {botSteps[2]}
            </div>

            {/* User between 3 and 4 */}
            <div className="ml-auto flex max-w-3xl items-start gap-3">
              <div className="rounded-md bg-primary/10 p-4">
                <p>담당자가 승인했어요 계약서를 작성해주세요</p>
              </div>
              <div className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-foreground">김</div>
            </div>

            {/* Bot 4 */}
            <div className="flex items-start gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              {botSteps[3]}
            </div>
          </div>

        </section>
      </section>
    </div>
  );
}
