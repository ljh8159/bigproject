import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarPlus, CheckCircle2, FileDown, FileSignature, Printer } from "lucide-react";

const ChatContract = () => {
  return (
    <main className="space-y-6">
      <SEO title="계약서 상세 페이지 | Celefix" description="삼성전자 런칭쇼 출연 계약서 상세" />

      {/* 헤더 */}
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">삼성전자 런칭쇼 출연 계약서</h1>
          <p className="mt-1 text-sm text-muted-foreground">계약번호: CON-25080-SEC | 작성일: 2025년 8월 3일</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10">
            <Printer className="h-4 w-4" /> 인쇄
          </Button>
          <Button className="gap-2">
            <FileDown className="h-4 w-4" /> PDF 저장
          </Button>
        </div>
      </header>

      {/* 상태 배너 */}
      <Card className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-[hsl(var(--success))] text-[hsl(var(--success))]">
            승인 완료
          </Badge>
          <span className="text-sm">고객 승인: 2025년 8월 2일</span>
        </div>
        <span className="text-sm text-muted-foreground">관리자: 김희연 | 처리 시간: 2025년 8월 3일 10:15</span>
      </Card>

      {/* 계약 당사자 */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">계약 당사자</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <h3 className="mb-2 text-sm text-muted-foreground">공급자 (에이전시)</h3>
            <p className="font-medium mb-1">더메르센 에이전시</p>
            <p className="text-sm text-muted-foreground mb-1">대표: 이민수</p>
            <p className="text-sm text-muted-foreground mb-1">사업자등록번호: 123-45-67890</p>
            <p className="text-sm text-muted-foreground">주소: 서울특별시 강남구 테헤란로 123, 8층</p>
          </Card>
          <Card className="p-4">
            <h3 className="mb-2 text-sm text-muted-foreground">수요자 (클라이언트)</h3>
            <p className="font-medium mb-1">삼성전자 마케팅팀</p>
            <p className="text-sm text-muted-foreground mb-1">담당자: 정현우 팀장</p>
            <p className="text-sm text-muted-foreground mb-1">사업자등록번호: 123-85-12345</p>
            <p className="text-sm text-muted-foreground">주소: 경기도 수원시 영통구 삼성로 129</p>
          </Card>
        </div>
      </section>

      {/* 라인업 및 출연료 */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">아티스트 라인업 및 출연료</h2>
        <Card className="overflow-hidden">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-muted">
              <tr className="text-left">
                <th className="p-3 font-medium">아티스트명</th>
                <th className="p-3 font-medium">공연 유형</th>
                <th className="p-3 font-medium">공연 시간</th>
                <th className="p-3 font-medium">출연료 (VAT 별도)</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="p-3">
                  <div className="font-medium text-primary">아이유 (IU)</div>
                  <div className="text-xs text-muted-foreground">소속: EDAM 엔터테인먼트</div>
                </td>
                <td className="p-3">메인 공연 <div className="text-xs text-muted-foreground">메인 스테이지</div></td>
                <td className="p-3">60분 <div className="text-xs text-muted-foreground">20:30-21:30</div></td>
                <td className="p-3 font-medium">3억 2천만원</td>
              </tr>
              <tr>
                <td className="p-3">
                  <div className="font-medium">적재</div>
                  <div className="text-xs text-muted-foreground">소속: 안테나</div>
                </td>
                <td className="p-3">오프닝 <div className="text-xs text-muted-foreground">메인 스테이지</div></td>
                <td className="p-3">30분 <div className="text-xs text-muted-foreground">18:00-18:30</div></td>
                <td className="p-3 font-medium">8천만원</td>
              </tr>
              <tr>
                <td className="p-3">
                  <div className="font-medium">에픽하이</div>
                  <div className="text-xs text-muted-foreground">소속: 더블랙레이블</div>
                </td>
                <td className="p-3">스페셜 공연 <div className="text-xs text-muted-foreground">메인 스테이지</div></td>
                <td className="p-3">45분 <div className="text-xs text-muted-foreground">19:30-20:15</div></td>
                <td className="p-3 font-medium">1억원</td>
              </tr>
            </tbody>
            <tfoot className="bg-muted/60">
              <tr>
                <td className="p-3 text-right font-medium" colSpan={3}>총 출연료 (VAT 별도)</td>
                <td className="p-3 font-bold text-primary">5억원</td>
              </tr>
            </tfoot>
          </table>
        </Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <h3 className="mb-2 text-sm font-medium">부가세 정보</h3>
            <p className="mb-1 text-sm text-muted-foreground">부가세율: 10%</p>
            <p className="mb-1 text-sm text-muted-foreground">부가세: 5,000만원</p>
            <p className="font-medium">총 금액 (VAT 포함): 5억 5,000만원</p>
          </Card>
          <Card className="p-4">
            <h3 className="mb-2 text-sm font-medium">지불 조건</h3>
            <div className="mb-1 flex items-center justify-between text-sm text-muted-foreground"><span>계약금 (30%)</span><span>1억 5,000만원</span></div>
            <div className="mb-1 flex items-center justify-between text-sm text-muted-foreground"><span>중도금 (40%)</span><span>2억원</span></div>
            <div className="flex items-center justify-between text-sm"><span>잔금 (30%)</span><span>1억 5,000만원</span></div>
          </Card>
        </div>
      </section>

      {/* 계약 조건 */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">계약 조건</h2>
        <Card className="p-4">
          <div className="grid gap-x-6 gap-y-4 md:grid-cols-2">
            <div>
              <h3 className="mb-1 text-sm font-medium">행사 정보</h3>
              <p className="text-sm text-muted-foreground">행사명: 삼성전자 갤럭시 S30 런칭쇼</p>
              <p className="text-sm text-muted-foreground">일시: 2025년 8월 30일</p>
              <p className="text-sm text-muted-foreground">장소: 삼성동 코엑스 D홀</p>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-medium">기술 요구사항</h3>
              <p className="text-sm text-muted-foreground">사운드: 프리미엄 사운드 시스템</p>
              <p className="text-sm text-muted-foreground">조명: LED 월 및 무빙라이트 20대 이상</p>
              <p className="text-sm text-muted-foreground">영상: 8K 고해상도 LED 스크린 설치</p>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-medium">취소 규정</h3>
              <p className="text-sm text-muted-foreground">30일 전 취소: 계약금의 50% 환불</p>
              <p className="text-sm text-muted-foreground">15일 전 취소: 계약금의 20% 환불</p>
              <p className="text-sm text-muted-foreground">14일 이내 취소: 환불 불가</p>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-medium">불가항력 조항</h3>
              <p className="text-sm text-muted-foreground">천재지변, 국가 비상사태, 전염병 확산 등</p>
              <p className="text-sm text-muted-foreground">사유 발생 시 양측 협의 후 재조정</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1 text-sm font-medium">특별 계약 조항</h3>
            <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
              <li>삼성전자 신제품 홍보 컨셉에 맞춘 공연 구성 필수</li>
              <li>모든 공연은 글로벌 라이브 스트리밍으로 진행됨</li>
              <li>아티스트는 행사 2일 전 리허설에 참석해야 함</li>
              <li>삼성전자 관련 제품 홍보는 사전 협의된 범위 내에서 진행</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* 전자 서명 */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">전자 서명</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <p className="mb-2 text-sm">공급자 (에이전시) 서명</p>
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-2 grid h-28 place-items-center rounded-md border-2 border-dashed border-primary/50">
                  <div className="stamp grid h-24 w-24 place-items-center rounded-full border-2 border-primary/70 text-center text-[10px] font-semibold text-primary/70 -rotate-12">
                    더메르센 에이전시
                    <br /> 김희연 서명
                    <br /> 2025.08.03
                  </div>
                </div>
                <div className="text-center text-xs text-muted-foreground">이민수 (법인 인감)</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <p className="mb-2 text-sm">수요자 (클라이언트) 서명</p>
            <div className="grid h-28 place-items-center rounded-md border-2 border-dashed border-primary/40">
              <p className="text-sm text-muted-foreground">여기를 클릭하여 서명하세요</p>
            </div>
            <div className="text-center text-xs text-muted-foreground mt-2">정현우 (삼성전자 마케팅팀장)</div>
          </Card>
        </div>
      </section>

      {/* 액션 버튼 */}
      <footer className="flex items-center justify-between">
        <Button asChild variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10">
          <Link to="/admin/chat/dashboard/solid">
            <ArrowLeft className="h-4 w-4" /> 챗봇으로 돌아가기
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10">
            <CalendarPlus className="h-4 w-4" /> 캘린더에 일정 추가
          </Button>
          <Button className="gap-2">
            <CheckCircle2 className="h-4 w-4" /> 계약 완료 처리
          </Button>
        </div>
      </footer>
    </main>
  );
};

export default ChatContract;
