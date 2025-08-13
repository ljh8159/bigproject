import SEO from "@/components/SEO";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Star, ClipboardList, BarChart3, Trophy, Bot, TrendingUp, ArrowRight } from "lucide-react";
type RatingValue = 1 | 2 | 3 | 4 | 5;

const RatingStars = ({ value, onChange, size = 'md' }: { value: number | null; onChange: (v: RatingValue) => void; size?: 'sm' | 'md'; }) => {
  const iconClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  return (
    <div role="radiogroup" aria-label="별점 선택" className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          onClick={() => onChange(n as RatingValue)}
          className="p-0.5 rounded hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <Star className={`${iconClass} ${value && n <= value ? 'text-primary' : 'text-muted-foreground'}`} fill={value && n <= value ? 'currentColor' : 'none'} />
        </button>
      ))}
    </div>
  );
};

interface Artist {
  key: 'iu' | 'aespa' | 'jannabi';
  name: string;
  avatar: string;
  role: string;
  notes: string;
  snsDelta: string;
  metrics: { overall: number | null; reaction: number | null; setlist: number | null };
}

const UserFeedback = () => {
  const [loading, setLoading] = useState(false);
  // 기본 만족도 (초기값: 미선택)
  const [overall, setOverall] = useState<number | null>(null);
  const [valueSatisfaction, setValueSatisfaction] = useState<number | null>(null);
  const [operationSatisfaction, setOperationSatisfaction] = useState<number | null>(null);
  const [audienceSatisfaction, setAudienceSatisfaction] = useState<number | null>(null);

  // 연예인별 평가 항목 (초기값: 미선택)
  const [artists, setArtists] = useState<Artist[]>([
    { key: 'iu', name: '아이유 (IU)', avatar: 'IU', role: '헤드라이너 | 20:00-21:30 (90분)', notes: "헤드라이너로서 완벽한 무대를 선보였고, '라일락'과 '좋은 날' 무대에서 관객 호응이 특히 좋았습니다. 앵콜까지 성공적으로 마무리했습니다.", snsDelta: '+67% 전년 대비', metrics: { overall: null, reaction: null, setlist: null } },
    { key: 'aespa', name: '에스파 (aespa)', avatar: 'ae', role: '스페셜 게스트 | 18:15-19:15 (60분)', notes: '신곡 무대에서 학생들의 호응이 좋았으나, 세트리스트에 인기곡이 더 포함되었으면 하는 아쉬움이 있었습니다.', snsDelta: '+42% 전년 대비', metrics: { overall: null, reaction: null, setlist: null } },
    { key: 'jannabi', name: '잔나비 (JANNABI)', avatar: 'JN', role: '오프닝 | 16:30-17:30 (60분)', notes: '오프닝으로 분위기를 완벽하게 띄워주었고, 주요 곡에서 관객들의 떼창이 인상적이었습니다.', snsDelta: '+35% 전년 대비', metrics: { overall: null, reaction: null, setlist: null } },
  ]);

  const totalCriteria = 4 + artists.length * 3;
  const completed = [overall, valueSatisfaction, operationSatisfaction, audienceSatisfaction].filter((v) => v != null).length +
    artists.reduce((sum, a) => sum + (a.metrics.overall ? 1 : 0) + (a.metrics.reaction ? 1 : 0) + (a.metrics.setlist ? 1 : 0), 0);
  const completion = Math.round((completed / totalCriteria) * 100);

  const handleSave = () =>
    toast({ title: "임시 저장", description: "임시 저장되었습니다." });

  const handleNext = () => {
    // 관리자 페이지 알림 배지 표시 (임시 효과)
    window.dispatchEvent(new Event("notifications:new"));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ description: "기본 피드백이 저장되었습니다." });
    }, 600);
  };

  return (
    <div className="container mx-auto px-6 py-10 relative">
      <SEO title="사용자 피드백 (계약 후) | Celefix" description="행사 만족도와 연예인별 평가를 남겨주세요" />

      <header className="mb-6">
        <h1 className="text-2xl font-bold">2025 여름 축제 종합 피드백</h1>
        <p className="text-muted-foreground mt-1">아이유, 에스파, 잔나비 출연 (2025.07.31)</p>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span>피드백 ID: FB-25080-SNU</span>
          <span>생성일: 2025.08.04</span>
          <span>작성자: 박지현 (축준위장)</span>
        </div>
      </header>

      {/* Top stats */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">참석자</div>
            <div className="text-2xl font-semibold">5,280<span className="ml-1 text-sm">명</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">만족도</div>
            <div className="text-2xl font-semibold text-primary">94.2%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">SNS 반응</div>
            <div className="text-2xl font-semibold">25,420</div>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">피드백 완성도</span>
          <span className="font-medium text-primary">{completion}%</span>
        </div>
        <Progress value={completion} />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="basic" className="space-y-6">

        <TabsContent value="basic" className="space-y-8">
          {/* Overall satisfaction */}
          <section aria-labelledby="overall-section">
            <div className="mb-4 flex items-center justify-between">
              <h2 id="overall-section" className="text-xl font-bold">전체 행사 만족도</h2>
              <div className="text-sm text-muted-foreground">* 필수 응답</div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="p-5">
                  <p className="mb-3 text-base font-medium">이번 행사에 대한 전반적인 만족도는 어떠셨나요?</p>
                  <div className="flex items-center gap-3">
                    <RatingStars value={overall} onChange={setOverall} />
                    {overall ? (
                      <span className="inline-flex items-center rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-sm text-primary">
                        {overall}/5 선택됨
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-md border border-muted-foreground/30 bg-muted/20 px-2 py-0.5 text-sm text-muted-foreground">
                        선택하세요
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <p className="mb-3 text-base font-medium">투자 예산(5억) 대비 만족도는 어떠셨나요?</p>
                  <div className="flex items-center gap-3">
                    <RatingStars value={valueSatisfaction} onChange={setValueSatisfaction} />
                    {valueSatisfaction ? (
                      <span className="inline-flex items-center rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-sm text-primary">
                        {valueSatisfaction}/5 선택됨
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-md border border-muted-foreground/30 bg-muted/20 px-2 py-0.5 text-sm text-muted-foreground">
                        선택하세요
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <p className="mb-3 text-base font-medium">행사 운영 및 현장 관리에 대한 만족도는 어떠셨나요?</p>
                  <div className="flex items-center gap-3">
                    <RatingStars value={operationSatisfaction} onChange={setOperationSatisfaction} />
                    {operationSatisfaction ? (
                      <span className="inline-flex items-center rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-sm text-primary">
                        {operationSatisfaction}/5 선택됨
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-md border border-muted-foreground/30 bg-muted/20 px-2 py-0.5 text-sm text-muted-foreground">
                        선택하세요
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <p className="mb-3 text-base font-medium">학생들의 행사 참여도 및 반응은 어떠셨나요?</p>
                  <div className="flex items-center gap-3">
                    <RatingStars value={audienceSatisfaction} onChange={setAudienceSatisfaction} />
                    {audienceSatisfaction ? (
                      <span className="inline-flex items-center rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-sm text-primary">
                        {audienceSatisfaction}/5 선택됨
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-md border border-muted-foreground/30 bg-muted/20 px-2 py-0.5 text-sm text-muted-foreground">
                        선택하세요
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Artist evaluations */}
          <section aria-labelledby="artist-section">
            <div className="mb-4 flex items-center justify-between">
              <h2 id="artist-section" className="text-xl font-bold">연예인별 평가</h2>
              <Badge variant="secondary" className="gap-1"><TrendingUp className="h-3.5 w-3.5" /> AI 분석 가능</Badge>
            </div>

            {/* Artist: IU */}
            <Card className="mb-6">
              <CardContent className="p-5">
                <div className="mb-4 flex items-center">
                  <div className="mr-4 grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-primary font-bold">IU</div>
                  <div className="flex-1">
                    <div className="font-semibold">아이유 (IU)</div>
                    <div className="text-sm text-muted-foreground">헤드라이너 | 20:00-21:30 (90분)</div>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-md border bg-muted/40 p-3">
                    <div className="text-xs text-muted-foreground">전체 만족도</div>
                    <div className="mt-1 flex items-center gap-2">
                      <RatingStars
                        value={artists[0]?.metrics.overall}
                        onChange={(v) => setArtists((prev) => prev.map((x, i) => i === 0 ? { ...x, metrics: { ...x.metrics, overall: v } } : x))}
                        size="sm"
                      />
                      {artists[0]?.metrics.overall ? (
                        <span className="text-sm font-medium text-primary">{artists[0]?.metrics.overall}/5</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">선택하세요</span>
                      )}
                    </div>
                  </div>
                  <div className="rounded-md border bg-muted/40 p-3">
                    <div className="text-xs text-muted-foreground">현장 반응</div>
                    <div className="mt-1 flex items-center gap-2">
                      <RatingStars
                        value={artists[0]?.metrics.reaction}
                        onChange={(v) => setArtists((prev) => prev.map((x, i) => i === 0 ? { ...x, metrics: { ...x.metrics, reaction: v } } : x))}
                        size="sm"
                      />
                      {artists[0]?.metrics.reaction ? (
                        <span className="text-sm font-medium text-primary">{artists[0]?.metrics.reaction}/5</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">선택하세요</span>
                      )}
                    </div>
                  </div>
                  <div className="rounded-md border bg-muted/40 p-3">
                    <div className="text-xs text-muted-foreground">세트리스트 만족도</div>
                    <div className="mt-1 flex items-center gap-2">
                      <RatingStars
                        value={artists[0]?.metrics.setlist}
                        onChange={(v) => setArtists((prev) => prev.map((x, i) => i === 0 ? { ...x, metrics: { ...x.metrics, setlist: v } } : x))}
                        size="sm"
                      />
                      {artists[0]?.metrics.setlist ? (
                        <span className="text-sm font-medium text-primary">{artists[0]?.metrics.setlist}/5</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">선택하세요</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-3 rounded-md border-l-4 border-primary/40 bg-muted/40 p-3 text-sm">
                  헤드라이너로서 완벽한 무대를 선보였고, '라일락'과 '좋은 날' 무대에서 관객 호응이 특히 좋았습니다. 앵콜까지 성공적으로 마무리했습니다.
                </div>
                <div className="mt-3 inline-flex items-center rounded-md border bg-muted/40 px-2.5 py-1.5 text-sm">
                  <TrendingUp className="mr-2 h-4 w-4 text-primary" /> SNS 언급 통계: <span className="ml-2 font-semibold text-primary">+67% 전년 대비</span>
                </div>
              </CardContent>
            </Card>

            {/* Artist: aespa */}
            <Card className="mb-6">
              <CardContent className="p-5">
                <div className="mb-4 flex items-center">
                  <div className="mr-4 grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-primary font-bold">ae</div>
                  <div className="flex-1">
                    <div className="font-semibold">에스파 (aespa)</div>
                    <div className="text-sm text-muted-foreground">스페셜 게스트 | 18:15-19:15 (60분)</div>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-md border bg-muted/40 p-3">
                    <div className="text-xs text-muted-foreground">전체 만족도</div>
                    <div className="mt-1 flex items-center gap-2">
                      <RatingStars
                        value={artists[1]?.metrics.overall}
                        onChange={(v) => setArtists((prev) => prev.map((x, i) => i === 1 ? { ...x, metrics: { ...x.metrics, overall: v } } : x))}
                        size="sm"
                      />
                      {artists[1]?.metrics.overall ? (
                        <span className="text-sm font-medium text-primary">{artists[1]?.metrics.overall}/5</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">선택하세요</span>
                      )}
                    </div>
                  </div>
                  <div className="rounded-md border bg-muted/40 p-3">
                    <div className="text-xs text-muted-foreground">현장 반응</div>
                    <div className="mt-1 flex items-center gap-2">
                      <RatingStars
                        value={artists[1]?.metrics.reaction}
                        onChange={(v) => setArtists((prev) => prev.map((x, i) => i === 1 ? { ...x, metrics: { ...x.metrics, reaction: v } } : x))}
                        size="sm"
                      />
                      {artists[1]?.metrics.reaction ? (
                        <span className="text-sm font-medium text-primary">{artists[1]?.metrics.reaction}/5</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">선택하세요</span>
                      )}
                    </div>
                  </div>
                  <div className="rounded-md border bg-muted/40 p-3">
                    <div className="text-xs text-muted-foreground">세트리스트 만족도</div>
                    <div className="mt-1 flex items-center gap-2">
                      <RatingStars
                        value={artists[1]?.metrics.setlist}
                        onChange={(v) => setArtists((prev) => prev.map((x, i) => i === 1 ? { ...x, metrics: { ...x.metrics, setlist: v } } : x))}
                        size="sm"
                      />
                      {artists[1]?.metrics.setlist ? (
                        <span className="text-sm font-medium text-primary">{artists[1]?.metrics.setlist}/5</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">선택하세요</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-3 rounded-md border-l-4 border-primary/40 bg-muted/40 p-3 text-sm">
                  신곡 무대에서 학생들의 호응이 좋았으나, 세트리스트에 인기곡이 더 포함되었으면 하는 아쉬움이 있었습니다.
                </div>
                <div className="mt-3 inline-flex items-center rounded-md border bg-muted/40 px-2.5 py-1.5 text-sm">
                  <TrendingUp className="mr-2 h-4 w-4 text-primary" /> SNS 언급 통계: <span className="ml-2 font-semibold text-primary">+42% 전년 대비</span>
                </div>
              </CardContent>
            </Card>

            {/* Artist: JANNABI */}
            <Card>
              <CardContent className="p-5">
                <div className="mb-4 flex items-center">
                  <div className="mr-4 grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-primary font-bold">JN</div>
                  <div className="flex-1">
                    <div className="font-semibold">잔나비 (JANNABI)</div>
                    <div className="text-sm text-muted-foreground">오프닝 | 16:30-17:30 (60분)</div>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-md border bg-muted/40 p-3">
                    <div className="text-xs text-muted-foreground">전체 만족도</div>
                      <div className="mt-1 flex items-center gap-2">
                        <RatingStars
                          value={artists[2]?.metrics.overall}
                          onChange={(v) => setArtists((prev) => prev.map((x, i) => i === 2 ? { ...x, metrics: { ...x.metrics, overall: v } } : x))}
                          size="sm"
                        />
                        {artists[2]?.metrics.overall ? (
                          <span className="text-sm font-medium text-primary">{artists[2]?.metrics.overall}/5</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">선택하세요</span>
                        )}
                      </div>
                  </div>
                  <div className="rounded-md border bg-muted/40 p-3">
                    <div className="text-xs text-muted-foreground">현장 반응</div>
                      <div className="mt-1 flex items-center gap-2">
                        <RatingStars
                          value={artists[2]?.metrics.reaction}
                          onChange={(v) => setArtists((prev) => prev.map((x, i) => i === 2 ? { ...x, metrics: { ...x.metrics, reaction: v } } : x))}
                          size="sm"
                        />
                        {artists[2]?.metrics.reaction ? (
                          <span className="text-sm font-medium text-primary">{artists[2]?.metrics.reaction}/5</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">선택하세요</span>
                        )}
                      </div>
                  </div>
                  <div className="rounded-md border bg-muted/40 p-3">
                    <div className="text-xs text-muted-foreground">세트리스트 만족도</div>
                      <div className="mt-1 flex items-center gap-2">
                        <RatingStars
                          value={artists[2]?.metrics.setlist}
                          onChange={(v) => setArtists((prev) => prev.map((x, i) => i === 2 ? { ...x, metrics: { ...x.metrics, setlist: v } } : x))}
                          size="sm"
                        />
                        {artists[2]?.metrics.setlist ? (
                          <span className="text-sm font-medium text-primary">{artists[2]?.metrics.setlist}/5</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">선택하세요</span>
                        )}
                      </div>
                  </div>
                </div>
                <div className="mt-3 rounded-md border-l-4 border-primary/40 bg-muted/40 p-3 text-sm">
                  오프닝으로 분위기를 완벽하게 띄워주었고, 주요 곡에서 관객들의 떼창이 인상적이었습니다.
                </div>
                <div className="mt-3 inline-flex items-center rounded-md border bg-muted/40 px-2.5 py-1.5 text-sm">
                  <TrendingUp className="mr-2 h-4 w-4 text-primary" /> SNS 언급 통계: <span className="ml-2 font-semibold text-primary">+35% 전년 대비</span>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Actions */}
          <div className="flex justify-end">
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleSave}>
                임시 저장
              </Button>
              <Button onClick={handleNext} disabled={loading}>
                {loading ? "저장 중..." : "저장"}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserFeedback;