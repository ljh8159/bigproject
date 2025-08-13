import { Bot } from "lucide-react";

export function SeoulFestivalAnswer() {
  return (
    <div className="max-w-3xl rounded-md bg-muted/40 p-4">
      <p className="mb-3">안녕하세요, 서울대학교 축제준비위원회님! 요청하신 아이유, 에스파, 뉴진스 라인업에 대해 분석해 보았습니다.</p>

      {/* 예산 분석 */}
      <div className="mb-4 rounded-lg border border-[hsl(var(--destructive))/0.5] bg-[hsl(var(--destructive))/0.08] p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold">예산 분석</span>
          <span className="rounded-md border border-[hsl(var(--destructive))] bg-[hsl(var(--destructive))/0.15] px-2 py-0.5 text-xs text-[hsl(var(--destructive))]">예산 초과</span>
        </div>
        <div className="mb-3 grid grid-cols-2 gap-4">
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>가용 예산</span>
              <span className="font-semibold">2억원</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded bg-muted">
              <div className="h-full bg-[hsl(var(--success))]" style={{ width: "100%" }} />
            </div>
          </div>
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>필요 예산</span>
              <span className="font-semibold text-[hsl(var(--destructive))]">3억 6천만원</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded bg-muted">
              <div className="h-full bg-[hsl(var(--destructive))]" style={{ width: "100%" }} />
            </div>
          </div>
        </div>
        <div className="mb-3 text-sm text-[hsl(var(--destructive))]">❗ 요청하신 라인업은 예산을 1억 6천만원 초과합니다.</div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { n: "아이유", v: "1억 8천만원" },
            { n: "에스파", v: "1억 3천만원" },
            { n: "뉴진스", v: "1억 5천만원" },
          ].map((a) => (
            <div key={a.n} className="rounded-md bg-muted p-2 text-center">
              <div className="text-xs text-muted-foreground">{a.n}</div>
              <div className="font-bold text-primary">{a.v}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="mb-4">
        예산 제약을 고려하여, <span className="font-semibold text-primary">뉴진스 대신 잔나비</span>를 추천해 드립니다. 이 경우 예산 내에서 최적의 라인업을 구성할 수 있습니다:
      </p>

      {/* 뉴진스 vs 잔나비 */}
      <div className="mb-4 rounded-lg border border-border p-4">
        <div className="mb-3 flex items-center justify-center gap-3 text-xs">
          <span className="rounded-full border border-[hsl(var(--warning))] bg-[hsl(var(--warning))/0.15] px-3 py-1 text-[hsl(var(--warning))]">뉴진스</span>
        <span className="rounded-full border border-primary bg-primary/15 px-2 py-1 text-primary">VS</span>
          <span className="rounded-full border border-[hsl(var(--success))] bg-[hsl(var(--success))/0.15] px-3 py-1 text-[hsl(var(--success))]">잔나비</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center text-sm">
          <div>
            <div className="mb-1 text-muted-foreground">출연료</div>
            <div className="mb-2 font-bold text-[hsl(var(--destructive))]">1억 5천만원</div>
            <div className="mb-1 text-muted-foreground">최근 활동</div>
            <div className="mb-2 text-xs">싱글 'Super Shy' 발매</div>
            <div className="mb-1 text-muted-foreground">대학생 호응도</div>
            <div className="text-yellow-400">★★★★☆ (87%)</div>
          </div>
          <div>
            <div className="mb-1 text-muted-foreground">출연료</div>
            <div className="mb-2 font-bold text-[hsl(var(--success))]">4천만원</div>
            <div className="mb-1 text-muted-foreground">최근 활동</div>
            <div className="mb-2 text-xs">정규 앨범 '잔나비 소곡집 1' 발매</div>
            <div className="mb-1 text-muted-foreground">대학생 호응도</div>
            <div className="text-[hsl(var(--success))]">★★★★★ (92%)</div>
          </div>
        </div>
      </div>

      {/* 대체 제안 */}
      <div className="rounded-lg border border-[hsl(var(--success))] bg-[hsl(var(--success))/0.08] p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-semibold">대체 제안: 아이유 + 에스파 + 잔나비</span>
          <span className="rounded-md border border-[hsl(var(--success))] bg-[hsl(var(--success))/0.15] px-2 py-0.5 text-xs text-[hsl(var(--success))]">예산 적합</span>
        </div>
        <div className="mb-3 grid grid-cols-3 gap-2">
          <div className="rounded-md bg-muted p-2 text-center">
            <div className="text-xs text-muted-foreground">아이유</div>
            <div className="font-bold text-primary">1억 8천만원</div>
          </div>
          <div className="rounded-md bg-muted p-2 text-center">
            <div className="text-xs text-muted-foreground">에스파</div>
            <div className="font-bold text-primary">1억 3천만원</div>
          </div>
          <div className="rounded-md bg-muted p-2 text-center">
            <div className="text-xs text-muted-foreground">잔나비</div>
            <div className="font-bold text-[hsl(var(--success))]">4천만원</div>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div>
            <div className="mb-1">총 필요 예산: <span className="font-bold text-[hsl(var(--success))]">1억 9천 5백만원</span></div>
            <div className="text-[hsl(var(--success))]">✓ 예산 내 충분히 집행 가능</div>
          </div>
          <div className="text-right">
            <div className="mb-1">예상 관객 호응도: <span className="font-bold text-[hsl(var(--success))]">92%</span></div>
            <div className="text-[hsl(var(--success))]">✓ SNS 언급량 35% 증가 예상</div>
          </div>
        </div>
      </div>

      <p className="mt-4">잔나비는 대학생 사이에서 높은 인기를 얻고 있으며, '주저하는 연인들을 위해', '뜨거운 여름밤은 가고 남은 건 볼품없지만' 등의 곡은 축제에서 떼창을 이끌어내기에 적합합니다. 또한 아이유, 에스파와 함께 장르 다양성을 확보할 수 있어 축제의 완성도를 높일 수 있습니다.</p>
      <p className="mt-3">이 제안이 어떠신가요?</p>
    </div>
  );
}

export default function SeoulFestivalThread() {
  // 초기 메시지 없이 시작하여, 사용자가 질문하면 ChatDashboard에서 3초 뒤 답변을 표시합니다.
  return null;
}
