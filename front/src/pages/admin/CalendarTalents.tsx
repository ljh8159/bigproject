import SEO from "@/components/SEO";
import { NavLink } from "react-router-dom";
import { AlertTriangle, Bell, Calendar as CalendarIcon, CheckCircle2, ChevronLeft, ChevronRight, Filter, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

import * as React from "react";
import { useToast } from "@/hooks/use-toast";

type Status = "available" | "booked" | "pending" | "conflict";

type CalendarEvent = {
  label: string;
  status: Status;
};

const statusStyles: Record<Status, string> = {
  available: "bg-success/15 border-l-2 border-success text-foreground/90",
  booked: "bg-success/15 border-l-2 border-success text-foreground/90",
  pending: "bg-warning/20 border-l-2 border-warning text-foreground/90",
  conflict: "bg-destructive/15 border-l-2 border-destructive text-foreground/90",
};

function getMonthGrid(year: number, monthIndex0: number) {
  // monthIndex0: 0-based month index
  const firstOfMonth = new Date(year, monthIndex0, 1);
  const startDay = firstOfMonth.getDay(); // 0 = Sun
  const daysInMonth = new Date(year, monthIndex0 + 1, 0).getDate();

  const prevMonthDays = new Date(year, monthIndex0, 0).getDate();

  const cells: { date: Date; inCurrentMonth: boolean }[] = [];

  // Leading days from previous month
  for (let i = 0; i < startDay; i++) {
    cells.push({
      date: new Date(year, monthIndex0 - 1, prevMonthDays - startDay + i + 1),
      inCurrentMonth: false,
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, monthIndex0, d), inCurrentMonth: true });
  }

  // Trailing days to fill 6 weeks (42 cells)
  while (cells.length % 7 !== 0 || cells.length < 42) {
    const last = cells[cells.length - 1].date;
    const next = new Date(last);
    next.setDate(last.getDate() + 1);
    cells.push({ date: next, inCurrentMonth: false });
  }

  return cells;
}

const eventsMap: Record<string, CalendarEvent[]> = {
  "2025-07-01": [{ label: "아이유 - 뮤직뱅크 출연", status: "booked" }],
  "2025-07-02": [
    { label: "뉴진스 - 가용", status: "available" },
    { label: "에스파 - 가용", status: "available" },
  ],
  "2025-07-03": [{ label: "BTS - 미정", status: "pending" }],
  "2025-07-04": [
    { label: "아이유 - 스케줄 충돌", status: "conflict" },
    { label: "아이유 - KBS 음악 특집 (19:00)", status: "conflict" },
    { label: "아이유 - 대학 축제 출연 (18:30)", status: "conflict" },
  ],
  "2025-07-07": [{ label: "에스파 - 공연", status: "booked" }],
  "2025-07-08": [{ label: "아이브 - 팬미팅", status: "booked" }],
  "2025-07-09": [
    { label: "적재 - 협의중", status: "pending" },
    { label: "에픽하이 - 가용", status: "available" },
  ],
  "2025-07-10": [{ label: "아이유 - 가용", status: "available" }],
  "2025-07-11": [
    { label: "아이유 - 가용", status: "available" },
    { label: "뉴진스 - 가용", status: "available" },
  ],
  "2025-07-14": [{ label: "에픽하이 - 페스티벌", status: "booked" }],
  "2025-07-15": [{ label: "적재 - 가용", status: "available" }],
  "2025-07-16": [{ label: "뉴진스 - 가용", status: "available" }],
  "2025-07-17": [{ label: "아이브 - 가용", status: "available" }],
  "2025-07-21": [{ label: "에스파 - 협의중", status: "pending" }],
  "2025-07-22": [
    { label: "아이유 - 가용", status: "available" },
    { label: "에픽하이 - 가용", status: "available" },
  ],
  "2025-07-23": [{ label: "적재 - 가용", status: "available" }],
  "2025-07-25": [{ label: "적재 - 일정 조율중", status: "pending" }],
  "2025-07-28": [{ label: "에픽하이 - 협의중", status: "pending" }],
  "2025-07-29": [{ label: "BTS - 페스티벌 출연", status: "booked" }],
  "2025-07-31": [
    { label: "아이유 - 대학 축제 출연", status: "booked" },
    { label: "에픽하이 - 대학 축제 출연", status: "booked" },
  ],
};

