import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { FileText, Printer, Edit, ArrowLeft, Star, Users, BarChart3, CalendarDays, ShieldCheck } from "lucide-react";

const ChatProposal = () => {
  return (
    <main className="space-y-6">
      <SEO title="제안서 상세 페이지 | Celefix" description="삼성전자 런칭쇼 제안서 상세" />

      {/* 헤더: 제목 및 액션 */}
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> 삼성전자 런칭쇼 제안서
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">삼성전자 마케팅팀 | 2025년 8월 30일 | 작성: 2025-08-06</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10">
            <Printer className="h-4 w-4" /> 인쇄하기
          </Button>
          <Button className="gap-2">
            <Edit className="h-4 w-4" /> 수정하기
          </Button>
        </div>
      </header>

      {/* 추천 라인업 */}
      <section>
        <h2 className="text-lg font-semibold mb-3">추천 라인업</h2>
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" /> 관객층 분석 및 시너지 효과
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {/* 타겟 관객층 분석 */}
            <div className="rounded-md border bg-muted/30 p-4">
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">타겟 관객층 분석</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="mb-1 flex items-center justify-between"><span>20대 초반</span><span>35%</span></div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: "35%" }} />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between"><span>20대 후반</span><span>30%</span></div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-[hsl(var(--urgent))]" style={{ width: "30%" }} />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between"><span>30-40대</span><span>35%</span></div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-[hsl(var(--info))]" style={{ width: "35%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* 음악 장르 선호도 */}
            <div className="rounded-md border bg-muted/30 p-4">
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">음악 장르 선호도</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="mb-1 flex items-center justify-between"><span>팝/K-Pop</span><span>55%</span></div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: "55%" }} />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between"><span>인디/어쿠스틱</span><span>20%</span></div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-[hsl(var(--success))]" style={{ width: "20%" }} />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between"><span>힙합/랩</span><span>25%</span></div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-[hsl(var(--warning))]" style={{ width: "25%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* 시너지 분석 */}
            <div className="rounded-md border bg-muted/30 p-4">
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">라인업 시너지 분석</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between"><span>브랜드 이미지 적합도</span><span className="font-semibold text-[hsl(var(--success))]">96.5%</span></div>
                <div className="flex items-center justify-between"><span>미디어 노출 효과</span><span className="font-semibold text-[hsl(var(--warning))]">98.7%</span></div>
                <div className="flex items-center justify-between"><span>SNS 화제성 예측</span><span className="font-semibold text-primary">매우 높음</span></div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* 연예인 탭 */}
      <section>
        <div className="mb-3 border-b">
          <Tabs defaultValue="iu" className="w-full">
            <TabsList className="bg-transparent p-0">
              <TabsTrigger value="iu" className="data-[state=active]:text-primary">아이유 (IU)</TabsTrigger>
              <TabsTrigger value="jukjae">적재 (Jukjae)</TabsTrigger>
              <TabsTrigger value="epik">에픽하이 (Epik High)</TabsTrigger>
            </TabsList>
            <TabsContent value="iu" className="mt-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-2 grid h-28 w-28 place-items-center overflow-hidden rounded-full bg-muted">
                    <img src="https://page.gensparksite.com/get_upload_url/c91f5a58c5ec2166ffdba0452f4d019e75bc04d9ca050072da28d951a478d84b/default/6653abee-eb4d-451d-a4dd-17e78fd7b475" alt="아이유 프로필" className="h-full w-full object-cover" />
                  </div>
                  <h4 className="mb-1 text-lg font-semibold">아이유 (IU)</h4>
                  <div className="font-semibold text-primary">3.2억원</div>
                  <div className="mt-3 flex gap-2">
                    <Badge variant="outline" className="border-primary/40 text-primary">솔로 가수</Badge>
                    <Badge variant="outline" className="border-[hsl(var(--info))]/40 text-[hsl(var(--info))]">브랜드 앰버서더</Badge>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm text-muted-foreground">대표곡</h4>
                    <div className="flex flex-wrap gap-2 text-sm">
                      {[
                        { title: "라일락", streams: "2.3억" },
                        { title: "에잇 (Prod. SUGA)", streams: "1.9억" },
                        { title: "블루밍", streams: "1.7억" },
                        { title: "삐삐", streams: "1.5억" },
                        { title: "좋은 날", streams: "2.8억" },
                      ].map((s) => (
                        <span key={s.title} className="rounded-lg bg-muted px-3 py-1">
                          {s.title} <span className="ml-2 text-xs text-muted-foreground">{s.streams} 스트리밍</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-sm text-muted-foreground">최근 공연 이력</h4>
                      <div className="space-y-2 text-sm">
                        {[
                          { name: "LG전자 신제품 발표회", audience: "VIP 3,000명", score: "호응도: 99%" },
                          { name: "현대카드 프리미엄 행사", audience: "귀빈 1,500명", score: "호응도: 98%" },
                          { name: "우리카드 프리미엄 행사", audience: "귀빈 1,900명", score: "호응도: 99%" },
                        ].map((e) => (
                          <Card key={e.name} className="bg-muted/30 p-2">
                            <div className="flex items-center justify-between"><span>{e.name}</span><span className="text-primary">{e.audience}</span></div>
                            <div className="mt-1 text-xs text-muted-foreground">{e.score}</div>
                          </Card>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm text-muted-foreground">브랜드 연계성</h4>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {[
                          { label: "프리미엄 이미지", color: "text-primary border-primary/30" },
                          { label: "밀레니얼 타겟", color: "text-[hsl(var(--info))] border-[hsl(var(--info))]/30" },
                          { label: "젊은 기업 이미지", color: "text-[hsl(var(--urgent))] border-[hsl(var(--urgent))]/30" },
                          { label: "미디어 호감도", color: "text-[hsl(var(--success))] border-[hsl(var(--success))]/30" },
                          { label: "국내외 영향력", color: "text-[hsl(var(--warning))] border-[hsl(var(--warning))]/30" },
                        ].map((t) => (
                          <Badge key={t.label} variant="outline" className={`${t.color} rounded-full px-3 py-1`}>
                            {t.label}
                          </Badge>
                        ))}
                      </div>
                      <h4 className="mt-4 mb-2 text-sm text-muted-foreground">마케팅 효과</h4>
                      <ul className="ml-1 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                        <li>SNS 해시태그 이벤트 연계성</li>
                        <li>제품 브랜드 이미지 상승 효과</li>
                        <li>언론 보도 확대 가능성</li>
                        <li>타겟 고객층 구매 전환율 상승</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="jukjae" className="mt-4">
              <Card className="p-4 text-sm text-muted-foreground">적재 관련 제안 정보가 여기에 표시됩니다.</Card>
            </TabsContent>
            <TabsContent value="epik" className="mt-4">
              <Card className="p-4 text-sm text-muted-foreground">에픽하이 관련 제안 정보가 여기에 표시됩니다.</Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* 예산 & 일정 */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* 예산 세부 내역 */}
        <Card className="p-5">
          <h2 className="mb-4 text-lg font-semibold">예산 세부 내역</h2>
          <div className="space-y-4 text-sm">
            {[{ label: "아이유 출연료", value: 60, color: "bg-primary" }, { label: "적재 출연료", value: 16, color: "bg-[hsl(var(--info))]" }, { label: "에픽하이 출연료", value: 24, color: "bg-[hsl(var(--urgent))]" }].map((b) => (
              <div key={b.label}>
                <div className="mb-1 flex items-center justify-between"><span>{b.label}</span><span>{b.value}%</span></div>
                <div className="h-2 rounded-full bg-muted"><div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.value}%` }} /></div>
              </div>
            ))}
            <div className="border-t pt-3">
              <div className="flex items-center justify-between font-semibold"><span>총 출연료</span><span>5억원 (100%)</span></div>
            </div>
          </div>
        </Card>
        {/* 행사 당일 스케줄 */}
        <Card className="p-5">
          <h2 className="mb-4 text-lg font-semibold">행사 당일 스케줄</h2>
          <div className="space-y-4">
            {[
              { color: "bg-[hsl(var(--info))]", title: "행사장 세팅 및 리허설", time: "11:00-15:00", desc: "음향, 영상, 조명 시스템 테스트" },
              { color: "bg-[hsl(var(--success))]", title: "VIP 입장 및 적재 공연", time: "16:00-16:45", desc: "어쿠스틱 웰컴 퍼포먼스" },
              { color: "bg-[hsl(var(--warning))]", title: "제품 런칭 프레젠테이션", time: "17:00-17:45", desc: "CEO 연설 및 신제품 소개" },
              { color: "bg-[hsl(var(--urgent))]", title: "에픽하이 공연", time: "18:00-18:45", desc: "브랜드 이미지 연계 특별 공연" },
              { color: "bg-primary", title: "아이유 스페셜 공연", time: "19:00-20:30", desc: "컨셉 맞춤형 스테이지" },
            ].map((t) => (
              <div key={t.title} className="relative pl-7">
                <div className={`absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full ${t.color}`} />
                <div className="flex items-center justify-between"><h3 className="font-medium">{t.title}</h3><span className="text-xs text-muted-foreground">{t.time}</span></div>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* 계약 조건 & 보안 */}
      <section className="grid gap-6 md:grid-cols-2">
        <Card className="p-5">
          <h2 className="mb-4 text-lg font-semibold">계약 조건</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h3 className="mb-2 text-sm font-medium text-foreground">출연료 지급 조건</h3>
              <ul className="ml-1 list-disc space-y-1 pl-4">
                <li>계약금 40%는 30일전 선지급</li>
                <li>30-45일 전: 70% 환불</li>
                <li>15-29일 전: 40% 환불</li>
                <li>14일 이내: 환불 불가</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium text-foreground">기술 요구사항</h3>
              <ul className="ml-1 list-disc space-y-1 pl-4">
                <li>4K 고해상도 LED 스크린</li>
                <li>프리미엄급 음향 시스템</li>
                <li>아티스트별 개인 대기실 필수</li>
                <li>사전 기술 점검 및 리허설 일정 확보</li>
              </ul>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="mb-4 text-lg font-semibold">보안 및 안전</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h3 className="mb-2 text-sm font-medium text-foreground">보안 규정</h3>
              <ul className="ml-1 list-disc space-y-1 pl-4">
                <li>제품 정보 기밀 유지 계약 필수</li>
                <li>행사 전 보안 브리핑 진행</li>
                <li>미디어 촬영 제한 구역 설정</li>
                <li>초청자 신원 확인 절차</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium text-foreground">안전 대책</h3>
              <p>프리미엄 경호 인력 배치 (아이유 7인, 적재 3인, 에픽하이 5인) 및 긴급 상황 대비 의료진 상주</p>
            </div>
          </div>
        </Card>
      </section>

      {/* 하단 버튼 */}
      <footer className="flex items-center justify-between">
        <Button asChild variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10">
          <Link to="/admin/chat/dashboard/solid">
            <ArrowLeft className="h-4 w-4" /> 챗봇으로 돌아가기
          </Link>
        </Button>
        <Button className="gap-2">
          <Star className="h-4 w-4" /> 템플릿에 추가
        </Button>
      </footer>
    </main>
  );
};

export default ChatProposal;
