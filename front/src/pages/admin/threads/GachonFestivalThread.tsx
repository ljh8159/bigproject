export function GachonFestivalAnswer() {
	return (
		<div className="max-w-3xl rounded-md bg-muted/40 p-4">
			<p className="mb-3">
				요청해주신 조건(총 3팀, 댄스·힙합 중심, 예산 2억 7천만원)에 맞춰 <span className="font-semibold text-primary">산다라박, 다이나믹듀오, 크러쉬</span> 라인업을 추천드립니다.
			</p>

			{/* 예산 분석 */}
			<div className="mb-4 rounded-lg border border-[hsl(var(--success))] bg-[hsl(var(--success))/0.08] p-4">
				<div className="mb-2 flex items-center justify-between">
					<span className="text-sm font-semibold">예산 분석</span>
					<span className="rounded-md border border-[hsl(var(--success))] bg-[hsl(var(--success))/0.15] px-2 py-0.5 text-xs text-[hsl(var(--success))]">예산 적합</span>
				</div>
				<div className="mb-3 grid grid-cols-2 gap-4">
					<div>
						<div className="mb-1 flex justify-between text-sm">
							<span>가용 예산</span>
							<span className="font-semibold">2억 7천만원</span>
						</div>
						<div className="h-2 w-full overflow-hidden rounded bg-muted">
							<div className="h-full bg-[hsl(var(--success))]" style={{ width: "100%" }} />
						</div>
					</div>
					<div>
						<div className="mb-1 flex justify-between text-sm">
							<span>필요 예산</span>
							<span className="font-semibold">2억 7천만원</span>
						</div>
						<div className="h-2 w-full overflow-hidden rounded bg-muted">
							<div className="h-full bg-[hsl(var(--success))]" style={{ width: "100%" }} />
						</div>
					</div>
				</div>
				<div className="grid grid-cols-3 gap-2">
					{[
						{ n: "산다라박", v: "1억 5천만원" },
						{ n: "크러쉬", v: "7천만원" },
						{ n: "다이나믹듀오", v: "5천만원" },
					].map((a) => (
						<div key={a.n} className="rounded-md bg-muted p-2 text-center">
							<div className="text-xs text-muted-foreground">{a.n}</div>
							<div className="font-bold text-primary">{a.v}</div>
						</div>
					))}
				</div>
			</div>

			{/* 선정 근거 */}
			<div className="mb-4 rounded-lg border border-border p-4">
				<div className="mb-2 text-sm font-semibold">선정 근거</div>
				<ul className="text-sm leading-6">
					<li>• <b>산다라박</b>: 대중적 인지도 + 레트로·트렌디 이미지로 전 세대 공감대 형성</li>
					<li>• <b>다이나믹듀오</b>: 히트곡 다수와 강한 콜&리스폰스로 현장 에너지 극대화</li>
					<li>• <b>크러쉬</b>: 보컬·댄스 퍼포먼스로 중후반 무대 몰입과 SNS 확산 효과 기대</li>
				</ul>
			</div>

			<p className="mt-1 text-sm">
				세 팀의 조합으로 대중성 × 현장 에너지 × 트렌디함을 모두 충족시켜, 가천대 축제에 최적화된 라인업이 완성됩니다.
			</p>
			<p className="mt-3">이 제안이 어떠신가요?</p>
		</div>
	);
}

export default function GachonFestivalThread() {
	// 초기 UI 요소가 필요하면 여기에 추가할 수 있습니다. 현재는 ChatDashboard에서 메시지로 렌더링합니다.
	return null;
}


