import SEO from "@/components/SEO";
import { NavLink } from "react-router-dom";
import {
  RefreshCw,
  CheckCircle2,
  Info,
  Mail,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  ListChecks,
  FileText,
  Calendar as CalendarIcon,
} from "lucide-react";

const CalendarContracts = () => {
  return (
    <div>
      <SEO title="캘린더(계약관리) | Celefix" description="계약 상태 캘린더" />

      <nav aria-label="캘린더 탭" className="border-b mb-4 flex items-center justify-between">
        <ul className="flex gap-1">
          <li>
            <NavLink
              to="/admin/calendar/talents"
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium border-b-2 ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`
              }
            >
              연예인 스케줄
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/calendar/events"
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium border-b-2 ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`
              }
            >
              행사 스케줄
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/calendar/contracts"
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium border-b-2 ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`
              }
            >
              계약 관리
            </NavLink>
          </li>
        </ul>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-1 text-xs">
            <span>Google Calendar 연동됨</span>
            <CheckCircle2 className="h-4 w-4 text-success" aria-hidden />
          </div>
          <button
            className="rounded-lg border border-border bg-muted/30 p-2 transition hover:bg-muted/50"
            aria-label="새로고침"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </nav>


      <div className="mb-4 flex items-center justify-between rounded-md border-l-4 border-warning bg-warning/20 p-3">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-warning" />
          <span className="font-medium">계약 갱신 알림!</span>
          <span className="text-sm text-muted-foreground">
            서울대학교 축제 계약이 7일 이내 만료 예정입니다. (2025.08.13)
          </span>
        </div>
        <button className="inline-flex items-center gap-1 rounded-full border border-accent bg-accent px-2 py-1 text-xs text-accent-foreground shadow transition hover:bg-accent/90">
          <Mail className="h-4 w-4" /> 담당자에게 알림
        </button>
      </div>

      <section className="rounded-lg border border-border bg-card p-4">
        <div className="mb-4 border-b pb-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="font-medium">계약 상태 필터</div>
            <div className="text-xs">
              <button className="text-info hover:underline">모두 선택</button>
              <span className="mx-2 text-muted-foreground">|</span>
              <button className="text-info hover:underline">선택 해제</button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "계약 확정", dot: "bg-success", active: true },
              { label: "협의중", dot: "bg-accent", active: true },
              { label: "대기중", dot: "bg-warning", active: true },
              { label: "검토중", dot: "bg-info", active: true },
              { label: "만료 임박", dot: "bg-urgent", active: true },
              { label: "갱신 예정", dot: "bg-primary", active: true },
            ].map((f) => (
              <button
                key={f.label}
                className={`flex items-center rounded-full border px-3 py-1 text-xs transition ${
                  f.active
                    ? "bg-muted/60 border-accent/50"
                    : "bg-muted/30 border-border text-muted-foreground"
                }`}
              >
                <span className={`mr-1 inline-block h-2 w-2 rounded-full ${f.dot}`} />
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="mr-2 rounded-lg border border-border bg-muted/30 p-2 transition hover:bg-muted/50"
              aria-label="이전 달"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h2 className="text-xl font-bold">2025년 8월</h2>
            <button
              className="ml-2 rounded-lg border border-border bg-muted/30 p-2 transition hover:bg-muted/50"
              aria-label="다음 달"
            >
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

        {/* 요일 헤더 */}
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
          {/* 첫번째 주 */}
          <div className="min-h-24 border border-border p-1 opacity-50">
            <div className="mb-1 text-right text-sm">29</div>
          </div>
          <div className="min-h-24 border border-border p-1 opacity-50">
            <div className="mb-1 text-right text-sm">30</div>
          </div>
          <div className="min-h-24 border border-border p-1 opacity-50">
            <div className="mb-1 text-right text-sm">31</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">1</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-success bg-success/20 px-1.5 py-0.5 text-xs">서울대 - 계약 체결일</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">2</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-info bg-info/20 px-1.5 py-0.5 text-xs">에픽하이 - 검토 마감일</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">3</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">4</div>
          </div>

          {/* 두번째 주 */}
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">5</div>
          </div>
          <div className="min-h-24 border border-primary bg-primary/10 p-1">
            <div className="mb-1 text-right text-sm font-bold">6</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-accent bg-accent/20 px-1.5 py-0.5 text-xs">고려대 - 계약 협상</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-warning bg-warning/20 px-1.5 py-0.5 text-xs">연세대 - 계약서 발송</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">7</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">8</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-info bg-info/20 px-1.5 py-0.5 text-xs">아이유 - 법무팀 검토중</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">9</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-success bg-success/20 px-1.5 py-0.5 text-xs">적재 - 계약 체결</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">10</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-success bg-success/20 px-1.5 py-0.5 text-xs">페스티벌 A - 첫 입금일</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">11</div>
          </div>

          {/* 세번째 주 */}
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">12</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">13</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-urgent bg-urgent/20 px-1.5 py-0.5 text-xs">서울대 - 계약 만료</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">14</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">15</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-primary bg-primary/20 px-1.5 py-0.5 text-xs">삼성 - 계약 갱신</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">16</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">17</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">18</div>
          </div>

          {/* 네번째 주 */}
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">19</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">20</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-accent bg-accent/20 px-1.5 py-0.5 text-xs">LG 행사 - 최종 협상</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">21</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">22</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">23</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">24</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-warning bg-warning/20 px-1.5 py-0.5 text-xs">현대 - 계약 초안 검토</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">25</div>
          </div>

          {/* 다섯번째 주 */}
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">26</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">27</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">28</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-info bg-info/20 px-1.5 py-0.5 text-xs">에스파 - 법무팀 검토</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">29</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">30</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-urgent bg-urgent/20 px-1.5 py-0.5 text-xs">롯데 - 계약 만료</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-primary bg-primary/20 px-1.5 py-0.5 text-xs">롯데 - 갱신 협의</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">31</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-success bg-success/20 px-1.5 py-0.5 text-xs">SKT - 최종 서명</div>
          </div>
          <div className="min-h-24 border border-border p-1 opacity-50">
            <div className="mb-1 text-right text-sm">1</div>
          </div>
        </div>

        {/* 범례 + 액션 */}
        <div className="mt-4 flex items-center justify-between px-2 text-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center"><div className="mr-1 h-3 w-3 rounded bg-success/60" />확정</div>
            <div className="flex items-center"><div className="mr-1 h-3 w-3 rounded bg-accent/60" />협의중</div>
            <div className="flex items-center"><div className="mr-1 h-3 w-3 rounded bg-warning/60" />대기중</div>
            <div className="flex items-center"><div className="mr-1 h-3 w-3 rounded bg-info/60" />검토중</div>
            <div className="flex items-center"><div className="mr-1 h-3 w-3 rounded bg-urgent/60" />만료 임박</div>
            <div className="flex items-center"><div className="mr-1 h-3 w-3 rounded bg-primary/60" />갱신 예정</div>
          </div>
          <div className="flex items-center">
            <button className="inline-flex items-center gap-1 rounded-full border border-accent bg-accent px-3 py-1 text-sm text-accent-foreground shadow transition hover:bg-accent/90 transition-shadow hover:shadow-[0_0_16px_hsl(var(--accent)/0.6)] focus:shadow-[0_0_18px_hsl(var(--accent)/0.7)]">
              <Filter className="h-4 w-4" /> 필터
            </button>
            <button className="ml-2 inline-flex items-center gap-1 rounded-full border border-accent bg-accent px-3 py-1 text-sm text-accent-foreground shadow transition hover:bg-accent/90 transition-shadow hover:shadow-[0_0_16px_hsl(var(--accent)/0.6)] focus:shadow-[0_0_18px_hsl(var(--accent)/0.7)]">
              <Plus className="h-4 w-4" /> 계약 추가
            </button>
          </div>
        </div>

        {/* 진행률 & 검토 섹션 */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {/* 진행률 카드 */}
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <h3 className="mb-3 flex items-center text-sm font-medium">
              <ListChecks className="mr-2 h-4 w-4 text-primary" /> 계약 단계별 진행률
            </h3>
            <div className="space-y-3">
              {[ 
                { title: "서울대학교 축제 계약", pct: 80, color: "bg-primary" },
                { title: "고려대학교 축제 계약", pct: 45, color: "bg-info" },
                { title: "연세대학교 축제 계약", pct: 30, color: "bg-warning" },
                { title: "LG 기업행사 계약", pct: 65, color: "bg-success" },
              ].map((row) => (
                <div key={row.title}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span>{row.title}</span>
                    <span>{row.pct}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded bg-muted">
                    <div className={`${row.color} h-full`} style={{ width: `${row.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 검토 카드 */}
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <h3 className="mb-3 flex items-center text-sm font-medium">
              <FileText className="mr-2 h-4 w-4 text-primary" /> 계약서 검토 및 승인
            </h3>
            <div className="space-y-2 text-xs">
              <div className="rounded-lg border border-border bg-card p-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">아이유 - 법무팀 검토중</span>
                  <span className="text-info">검토 단계 2/3</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-muted-foreground">
                  <span>담당: 박지윤</span>
                  <span>마감: 8월 10일</span>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">에픽하이 - 최종 승인 대기</span>
                  <span className="text-success">검토 완료</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-muted-foreground">
                  <span>담당: 김민수</span>
                  <span>마감: 8월 12일</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CalendarContracts;
