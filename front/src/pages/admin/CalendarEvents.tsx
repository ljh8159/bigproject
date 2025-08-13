import SEO from "@/components/SEO";
import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight, RefreshCw, Filter, Plus, Info, CheckCircle2, Calendar as CalendarIcon, ClipboardCheck } from "lucide-react";

const CalendarEvents = () => {
  return (
    <div>
      <SEO title="캘린더(행사) | Celefix" description="행사 일정 캘린더" />

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
          <button className="rounded-lg border border-border bg-muted/30 p-2 transition hover:bg-muted/50" aria-label="새로고침">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </nav>


      <div className="flex items-center justify-between rounded-md border-l-4 border-warning bg-warning/20 p-3 mb-4">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-warning" />
          <span className="font-medium">중요 공지!</span>
          <span className="text-sm text-muted-foreground">8월 15일 대학 축제 시즌이 시작됩니다. 이번 달 총 8개 대학교와 계약이 필요합니다.</span>
        </div>
        <button className="inline-flex items-center gap-1 rounded-full border border-accent bg-accent px-2 py-1 text-xs text-accent-foreground shadow transition hover:bg-accent/90">
          <ClipboardCheck className="h-3.5 w-3.5" /> 업무 할당
        </button>
      </div>

      <section className="rounded-lg border border-border bg-card p-4">
        <div className="mb-4 border-b pb-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="font-medium">행사 유형별 필터</div>
            <div className="text-xs">
              <button className="text-info hover:underline">모두 선택</button>
              <span className="mx-2 text-muted-foreground">|</span>
              <button className="text-info hover:underline">선택 해제</button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "대학축제", dot: "bg-info", active: true },
              { label: "페스티벌", dot: "bg-primary", active: true },
              { label: "기업행사", dot: "bg-success", active: true },
              { label: "방송/미디어", dot: "bg-warning", active: true },
              { label: "해외 공연", dot: "bg-urgent", active: false },
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
            <button className="mr-2 rounded-lg border border-border bg-muted/30 p-2 transition hover:bg-muted/50" aria-label="이전 달">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h2 className="text-xl font-bold">2025년 7월</h2>
            <button className="ml-2 rounded-lg border border-border bg-muted/30 p-2 transition hover:bg-muted/50" aria-label="다음 달">
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
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">1</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-success bg-success/20 px-1.5 py-0.5 text-xs">뮤직뱅크 스페셜 (아이유 출연)</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">2</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-info bg-info/20 px-1.5 py-0.5 text-xs">삼성전자 기업행사 기획</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">3</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-info bg-info/20 px-1.5 py-0.5 text-xs">연세대 축제 기획</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">4</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-success bg-success/20 px-1.5 py-0.5 text-xs">KBS 음악 특집</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-success bg-success/20 px-1.5 py-0.5 text-xs">서울대 축제 계약</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">5</div>
          </div>

          {/* 두번째 주 */}
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">6</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">7</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-info bg-info/20 px-1.5 py-0.5 text-xs">고려대 축제 미팅</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">8</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-primary bg-primary/20 px-1.5 py-0.5 text-xs">롯데월드 썸머 페스티벌 기획</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">9</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-success bg-success/20 px-1.5 py-0.5 text-xs">현대자동차 신차 발표회</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">10</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-primary bg-primary/20 px-1.5 py-0.5 text-xs">한강 여름 페스티벌 논의</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">11</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">12</div>
          </div>

          {/* 세번째 주 */}
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">13</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">14</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-accent bg-accent/20 px-1.5 py-0.5 text-xs">서울숲 페스티벌 진행</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">15</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-accent bg-accent/20 px-1.5 py-0.5 text-xs">서울숲 페스티벌 진행</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">16</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-success bg-success/20 px-1.5 py-0.5 text-xs">이화여대 가을 축제 계약</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">17</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-urgent bg-urgent/20 px-1.5 py-0.5 text-xs">LG 신제품 런칭쇼 긴급 논의</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">18</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">19</div>
          </div>

          {/* 네번째 주 */}
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">20</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">21</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-success bg-success/20 px-1.5 py-0.5 text-xs">JTBC 스페셜 녹화</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">22</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-muted bg-muted/20 px-1.5 py-0.5 text-xs">카카오 기업행사 완료</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">23</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-info bg-info/20 px-1.5 py-0.5 text-xs">성균관대 축제 기획</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">24</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">25</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-success bg-success/20 px-1.5 py-0.5 text-xs">인천 케이팝 페스티벌</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">26</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-success bg-success/20 px-1.5 py-0.5 text-xs">인천 케이팝 페스티벌</div>
          </div>

          {/* 다섯번째 주 */}
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">27</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">28</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-primary bg-primary/20 px-1.5 py-0.5 text-xs">롯데월드 썸머 페스티벌 회의</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">29</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-success bg-success/20 px-1.5 py-0.5 text-xs">워터밤 페스티벌</div>
          </div>
          <div className="min-h-24 border border-border p-1">
            <div className="mb-1 text-right text-sm">30</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-success bg-success/20 px-1.5 py-0.5 text-xs">워터밤 페스티벌</div>
          </div>
          <div className="min-h-24 border border-primary bg-primary/10 p-1">
            <div className="mb-1 text-right text-sm font-bold">31</div>
            <div className="mb-0.5 truncate rounded border-l-2 border-l-accent bg-accent/20 px-1.5 py-0.5 text-xs">서울대 축제 진행</div>
          </div>
          <div className="min-h-24 border border-border p-1 opacity-50">
            <div className="mb-1 text-right text-sm">1</div>
          </div>
          <div className="min-h-24 border border-border p-1 opacity-50">
            <div className="mb-1 text-right text-sm">2</div>
          </div>
        </div>

        {/* 범례 + 액션 */}
        <div className="mt-4 flex items-center justify-between px-2 text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center"><div className="mr-1 h-3 w-3 rounded bg-info" />기획중</div>
            <div className="flex items-center"><div className="mr-1 h-3 w-3 rounded bg-success" />확정</div>
            <div className="flex items-center"><div className="mr-1 h-3 w-3 rounded bg-accent" />진행중</div>
          </div>
          <div className="flex items-center">
            <button className="inline-flex items-center gap-1 rounded-full border border-accent bg-accent px-3 py-1 text-sm text-accent-foreground shadow transition hover:bg-accent/90 hover-scale hover:ring-4 hover:ring-accent/30 hover:ring-offset-2 hover:ring-offset-background focus-visible:ring-4 focus-visible:ring-accent/40">
              <Filter className="h-4 w-4" /> 필터
            </button>
            <button className="ml-2 inline-flex items-center gap-1 rounded-full border border-accent bg-accent px-3 py-1 text-sm text-accent-foreground shadow transition hover:bg-accent/90 hover-scale hover:ring-4 hover:ring-accent/30 hover:ring-offset-2 hover:ring-offset-background focus-visible:ring-4 focus-visible:ring-accent/40">
              <Plus className="h-4 w-4" /> 행사 추가
            </button>
          </div>
        </div>

        {/* 상세 패널 */}
        <div className="event-info-panel mt-4 rounded-lg border border-border bg-muted/30 p-3">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="flex items-center text-sm font-medium"><Info className="mr-2 h-4 w-4 text-info" />선택 행사 상세 정보</h3>
            <div className="rounded px-2 py-0.5 text-xs bg-info/30 text-foreground">대학축제</div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-1 text-xs text-muted-foreground">행사명</h4>
              <p className="mb-2 text-sm font-medium">서울대학교 여름 축제</p>
              <h4 className="mb-1 text-xs text-muted-foreground">날짜</h4>
              <p className="mb-2 text-sm">2025년 7월 31일 (목) 18:00 - 22:30</p>
              <h4 className="mb-1 text-xs text-muted-foreground">장소</h4>
              <p className="mb-2 text-sm">서울대학교 대운동장</p>
              <h4 className="mb-1 text-xs text-muted-foreground">예산</h4>
              <p className="mb-2 text-sm">₩85,000,000</p>
            </div>
            <div>
              <h4 className="mb-1 text-xs text-muted-foreground">주최</h4>
              <p className="mb-2 text-sm">서울대학교 축제준비위원회</p>
              <h4 className="mb-1 text-xs text-muted-foreground">출연진</h4>
              <div className="mb-2 flex flex-wrap gap-1">
                <div className="rounded bg-muted px-2 py-1 text-xs">아이유</div>
                <div className="rounded bg-muted px-2 py-1 text-xs">에픽하이</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CalendarEvents;
