import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const UserHome = () => {
  const artistAlbums = [
    "/lovable-uploads/5a314363-7af4-4321-afc9-13e3ae39e169.png", // aespa
    "/lovable-uploads/1ed960bb-3645-4316-82e1-ed725fc1059c.png", // 투모로우바이투게더
    "/lovable-uploads/5dcc1f13-ad58-4924-a232-47f8487bbe13.png", // 아이브
    "/lovable-uploads/e58f80d0-fb06-4ea7-82bd-d71c669899b1.png", // 적재
  ];
  return (
    <div className="container mx-auto px-6 py-10 relative">
      {/* SEO */}
      <SEO title="사용자 홈 | Celefix" description="기관·학교·축제 담당자 포털" />

      {/* Page intro (content only; header is handled by UserLayout) */}
      <section className="mb-8 md:mb-10 lg:mb-12">
        <h1 className="text-2xl font-bold">안녕하세요, 서울대학교 축제준비위원회님!</h1>
        <p className="text-muted-foreground mt-2">연예인 섭외 요청과 진행 상황을 확인해보세요.</p>
      </section>


      {/* Status summary */}
      <section aria-labelledby="status-summary" className="mb-8 md:mb-10 lg:mb-12">
        <h2 id="status-summary" className="sr-only">요청 상태 요약</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">전체 요청</div>
              <div className="text-2xl font-bold">8건</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">승인됨</div>
              <div className="text-2xl font-bold text-success">3건</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">진행중</div>
              <div className="text-2xl font-bold text-warning">2건</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">완료</div>
              <div className="text-2xl font-bold text-info">3건</div>
            </CardContent>
          </Card>
        </div>
      </section>


      {/* Recent requests + History */}
      <section className="flex flex-col lg:flex-row gap-6 mb-10 md:mb-12">
        {/* Recent */}
        <div className="lg:w-1/2 w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">최근 요청</h2>
            <Link to="#" className="text-sm text-primary hover:underline">모두 보기</Link>
          </div>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">여름 정기 축제 섭외</h3>
                  <span className="inline-flex rounded-full px-2.5 py-1 text-xs border border-success/50 text-success">승인됨</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-3 text-muted-foreground">
                  <span>예산: 6,500만원</span>
                  <span>요청일: 2025-07-15</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-muted px-3 py-1">아이유</span>
                  <span className="rounded-full bg-muted px-3 py-1">에스파</span>
                  <span className="rounded-full bg-muted px-3 py-1">적재</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">공대 축제 라인업</h3>
                  <span className="inline-flex rounded-full px-2.5 py-1 text-xs border border-warning/50 text-warning">검토중</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-3 text-muted-foreground">
                  <span>예산: 3,200만원</span>
                  <span>요청일: 2025-07-20</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-muted px-3 py-1">에픽하이</span>
                  <span className="rounded-full bg-muted px-3 py-1">아이브</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* History */}
        <div className="lg:w-1/2 w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">섭외 히스토리</h2>
            <Link to="#" className="text-sm text-primary hover:underline">모두 보기</Link>
          </div>
          <div className="space-y-6 pl-4">
            <div className="relative border-l-2 border-primary/40 pl-6 pb-6">
              <span className="absolute -left-2 top-0 h-3.5 w-3.5 rounded-full bg-primary" />
              <div className="flex items-center justify-between">
                <h3 className="font-medium">2025 신입생 OT</h3>
                <span className="inline-flex rounded-full px-2.5 py-1 text-xs border border-info/50 text-info">완료</span>
              </div>
              <div className="text-sm text-primary mt-1 mb-1">2025-03-15</div>
              <div className="text-sm text-muted-foreground mb-2">
                출연진: 뉴진스, 엑소, 에픽하이<br />
                참석자: 2,500명+
              </div>
              <Button variant="outline" size="sm" className="text-xs">피드백 보기</Button>
            </div>
            <div className="relative border-l-2 border-primary/20 pl-6">
              <span className="absolute -left-2 top-0 h-3.5 w-3.5 rounded-full bg-primary/70" />
              <div className="flex items-center justify-between">
                <h3 className="font-medium">2025 봄 축제</h3>
                <span className="inline-flex rounded-full px-2.5 py-1 text-xs border border-info/50 text-info">완료</span>
              </div>
              <div className="text-sm text-primary mt-1 mb-1">2025-05-10</div>
              <div className="text-sm text-muted-foreground mb-2">
                출연진: 아이유, 세븐틴<br />
                참석자: 4,800명+
              </div>
              <Button variant="outline" size="sm" className="text-xs">피드백 보기</Button>
            </div>
          </div>
        </div>
      </section>


      {/* Recommended artists */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">이런 아티스트는 어떠세요?</h2>
          <Link to="#" className="text-sm text-primary hover:underline">더보기</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[{name:'에스파 (aespa)',tag:'걸그룹',price:'4,700만원'},{name:'투모로우바이투게더',tag:'보이그룹',price:'5,200만원'},{name:'아이브 (IVE)',tag:'걸그룹',price:'4,800만원'},{name:'적재',tag:'솔로',price:'2,800만원'}].map((a,i)=> (
            <Card key={i} className="overflow-hidden">
              <div className="bg-muted">
                <AspectRatio ratio={16 / 9}>
                  <img src={artistAlbums[i]} alt={`${a.name} 포스터`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </AspectRatio>
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium">{a.name}</h3>
                <div className="text-sm text-muted-foreground">
                  {a.tag}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserHome;
