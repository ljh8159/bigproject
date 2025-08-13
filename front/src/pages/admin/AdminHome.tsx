import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";
import { RefreshCcw, CalendarPlus } from "lucide-react";

// New datasets matching the requested layout
const contractData = [
  { month: "1월", value: 18 },
  { month: "2월", value: 22 },
  { month: "3월", value: 19 },
  { month: "4월", value: 27 },
  { month: "5월", value: 30 },
  { month: "6월", value: 28 },
  { month: "7월", value: 32 },
];

const popularityData = [
  { name: "아이유", value: 42 },
  { name: "뉴진스", value: 38 },
  { name: "에스파", value: 35 },
  { name: "세븐틴", value: 31 },
  { name: "BTS", value: 28 },
];

export default function AdminHome() {
  return (
    <div className="space-y-6">
      <SEO title="관리자 홈페이지 | Celefix" description="요청·계약·라인업 현황 요약 대시보드" />

      {/* 상단 환영 영역 */}
      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">안녕하세요, 김희연 관리자님!</h1>
          <p className="text-muted-foreground mt-1">오늘의 요청 및 계약 현황을 확인하세요</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCcw className="h-4 w-4" /> 새로고침
          </Button>
          <Button size="sm" className="gap-2">
            <CalendarPlus className="h-4 w-4" /> 일정 등록
          </Button>
        </div>
      </section>

      {/* 상태 요약 카드 */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">오늘 접수된 요청</div>
            <div className="text-2xl font-bold">5건</div>
            <div className="text-xs mt-1 text-[hsl(var(--success))]">▲ 전일 대비 2건 증가</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">이번달 계약 건수</div>
            <div className="text-2xl font-bold text-primary">32건</div>
            <div className="text-xs mt-1 text-[hsl(var(--info))]">목표 대비 91% 달성</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">가용 가능 연예인</div>
            <div className="text-2xl font-bold text-[hsl(var(--info))]">218명</div>
            <div className="text-xs mt-1 text-muted-foreground">전체 478명 중</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">평균 계약 성사율</div>
            <div className="text-2xl font-bold text-[hsl(var(--success))]">76.8%</div>
            <div className="text-xs mt-1 text-[hsl(var(--success))]">▲ 전월 대비 3.2% 상승</div>
          </CardContent>
        </Card>
      </section>

      {/* 차트 & 임박 요청 */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* 계약 추이 차트 */}
        <Card className="xl:col-span-2">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">월별 계약 추이</h2>
              <div className="flex gap-1">
                <Button variant="secondary" size="sm" className="h-7 px-2 text-xs">일간</Button>
                <Button variant="outline" size="sm" className="h-7 px-2 text-xs text-primary border-primary/40">월간</Button>
                <Button variant="secondary" size="sm" className="h-7 px-2 text-xs">연간</Button>
              </div>
            </div>
            <ChartContainer
              className="h-64 w-full"
              config={{ contracts: { label: "계약 건수", color: "hsl(var(--primary))" } }}
            >
              <LineChart data={contractData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="value" stroke="var(--color-contracts)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 임박 요청 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">임박 요청</h2>
              <a href="#" className="text-sm text-primary hover:underline">전체보기</a>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg p-3 bg-secondary/40 border border-border/60 border-l-4 border-l-[hsl(var(--urgent))]">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">서울대학교 축제</h3>
                  <span className="px-2 py-0.5 text-xs rounded-full border text-[hsl(var(--urgent))] border-[hsl(var(--urgent))] bg-[hsl(var(--urgent))/0.15]">D-3</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">예산: 6,500만원 | 아티스트: 아이유, 에스파, 적재</div>
                <div className="flex justify-end mt-2">
                  <Button variant="outline" size="sm" className="h-7 px-3 text-xs bg-primary/10 text-primary border-primary/40">빠른 처리</Button>
                </div>
              </div>

              <div className="rounded-lg p-3 bg-secondary/40 border border-border/60 border-l-4 border-l-[hsl(var(--warning))]">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">부산 바다 페스티벌</h3>
                  <span className="px-2 py-0.5 text-xs rounded-full border text-[hsl(var(--warning))] border-[hsl(var(--warning))] bg-[hsl(var(--warning))/0.15]">D-7</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">예산: 8,200만원 | 아티스트: 뉴진스, 에픽하이, 아이브</div>
                <div className="flex justify-end mt-2">
                  <Button variant="secondary" size="sm" className="h-7 px-3 text-xs">상세보기</Button>
                </div>
              </div>

              <div className="rounded-lg p-3 bg-secondary/40 border border-border/60 border-l-4 border-l-[hsl(var(--info))]">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">한양대학교 축제</h3>
                  <span className="px-2 py-0.5 text-xs rounded-full border text-[hsl(var(--success))] border-[hsl(var(--success))] bg-[hsl(var(--success))/0.15]">D-12</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">예산: 5,500만원 | 아티스트: 세븐틴, BTS, 에스파</div>
                <div className="flex justify-end mt-2">
                  <Button variant="secondary" size="sm" className="h-7 px-3 text-xs">상세보기</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 최근 접수 & 인기 연예인 */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* 최근 접수된 요청 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">최근 접수된 요청</h2>
              <a href="#" className="text-sm text-primary hover:underline">모두 보기</a>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="text-left uppercase font-medium pb-2">기관명</th>
                    <th className="text-left uppercase font-medium pb-2">행사일</th>
                    <th className="text-left uppercase font-medium pb-2">예산</th>
                    <th className="text-center uppercase font-medium pb-2">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  <tr>
                    <td className="py-3">고려대학교 축제위원회</td>
                    <td>2025-09-15</td>
                    <td>7,000만원</td>
                    <td className="text-center">
                      <span className="px-2 py-0.5 text-xs rounded-full border text-[hsl(var(--warning))] border-[hsl(var(--warning))] bg-[hsl(var(--warning))/0.15]">대기중</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3">삼성전자 런칭쇼</td>
                    <td>2025-08-30</td>
                    <td>1억 2천만원</td>
                    <td className="text-center">
                      <span className="px-2 py-0.5 text-xs rounded-full border text-primary border-primary/60 bg-primary/10">승인</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3">인천 음악 페스티벌</td>
                    <td>2025-09-22</td>
                    <td>9,500만원</td>
                    <td className="text-center">
                      <span className="px-2 py-0.5 text-xs rounded-full border text-[hsl(var(--warning))] border-[hsl(var(--warning))] bg-[hsl(var(--warning))/0.15]">대기중</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3">CJ ENM 시상식</td>
                    <td>2025-12-10</td>
                    <td>2억 5천만원</td>
                    <td className="text-center">
                      <span className="px-2 py-0.5 text-xs rounded-full border text-[hsl(var(--warning))] border-[hsl(var(--warning))] bg-[hsl(var(--warning))/0.15]">대기중</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 인기 연예인 통계 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">인기 연예인 통계</h2>
              <a href="#" className="text-sm text-primary hover:underline">대시보드 보기</a>
            </div>
            <ChartContainer
              className="h-60 w-full"
              config={{ popularity: { label: "요청 빈도", color: "hsl(330 78% 60%)" } }}
            >
              <BarChart data={popularityData} layout="vertical" margin={{ left: 24 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" />
                <CartesianGrid horizontal vertical={false} strokeDasharray="3 3" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" radius={[4, 4, 4, 4]} fill="var(--color-popularity)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>

      {/* 푸터 */}
      <p className="text-center text-xs text-muted-foreground">© 2025 Celefix | 관리자 시스템 v1.2.5</p>
    </div>
  );
}
