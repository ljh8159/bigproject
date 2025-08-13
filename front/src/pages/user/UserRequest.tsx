import SEO from "@/components/SEO";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Search, X } from "lucide-react";
const UserRequest = () => {
  const [loading, setLoading] = useState(false);
  const [budget, setBudget] = useState<number>(50_000_000);
  const [flexibility, setFlexibility] = useState<string>("일부 조정 가능 (±10%)");
  const [artistInput, setArtistInput] = useState("");
  const [artists, setArtists] = useState<string[]>(["아이유", "뉴진스", "에스파"]);

  const addArtist = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (!artists.includes(trimmed)) setArtists([...artists, trimmed]);
    setArtistInput("");
  };

  const removeArtist = (name: string) => {
    setArtists((prev) => prev.filter((a) => a !== name));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 관리자 페이지 알림 배지 표시 (임시 효과)
    window.dispatchEvent(new Event("notifications:new"));
    setLoading(true);
    setTimeout(() => {
      toast({ title: "요청이 접수되었습니다" });
      setLoading(false);
    }, 800);
  };
  return (
    <div className="container mx-auto px-6 py-10 relative">
      <SEO title="연예인 섭외 요청서 | Celefix" description="간편하게 작성하고 빠르게 답변받으세요" />

      <header className="mb-6">
        <h1 className="text-2xl font-bold">연예인 섭외 요청서</h1>
        <p className="text-muted-foreground mt-2">간편하게 작성하고 빠르게 답변받으세요</p>
      </header>

      <form onSubmit={onSubmit} className="space-y-8">
        {/* 예산 정보 */}
        <section aria-labelledby="budget-section" className="rounded-lg border bg-card p-5">
          <h2 id="budget-section" className="text-lg font-semibold mb-4">예산 정보</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget">예산 금액</Label>
              <div className="mt-2 flex items-center gap-2">
                <Input
                  id="budget"
                  inputMode="numeric"
                  value={budget.toLocaleString('ko-KR')}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/,/g, "");
                    const num = Number(raw) || 0;
                    const clamped = Math.max(0, Math.min(1_000_000_000, num));
                    setBudget(clamped);
                  }}
                  aria-describedby="budget-help"
                  placeholder="예) 50,000,000"
                />
                <span className="text-sm text-muted-foreground">원</span>
              </div>
              <p id="budget-help" className="mt-1 text-xs text-muted-foreground">숫자만 입력하세요</p>
            </div>

            <div>
              <Label htmlFor="budget-range">예산 범위 (0 ~ 10억원)</Label>
              <div className="mt-4">
                <Slider
                  id="budget-range"
                  min={0}
                  max={1000000000}
                  step={1000000}
                  value={[budget]}
                  onValueChange={(v) => setBudget(v[0] ?? 0)}
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>최소</span>
                  <span>{budget.toLocaleString('ko-KR')}원</span>
                  <span>최대</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="budget-flexible">예산 유연성</Label>
              <div className="mt-2">
                <Select value={flexibility} onValueChange={setFlexibility}>
                  <SelectTrigger id="budget-flexible" aria-label="예산 유연성">
                    <SelectValue placeholder="예산 유연성 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="고정 예산 (변경 불가)">고정 예산 (변경 불가)</SelectItem>
                    <SelectItem value="일부 조정 가능 (±10%)">일부 조정 가능 (±10%)</SelectItem>
                    <SelectItem value="협의 가능 (아티스트에 따라)">협의 가능 (아티스트에 따라)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* 원하는 아티스트 */}
        <section aria-labelledby="artist-section" className="rounded-lg border bg-card p-5">
          <h2 id="artist-section" className="text-lg font-semibold mb-4">원하는 아티스트</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="artist-search">아티스트 검색</Label>
              <div className="mt-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="artist-search"
                  placeholder="원하는 아티스트 이름을 검색하세요"
                  className="pl-9"
                  value={artistInput}
                  onChange={(e) => setArtistInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addArtist(artistInput);
                    }
                  }}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <Label>선택된 아티스트</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {artists.length === 0 ? (
                  <p className="text-sm text-muted-foreground">선택된 아티스트가 없습니다.</p>
                ) : (
                  artists.map((name) => (
                    <span key={name} className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm">
                      {name}
                      <button
                        type="button"
                        aria-label={`${name} 제거`}
                        onClick={() => removeArtist(name)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="md:col-span-2 md:max-w-md">
              <Label htmlFor="artist-type">공연 유형</Label>
              <div className="mt-2">
                <Select defaultValue="축하 공연 (2-3곡)">
                  <SelectTrigger id="artist-type">
                    <SelectValue placeholder="공연 유형 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="전체 공연 (풀 콘서트)">전체 공연 (풀 콘서트)</SelectItem>
                    <SelectItem value="축하 공연 (2-3곡)">축하 공연 (2-3곡)</SelectItem>
                    <SelectItem value="토크쇼 / 팬미팅">토크쇼 / 팬미팅</SelectItem>
                    <SelectItem value="행사 진행 MC">행사 진행 MC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* 행사 정보 */}
        <section aria-labelledby="event-section" className="rounded-lg border bg-card p-5">
          <h2 id="event-section" className="text-lg font-semibold mb-4">행사 정보</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="event-name">행사명</Label>
              <Input id="event-name" className="mt-2" placeholder="행사명을 입력하세요" />
            </div>
            <div>
              <Label htmlFor="event-type">행사 유형</Label>
              <div className="mt-2">
                <Select>
                  <SelectTrigger id="event-type">
                    <SelectValue placeholder="행사 유형 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="대학 축제">대학 축제</SelectItem>
                    <SelectItem value="기업 행사">기업 행사</SelectItem>
                    <SelectItem value="지역 페스티벌">지역 페스티벌</SelectItem>
                    <SelectItem value="시상식">시상식</SelectItem>
                    <SelectItem value="기타">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="event-date">행사 날짜</Label>
              <Input id="event-date" type="date" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="event-time">행사 시간</Label>
              <Input id="event-time" type="time" className="mt-2" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="event-location">행사 장소</Label>
              <Input id="event-location" className="mt-2" placeholder="행사 장소를 입력하세요" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="event-description">행사 설명 (선택사항)</Label>
              <Textarea id="event-description" className="mt-2" placeholder="행사에 대한 간단한 설명을 입력하세요" rows={4} />
            </div>
          </div>
        </section>

        {/* 연락처 정보 */}
        <section aria-labelledby="contact-section" className="rounded-lg border bg-card p-5">
          <h2 id="contact-section" className="text-lg font-semibold mb-4">연락처 정보</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact-name">담당자 이름</Label>
              <Input id="contact-name" className="mt-2" placeholder="담당자 이름을 입력하세요" />
            </div>
            <div>
              <Label htmlFor="contact-organization">소속 기관/단체</Label>
              <Input id="contact-organization" className="mt-2" placeholder="기관/단체명을 입력하세요" />
            </div>
            <div>
              <Label htmlFor="contact-email">이메일</Label>
              <Input id="contact-email" type="email" className="mt-2" placeholder="이메일을 입력하세요" />
            </div>
            <div>
              <Label htmlFor="contact-phone">연락처</Label>
              <Input id="contact-phone" type="tel" className="mt-2" placeholder="연락처를 입력하세요" />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="gap-2">
            {loading ? "제출 중..." : "요청서 제출하기"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserRequest;
