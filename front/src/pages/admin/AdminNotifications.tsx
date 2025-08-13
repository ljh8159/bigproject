import SEO from "@/components/SEO";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Clock, Check, X, Eye, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Stat = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="ml-2 font-semibold text-foreground">{value}</span>
  </div>
);

const LeftStripe = ({ color }: { color: string }) => (
  <span className={`absolute inset-y-0 left-0 w-1.5 ${color}`} aria-hidden="true" />
);

export default function AdminNotifications() {
  const { toast } = useToast();
  const [approvedSNU, setApprovedSNU] = useState(false);

  const handleMarkAllRead = () => {
    window.dispatchEvent(new Event("notifications:clear"));
    toast({ title: "모두 읽음 처리", description: "모든 알림을 읽음 처리했어요." });
  };
  return (
    <div>
      <SEO title="관리자 알림 | Celefix" description="시스템 및 작업 알림" />

      <header className="mb-6">
        <h1 className="text-2xl font-bold">알림 센터</h1>
        <p className="text-muted-foreground mt-2">새로운 섭외 요청 및 시스템 알림을 확인하세요</p>
      </header>

      <section className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Stat label="미확인" value={5} />
          <Stat label="오늘" value={8} />
          <Stat label="이번 주" value={27} />
        </div>
        <Button size="sm" onClick={handleMarkAllRead}>
          <Check className="mr-2 h-4 w-4" /> 모두 읽음 표시
        </Button>
      </section>

      <Tabs defaultValue="requests" className="w-full">
        <TabsList>
          <TabsTrigger value="requests">
            섭외 요청 <Badge className="ml-2">5</Badge>
          </TabsTrigger>
          <TabsTrigger value="system">
            시스템 알림 <Badge variant="secondary" className="ml-2">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="approved">
            승인 내역 <Badge variant="secondary" className="ml-2">12</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="mt-6 space-y-6">
          {/* 긴급 요청 - 높은 우선순위 */}
          <Card className="relative overflow-hidden">
            <LeftStripe color={approvedSNU ? "bg-[hsl(var(--success))]" : "bg-[hsl(var(--destructive))]"} />
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="mr-5 grid h-14 w-14 flex-shrink-0 place-items-center rounded-full bg-primary text-primary-foreground font-bold">
                    서울대
                  </div>
                  <div>
                    <CardTitle className="text-xl">서울대학교 축제준비위원회</CardTitle>
                    <CardDescription className="mt-2 flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" /> 2025.08.30 (D-3)
                      <span>•</span>
                      <Clock className="h-4 w-4" /> 3분 전
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">긴급 요청</Badge>
                  <Badge variant="destructive">높은 우선순위</Badge>
                  <Badge variant="secondary">대기중</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="mb-1 text-sm text-muted-foreground">예산</div>
                  <div className="text-lg font-semibold">6,500만원</div>
                </div>
                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="mb-1 text-sm text-muted-foreground">행사명</div>
                  <div className="text-lg font-semibold">여름 정기 축제</div>
                </div>
                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="mb-1 text-sm text-muted-foreground">담당자</div>
                  <div className="text-lg font-semibold">박지현 (축준위장)</div>
                </div>
              </div>

              <div>
                <div className="mb-2 text-base">요청 아티스트:</div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-sm text-primary">아이유</span>
                  <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-sm text-primary">에스파</span>
                  <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-sm text-primary">적재</span>
                </div>
              </div>

              <div className="rounded-lg border bg-muted/40 p-4 text-base">
                작년과 같이 뛰어난 라인업으로 성공적인 축제를 기대합니다. 특히 아이유는 꼭 섭외 부탁드립니다.
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">담당자: 미지정</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className={approvedSNU ? "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] hover:bg-[hsl(var(--success))]" : ""}
                  onClick={() => {
                    setApprovedSNU(true);
                    toast({
                      title: "축제 승인되었습니다.",
                      description: "서울대학교 축제준비위원회의 요청이 승인 처리되었습니다.",
                    });
                  }}
                >
                  <Check className="mr-2 h-4 w-4" /> 승인
                </Button>
                <Button size="sm" variant="destructive">
                  <X className="mr-2 h-4 w-4" /> 반려
                </Button>
                <Button size="sm" variant="secondary">
                  <Eye className="mr-2 h-4 w-4" /> 상세
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* 미확인 요청 - 중간 우선순위 */}
          <Card className="relative overflow-hidden">
            <LeftStripe color="bg-[hsl(var(--accent))]" />
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="mr-5 grid h-14 w-14 flex-shrink-0 place-items-center rounded-full bg-accent text-accent-foreground font-bold">
                    부산
                  </div>
                  <div>
                    <CardTitle className="text-xl">부산 바다 페스티벌 기획단</CardTitle>
                    <CardDescription className="mt-2 flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" /> 2025.08.15 (D-7)
                      <span>•</span>
                      <Clock className="h-4 w-4" /> 35분 전
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent))]">중간 우선순위</Badge>
                  <Badge variant="secondary">대기중</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="mb-1 text-sm text-muted-foreground">예산</div>
                  <div className="text-lg font-semibold">8,200만원</div>
                </div>
                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="mb-1 text-sm text-muted-foreground">행사명</div>
                  <div className="text-lg font-semibold">여름 해변 음악 페스티벌</div>
                </div>
                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="mb-1 text-sm text-muted-foreground">담당자</div>
                  <div className="text-lg font-semibold">이수진 (기획실장)</div>
                </div>
              </div>
              <div>
                <div className="mb-2 text-base">요청 아티스트:</div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-sm text-primary">에픽하이</span>
                  <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-sm text-primary">아이브</span>
                  <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-sm text-primary">투모로우바이투게더</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">담당자: 최지수</span>
              <div className="flex gap-2">
                <Button size="sm">
                  <Check className="mr-2 h-4 w-4" /> 승인
                </Button>
                <Button size="sm" variant="destructive">
                  <X className="mr-2 h-4 w-4" /> 반려
                </Button>
                <Button size="sm" variant="secondary">
                  <Eye className="mr-2 h-4 w-4" /> 상세
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* 승인된 요청 - 낮은 우선순위 */}
          <Card className="relative overflow-hidden">
            <LeftStripe color="bg-[hsl(var(--success))]" />
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="mr-5 grid h-14 w-14 flex-shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground font-bold">
                    한양대
                  </div>
                  <div>
                    <CardTitle className="text-xl">한양대학교 총학생회</CardTitle>
                    <CardDescription className="mt-2 flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" /> 2025.09.20 (D-12)
                      <span>•</span>
                      <Clock className="h-4 w-4" /> 오늘 10:25
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] hover:bg-[hsl(var(--success))]">낮은 우선순위</Badge>
                  <Badge>승인됨</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="mb-1 text-sm text-muted-foreground">예산</div>
                  <div className="text-lg font-semibold">5,500만원</div>
                </div>
                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="mb-1 text-sm text-muted-foreground">행사명</div>
                  <div className="text-lg font-semibold">가을 축제 라인업</div>
                </div>
                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="mb-1 text-sm text-muted-foreground">담당자</div>
                  <div className="text-lg font-semibold">김준호 (총학생회장)</div>
                </div>
              </div>
              <div>
                <div className="mb-2 text-base">승인 아티스트:</div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-sm text-primary">뉴진스</span>
                  <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-sm text-primary">세븐틴</span>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/40 p-4 text-base">
                계약 체결 및 입금 안내 메일을 발송했습니다. (2025.08.01)
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">담당자: 김희연</span>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary">
                  <Eye className="mr-2 h-4 w-4" /> 계약서 확인
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-destructive" /> 시스템 점검 안내
              </CardTitle>
              <CardDescription>오늘 18:00 - 18:30 사이 간헐적 접속 지연이 있을 수 있습니다.</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">최근 승인된 요청</CardTitle>
              <CardDescription>승인 내역이 여기 표시됩니다.</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
