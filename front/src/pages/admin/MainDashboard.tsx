import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Search, Star, Users, LineChart as LineIcon, Crown } from "lucide-react";
import TopTalents from "./dashboard/TopTalents";
import PortfolioAnalysis from "./dashboard/PortfolioAnalysis";
import PerformanceMetrics from "./dashboard/PerformanceMetrics";
import TrendingTalents from "./dashboard/TrendingTalents";

const Metric = ({ label, value, icon: Icon }: { label: string; value: string; icon: any }) => (
  <div className="rounded-md border bg-muted/40 p-3 flex items-center gap-3">
    <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-xl font-bold text-foreground">{value}</div>
    </div>
  </div>
);

const MainDashboard = () => {
  return (
    <div>
      <SEO title="메인 대시보드 | Celefix" description="연예인 종합 대시보드와 포트폴리오/성과 지표" />

      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <span className="inline-flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" /> 연예인 종합 대시보드
          </span>
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Search className="h-4 w-4" /> 연예인 검색
          </Button>
          <Button size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" /> 새로고침
          </Button>
        </div>
      </header>

      {/* Summary metrics */}
      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Metric label="총 연예인" value="478명" icon={Users} />
        <Metric label="신규 유입 (30일)" value="+23명" icon={LineIcon} />
        <Metric label="평균 출연료" value="3.8억원" icon={Star} />
        <Metric label="S급 인재" value="47명" icon={Crown} />
      </section>

      {/* Main grid */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">인기 연예인 TOP 5</CardTitle>
              <Button variant="outline" size="sm">인기도 기준</Button>
            </div>
          </CardHeader>
          <CardContent>
            <TopTalents />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">연예인 포트폴리오 분석</CardTitle>
              <Button variant="outline" size="sm">자세히 보기</Button>
            </div>
          </CardHeader>
          <CardContent>
            <PortfolioAnalysis />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">연예인 성과 지표</CardTitle>
              <span className="text-sm text-muted-foreground">최근 3개월</span>
            </div>
          </CardHeader>
          <CardContent>
            <PerformanceMetrics />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">유망 연예인 & 트렌드 분석</CardTitle>
              <Button variant="outline" size="sm" className="gap-1">신규 발굴</Button>
            </div>
          </CardHeader>
          <CardContent>
            <TrendingTalents />
          </CardContent>
        </Card>
      </section>

      <footer className="mt-4 text-center text-xs text-muted-foreground">
        © 2025 더메르센 에이전시 | 마지막 업데이트: 2025-08-06 10:45
      </footer>
    </div>
  );
};

export default MainDashboard;