const CalendarTalents: React.FC = () => {
  const { toast } = useToast();
  const [year] = React.useState(2025);
  const [monthIndex0] = React.useState(6); // 0-based -> 6 = July

  const cells = React.useMemo(() => getMonthGrid(year, monthIndex0), [year, monthIndex0]);

  const onPrev = () => {
    toast({ description: "월 이동은 곧 제공됩니다." });
  };
  const onNext = () => {
    toast({ description: "월 이동은 곧 제공됩니다." });
  };
  const onRefresh = () => {
    toast({ description: "새로고침 완료" });
  };

  const fmtKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  return (
    <div>
      <SEO title="캘린더(연예인) | Celefix" description="연예인 가용 여부 캘린더" />

      <nav aria-label="캘린더 탭" className="border-b mb-4 flex items-center justify-between">
        <ul className="flex gap-1">
          <li>
            <NavLink to="/admin/calendar/talents" className={({ isActive }) => `px-4 py-2 text-sm font-medium border-b-2 ${isActive ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>연예인 스케줄</NavLink>
          </li>
          <li>
            <NavLink to="/admin/calendar/events" className={({ isActive }) => `px-4 py-2 text-sm font-medium border-b-2 ${isActive ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>행사 스케줄</NavLink>
          </li>
          <li>
            <NavLink to="/admin/calendar/contracts" className={({ isActive }) => `px-4 py-2 text-sm font-medium border-b-2 ${isActive ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>계약 관리</NavLink>
          </li>
        </ul>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-1 text-xs">
            <span>Google Calendar 연동됨</span>
            <CheckCircle2 className="h-4 w-4 text-success" aria-hidden />
          </div>
          <button className="rounded-lg border border-border bg-muted/30 p-2 transition hover:bg-muted/50" aria-label="새로고침" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </nav>


      <div className="flex items-center justify-between rounded-md border-l-4 border-destructive bg-destructive/20 p-3 mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <span className="font-medium">스케줄 충돌 감지!</span>
          <span className="text-sm text-muted-foreground">아이유님의 7월 4일 일정이 중복되어있습니다. (2건의 스케줄 충돌)</span>
        </div>
        <button className="inline-flex items-center gap-1 rounded-full border border-accent bg-accent px-2 py-1 text-xs text-accent-foreground shadow transition hover:bg-accent/90">
          <Bell className="h-3.5 w-3.5" />
          알림 보내기
        </button>
      </div>

      <section className="rounded-lg border border-border bg-card p-4">
        {/* 필터 영역 */}
        <div className="mb-4 border-b pb-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="font-medium">연예인 필터</div>
            <div className="text-xs">
              <button className="text-info hover:underline">모두 선택</button>
              <span className="mx-2 text-muted-foreground">|</span>
              <button className="text-info hover:underline">선택 해제</button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "아이유", dot: "bg-primary", active: true },
              { name: "적재", dot: "bg-success", active: true },
              { name: "에픽하이", dot: "bg-info", active: true },
              { name: "뉴진스", dot: "bg-warning", active: true },
              { name: "에스파", dot: "bg-accent", active: true },
              { name: "아이브", dot: "bg-urgent", active: true },
              { name: "BTS", dot: "bg-muted-foreground", active: false },
            ].map((a) => (
              <button
                key={a.name}
                className={`flex items-center rounded-full border px-3 py-1 text-xs transition ${
                  a.active ? "bg-muted/60 border-accent/50" : "bg-muted/30 border-border text-muted-foreground"
                }`}
              >
                <span className={`mr-1 inline-block h-2 w-2 rounded-full ${a.dot}`} />
                {a.name}
              </button>
            ))}
          </div>
        </div>

        {/* 컨트롤 영역 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <button className="mr-2 rounded-lg border border-border bg-muted/30 p-2 transition hover:bg-muted/50" aria-label="이전 달" onClick={onPrev}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h2 className="text-xl font-bold">2025년 7월</h2>
            <button className="ml-2 rounded-lg border border-border bg-muted/30 p-2 transition hover:bg-muted/50" aria-label="다음 달" onClick={onNext}>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center">
            <button className="mr-2 inline-flex items-center gap-1 rounded-full border border-accent bg-accent/10 px-3 py-1 text-sm text-accent transition hover:bg-accent/20 hover:text-accent-foreground hover-scale hover:ring-4 hover:ring-accent/30 hover:ring-offset-2 hover:ring-offset-background focus-visible:ring-4 focus-visible:ring-accent/40 focus-visible:ring-offset-2">
              <CalendarIcon className="h-4 w-4" /> 일
            </button>
            <button className="mr-2 inline-flex items-center gap-1 rounded-full border border-accent bg-accent/10 px-3 py-1 text-sm text-accent transition hover:bg-accent/20 hover:text-accent-foreground hover-scale hover:ring-4 hover:ring-accent/30 hover:ring-offset-2 hover:ring-offset-background focus-visible:ring-4 focus-visible:ring-accent/40 focus-visible:ring-offset-2">
              <CalendarIcon className="h-4 w-4" /> 주
            </button>
            <button className="inline-flex items-center gap-1 rounded-full border border-accent bg-accent px-3 py-1 text-sm text-accent-foreground shadow transition hover:bg-accent/90 hover-scale ring-4 ring-accent/30 ring-offset-2 ring-offset-background focus-visible:ring-4 focus-visible:ring-accent/40">
              <CalendarIcon className="h-4 w-4" /> 월
            </button>
          </div>
        </div>

        {/* 캘린더 헤더 */}
        <div className="grid grid-cols-7 rounded-t-lg bg-muted/30 p-2 text-center">
          <div className="text-urgent">일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div className="text-info">토</div>
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7">
          {cells.map(({ date, inCurrentMonth }) => {
            const key = fmtKey(date);
            const evts = eventsMap[key] || [];
            const isConflictDay = evts.some((e) => e.status === "conflict");
            return (
              <div
                key={key}
                className={`min-h-28 border border-border p-2 ${inCurrentMonth ? "" : "opacity-50"} ${isConflictDay ? "bg-destructive/10 border-destructive animate-pulse" : ""}`}
              >
                <div className="mb-1 text-right text-sm">{date.getDate()}</div>
                <div className="space-y-1">
                  {evts.map((e, idx) => (
                    <div key={idx} className={`truncate rounded border-l-2 px-2 py-0.5 text-xs ${statusStyles[e.status]}`}>{e.label}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 범례 + 액션 */}
        <div className="mt-4 flex items-center justify-between px-2 text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center"><div className="mr-1 h-3 w-3 rounded bg-success/60" />가용</div>
            <div className="flex items-center"><div className="mr-1 h-3 w-3 rounded bg-warning/60" />협의중</div>
            <div className="flex items-center"><div className="mr-1 h-3 w-3 rounded bg-destructive/60" />충돌</div>
          </div>
          <div className="flex items-center">
            <button className="inline-flex items-center gap-1 rounded-full border border-accent bg-accent px-3 py-1 text-sm text-accent-foreground shadow transition hover:bg-accent/90 hover-scale hover:ring-4 hover:ring-accent/30 hover:ring-offset-2 hover:ring-offset-background focus-visible:ring-4 focus-visible:ring-accent/40">
              <Filter className="h-4 w-4" /> 필터
            </button>
            <button className="ml-2 inline-flex items-center gap-1 rounded-full border border-accent bg-accent px-3 py-1 text-sm text-accent-foreground shadow transition hover:bg-accent/90 hover-scale hover:ring-4 hover:ring-accent/30 hover:ring-offset-2 hover:ring-offset-background focus-visible:ring-4 focus-visible:ring-accent/40">
              <Plus className="h-4 w-4" /> 일정 추가
            </button>
          </div>
        </div>
      </section>


      <section aria-label="충돌 해결 제안" className="mt-4 rounded-lg border bg-card p-3">
        <h3 className="text-sm font-medium flex items-center mb-2"><AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />충돌 해결 제안</h3>
        <div className="flex items-start gap-2">
          <div className="flex-1 text-xs text-muted-foreground">
            <p className="mb-1"><span className="text-destructive">충돌 감지:</span> 아이유 - 7월 4일 (목) KBS 음악 특집과 대학 축제 출연 시간 중복</p>
            <p className="mb-1"><span className="text-yellow-500">제안 1:</span> 대학 축제 출연 시간을 20:30으로 변경 (현재 18:30)</p>
            <p><span className="text-yellow-500">제안 2:</span> KBS 음악 특집 녹화 참여로 변경 (7월 3일 오전)</p>
          </div>
          <Button variant="secondary" size="sm">적용하기</Button>
        </div>
      </section>
    </div>
  );
};

export default CalendarTalents;
