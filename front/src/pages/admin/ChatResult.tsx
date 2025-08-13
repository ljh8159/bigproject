import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Bot, FileText, Share2 } from "lucide-react";

export default function ChatResult() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "삼성전자 런칭쇼 제안 결과",
    description: "애니메이션 없이 확인하는 최종 제안 요약",
    author: { "@type": "Organization", name: "Celefix" },
    datePublished: "2025-08-06",
  };

  return (
    <div className="flex h-[calc(100vh-5.5rem)] flex-col space-y-4 overflow-hidden">
      <SEO title="삼성전자 런칭쇼 제안 결과 | Celefix" description="애니메이션 없이 확인하는 최종 제안 요약" jsonLd={jsonLd} />

      <main className="flex-1 overflow-y-auto">
        <header className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">삼성전자 런칭쇼 제안 결과</h1>
            <p className="mt-1 text-sm text-muted-foreground">갤럭시 Z 폴드 5 런칭쇼 · 최종 제안 요약</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/admin/chat/proposal">
                <FileText className="h-4 w-4" /> 제안서 상세 보기
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/admin/chat/dashboard-detail">
                <Share2 className="h-4 w-4" /> 세부 대시보드
              </Link>
            </Button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <Card className="p-5">
            <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Bot className="h-4 w-4" /> 최종 제안 요약
            </div>
            <div className="space-y-3 text-sm">
              <p>
                제안 라인업은 <span className="font-semibold text-primary">아이유, 적재, 에픽하이</span>입니다. 각 아티스트의 대중성·음악성·브랜드 적합도를 종합 평가하여 선정했습니다.
              </p>
              <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
                <li><span className="text-foreground">아이유</span>: 20-30대 핵심 타겟과 고도 적합, 최신 앨범 2,500만+ 스트리밍</li>
                <li><span className="text-foreground">적재</span>: 감성 브랜딩 강화, 인디·어쿠스틱 선호층 흡수</li>
                <li><span className="text-foreground">에픽하이</span>: 전 연령 친화 힙합, 화제성·바이럴 기대</li>
              </ul>
              <p>
                예상 총 예산은 <span className="font-semibold text-primary">약 5억 5천만원</span>이며, 미디어 노출 효과는 <span className="font-semibold text-primary">약 15억원</span>으로 추정됩니다.
              </p>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 text-lg font-semibold">핵심 포인트</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-between"><span>브랜드 적합도</span><span className="font-semibold text-[hsl(var(--success))]">매우 높음</span></div>
              <div className="flex items-center justify-between"><span>SNS 화제성 예측</span><span className="font-semibold text-primary">상</span></div>
              <div className="flex items-center justify-between"><span>타겟 도달</span><span className="font-semibold text-[hsl(var(--warning))]">20-40대 전방위</span></div>
            </div>
          </Card>
        </section>

        <section className="mt-4">
          <Card className="p-5">
            <h2 className="mb-2 text-lg font-semibold">행사 운영 개요</h2>
            <ol className="ml-4 list-decimal space-y-2 text-sm text-muted-foreground">
              <li>적재 웰컴 퍼포먼스 (VIP 대상)</li>
              <li>제품 런칭 프레젠테이션</li>
              <li>에픽하이 스페셜 무대</li>
              <li>아이유 스페셜 공연 (하이라이트)</li>
            </ol>
          </Card>
        </section>

        <footer className="mt-6 flex items-center justify-between">
          <Button asChild variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10">
            <Link to="/admin/chat/dashboard">
              <ArrowLeft className="h-4 w-4" /> 챗봇으로 돌아가기
            </Link>
          </Button>
        </footer>
      </main>
    </div>
  );
}
