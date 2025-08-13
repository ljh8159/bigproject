import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import {
  Star,
  Bot,
  CalendarCheck2,
  FileSignature,
  ArrowRight,
  MapPin,
  Users,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import eventUniv from "@/assets/events/university-festival.jpg";
import eventCorp from "@/assets/events/corporate-launch.jpg";
import eventBeach from "@/assets/events/beach-music-festival.jpg";
export default function Index() {
  const eventImages = [eventUniv, eventCorp, eventBeach];
  return (
    <>
      <SEO
        title="Celefix | 연예인 섭외 자동화 플랫폼"
        description="AI가 예산·컨셉에 맞춘 연예인 라인업을 추천하고 제안·계약까지 자동화합니다. 간편하게 로그인해 바로 시작해 보세요."
      />

      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 font-bold">
              <Star className="h-5 w-5 text-primary" />
              <span>Celefix</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#features" className="hover:text-foreground">서비스</a>
              <a href="#events" className="hover:text-foreground">사례</a>
              <a href="#contact" className="hover:text-foreground">문의</a>
              <ThemeToggle />
              <Button asChild size="sm" variant="default">
                <Link to="/login">시작하기</Link>
              </Button>
            </nav>
          </div>
        </header>

        <main>
          {/* Hero */}
          <section className="mx-auto max-w-6xl px-4 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              당신의 업무를, <span className="text-primary">특별하게</span>
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">연예인 섭외, 이제 더 쉽게</p>
            <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg text-muted-foreground">
              예산·컨셉·스케줄에 맞는 아티스트를 AI가 추천합니다.<br />
              반복되는 연락·협상 과정을, 클릭 몇 번으로 섭외 절차를 완료하세요
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/login">로그인하기</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="#features">서비스 더 알아보기</Link>
              </Button>
            </div>
          </section>

          {/* Features */}
          <section id="features" className="bg-muted/20 border-y border-border">
            <div className="mx-auto max-w-6xl px-4 py-16">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">주요 기능</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <article className="rounded-xl bg-card border border-border p-6 hover:shadow-lg transition-shadow">
                  <div className="text-primary mb-3"><Bot className="h-7 w-7" /></div>
                  <h3 className="font-semibold text-lg mb-1">AI 기반 추천</h3>
                  <p className="text-sm text-muted-foreground">예산과 행사 컨셉에 맞는 최적의 연예인을 자동 추천합니다.</p>
                </article>
                <article className="rounded-xl bg-card border border-border p-6 hover:shadow-lg transition-shadow">
                  <div className="text-primary mb-3"><CalendarCheck2 className="h-7 w-7" /></div>
                  <h3 className="font-semibold text-lg mb-1">실시간 스케줄 확인</h3>
                  <p className="text-sm text-muted-foreground">가용 시간을 실시간으로 확인하고 일정을 조율할 수 있습니다.</p>
                </article>
                <article className="rounded-xl bg-card border border-border p-6 hover:shadow-lg transition-shadow">
                  <div className="text-primary mb-3"><FileSignature className="h-7 w-7" /></div>
                  <h3 className="font-semibold text-lg mb-1">자동 제안서 생성</h3>
                  <p className="text-sm text-muted-foreground">확정 라인업으로 맞춤 제안서를 자동 생성합니다.</p>
                </article>
              </div>
            </div>
          </section>

          {/* Recent Events */}
          <section id="events" className="mx-auto max-w-6xl px-4 py-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">최근 성사된 행사</h2>
              <Button variant="link" className="text-primary inline-flex items-center">
                더 보기 <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[{
                tag: "대학 축제",
                title: "서울대학교 여름 축제",
                date: "2025.06.15",
                place: "서울시 관악구",
                people: "5,000명+",
              },{
                tag: "기업 행사",
                title: "삼성전자 신제품 런칭쇼",
                date: "2025.07.08",
                place: "서울시 강남구",
                people: "1,200명",
              },{
                tag: "페스티벌",
                title: "부산 바다 음악 페스티벌",
                date: "2025.07.22",
                place: "부산시 해운대구",
                people: "8,000명+",
              }].map((e, i) => (
                <article key={i} className="rounded-xl overflow-hidden bg-card border border-border">
                  <img src={eventImages[i]} alt={`${e.title} 현장 사진 - ${e.tag}`} loading="lazy" decoding="async" className="h-40 w-full object-cover" />
                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold">{e.title}</h3>
                      <span className="text-xs text-muted-foreground">{e.date}</span>
                    </div>
                    <div className="mb-3 inline-flex items-center text-xs rounded-full bg-primary/15 text-primary px-2 py-1">
                      {e.tag}
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span className="inline-flex items-center text-xs"><MapPin className="mr-1 h-3 w-3" /> {e.place}</span>
                      <span className="inline-flex items-center text-xs"><Users className="mr-1 h-3 w-3" /> {e.people}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

        </main>

        <footer id="contact" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground flex items-center justify-between">
            <div>© 2025 Celefix. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <a href="#">이용약관</a>
              <a href="#">개인정보 처리방침</a>
              <a href="#">고객센터</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
