import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { Download, RefreshCw, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const snsData = [
  { month: "2월", likes: 22000, comments: 12000, shares: 6000 },
  { month: "3월", likes: 26000, comments: 15000, shares: 7000 },
  { month: "4월", likes: 24000, comments: 14000, shares: 6500 },
  { month: "5월", likes: 30000, comments: 18000, shares: 9000 },
  { month: "6월", likes: 33000, comments: 20000, shares: 11000 },
  { month: "7월", likes: 35000, comments: 21000, shares: 12000 },
];

const activityDist = [
  { name: "페스티벌", value: 35, fill: "hsl(330 78% 60%)" },
  { name: "대학축제", value: 25, fill: "hsl(221 83% 53%)" },
  { name: "기업행사", value: 20, fill: "hsl(41 96% 56%)" },
  { name: "TV출연", value: 20, fill: "hsl(142 71% 45%)" },
];

export default function ChatDashboardDetail() {
  return (
    <div className="flex h-[calc(100vh-5.5rem)] flex-col space-y-4 overflow-hidden">
      <SEO
        title="세부 대시보드 - 삼성전자 런칭쇼 | Celefix"
        description="챗봇 내 세부 대시보드에서 실시간 통계, 출연 히스토리, 활동 분포와 지역 선호도를 확인하세요."
      />

      <main className="flex-1 overflow-y-auto">
        <section className="space-y-4">
          <header className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">챗봇 내 세부 대시보드</h1>
            <span className="rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground">실시간 업데이트</span>
          </header>

          {/* 탭 (단순 표시) */}
          <nav className="flex items-center gap-5 border-b border-border pb-2 text-sm">
            <button className="relative pb-2 text-foreground after:absolute after:-bottom-[1px] after:left-0 after:h-0.5 after:w-full after:bg-primary">아이유 (IU)</button>
            <button className="pb-2 text-muted-foreground hover:text-foreground">적재 (Jukjae)</button>
            <button className="pb-2 text-muted-foreground hover:text-foreground">에픽하이 (Epik High)</button>
          </nav>

          {/* 핵심 지표 */}
          <section className="grid grid-cols-1 gap-3 md:grid-cols-4">
            {[
              { label: "총 팔로워", value: "1.2M" },
              { label: "월 평균 수입", value: "₩85.6M" },
              { label: "연간 행사", value: "42" },
              { label: "브랜드 가치", value: "₩5.7B" },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-lg border border-border bg-card p-3">
                <div className="text-xs text-muted-foreground">{kpi.label}</div>
                <div className="text-xl font-bold">{kpi.value}</div>
                <div className="text-xs text-[hsl(var(--success))]">업데이트</div>
              </div>
            ))}
          </section>

          {/* 상단 그리드 */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* SNS 반응 추이 */}
            <article className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">SNS 반응 추이</h2>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="gap-1">
                    <Download className="h-4 w-4" /> 저장하기
                  </Button>
                  <Button size="sm" className="gap-1">
                    <RefreshCw className="h-4 w-4" /> 새로고침
                  </Button>
                </div>
              </div>
              <ChartContainer
                className="h-56 w-full"
                config={{
                  likes: { label: "좋아요", color: "hsl(330 78% 60%)" },
                  comments: { label: "댓글", color: "hsl(221 83% 53%)" },
                  shares: { label: "공유", color: "hsl(199 89% 48%)" },
                }}
              >
                <LineChart data={snsData} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="likes" stroke="var(--color-likes)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="comments" stroke="var(--color-comments)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="shares" stroke="var(--color-shares)" strokeWidth={2} dot={false} />
                </LineChart>
              </ChartContainer>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded bg-muted/40 p-2 text-center">
                  <div className="text-xs text-muted-foreground">총 좋아요</div>
                  <div className="text-lg font-bold">172.8K</div>
                </div>
                <div className="rounded bg-muted/40 p-2 text-center">
                  <div className="text-xs text-muted-foreground">평균 댓글</div>
                  <div className="text-lg font-bold">68.3K</div>
                </div>
                <div className="rounded bg-muted/40 p-2 text-center">
                  <div className="text-xs text-muted-foreground">공유 전환율</div>
                  <div className="text-lg font-bold">4.8%</div>
                </div>
              </div>
            </article>

            {/* 실시간 통계 + 출연 히스토리 */}
            <div className="grid grid-rows-2 gap-4">
              <article className="rounded-xl border border-border bg-card p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">실시간 통계</h2>
                  <span className="rounded-full border border-border bg-muted/40 px-2 py-0.5 text-xs">LIVE</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { k: "현재 계약 가치", v: "₩2.4B" },
                    { k: "팬덤 성장률", v: "+32.6%" },
                    { k: "브랜드 협업", v: "8" },
                    { k: "출연료 지수", v: "8.7/10" },
                  ].map((i) => (
                    <div key={i.k} className="rounded bg-muted/40 p-3">
                      <div className="text-xs text-muted-foreground">{i.k}</div>
                      <div className="text-xl font-bold">{i.v}</div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-xl border border-border bg-card p-4">
                <h2 className="mb-3 text-lg font-semibold">출연 히스토리</h2>
                <div className="h-48 space-y-3 overflow-y-auto pr-2">
                  {[
                    { name: "서울대학교 여름 축제", meta: "2025년 7월 20일 · 5,200명" },
                    { name: "뮤직뱅크 컴백 스페셜", meta: "2025년 7월 3일 · 전국 방송" },
                    { name: "삼성전자 신제품 런칭쇼", meta: "2025년 6월 15일 · 1,200명" },
                    { name: "서울 재즈 페스티벌", meta: "2025년 5월 27-28일 · 8,500명" },
                    { name: "LG전자 신기술 발표회", meta: "2025년 5월 10일 · 850명" },
                  ].map((e) => (
                    <div key={e.name} className="border-l-2 border-primary/30 pl-3">
                      <div className="text-sm font-medium text-primary">{e.name}</div>
                      <div className="text-xs text-muted-foreground">{e.meta}</div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>

          {/* 하단 그리드 */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* 활동 유형별 분포 */}
            <article className="rounded-xl border border-border bg-card p-4">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-semibold">활동 유형별 분포</h2>
                <select className="rounded border border-border bg-background px-2 py-1 text-xs">
                  <option>2025년</option>
                  <option>2024년</option>
                  <option>2023년</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center min-h-[16rem]">
                <ChartContainer className="h-48 w-full" config={{ dist: { label: "분포", color: "hsl(330 78% 60%)" } }}>
                  <PieChart>
                    <Pie data={activityDist} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                      {activityDist.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                  </PieChart>
                </ChartContainer>
                <div className="space-y-3">
                  {activityDist.map((i) => (
                    <div key={i.name}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>{i.name}</span>
                        <span className="font-semibold">{i.value}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full" style={{ width: `${i.value}%`, backgroundColor: i.fill }} />
                      </div>
                      
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* 지역별 선호도 & 최근 활동 */}
            <article className="rounded-xl border border-border bg-card p-4">
              <h2 className="mb-3 text-lg font-semibold">지역별 선호도</h2>
              <div className="space-y-3">
                {[
                  { name: "서울", v: 52 },
                  { name: "부산", v: 18 },
                  { name: "대구", v: 12 },
                  { name: "인천", v: 10 },
                  { name: "기타", v: 8 },
                ].map((r) => (
                  <div key={r.name}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>{r.name}</span>
                      <span>{r.v}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-primary" style={{ width: `${r.v}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded bg-muted/40 p-2 text-center">
                  <div className="text-xs text-muted-foreground">갤럭시 지수</div>
                  <div className="text-lg font-bold text-primary">8.7/10</div>
                </div>
                <div className="rounded bg-muted/40 p-2 text-center">
                  <div className="text-xs text-muted-foreground">유효 접촉</div>
                  <div className="text-lg font-bold text-primary">12</div>
                </div>
              </div>
            </article>
          </section>
        </section>
      </main>

      <footer className="border-t border-border p-4">
        <Button asChild variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10">
          <Link to="/admin/chat/dashboard/solid">
            <ArrowLeft className="h-4 w-4" /> 챗봇으로 돌아가기
          </Link>
        </Button>
      </footer>
    </div>
  );
}
