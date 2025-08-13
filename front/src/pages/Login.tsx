import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff, Star, User, Shield, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Next.js 의 next/link 대신 react-router-dom 사용

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"user" | "admin">("user");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [remember, setRemember] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: `${activeTab === "user" ? "사용자" : "관리자"} 로그인 시도`,
      description: `email=${email}, remember=${remember}`,
    });
    if (activeTab === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  const Tab = ({ id, label, Icon }: { id: "user" | "admin"; label: string; Icon: any }) => (
    <button
      type="button"
      onClick={() => setActiveTab(id)}
      className={
        "flex-1 border-b-2 px-4 py-3 font-semibold transition-colors flex items-center justify-center gap-2 " +
        (activeTab === id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")
      }
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 relative">
      <Link
        to="/admin/notifications"
        aria-label="알림"
        className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute -right-0.5 -top-0.5 inline-flex h-2.5 w-2.5 rounded-full bg-[hsl(var(--urgent))]" />
      </Link>
      <div className="w-full max-w-md rounded-2xl bg-card border border-border shadow-2xl p-6">
        {/* 로고 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center text-4xl font-bold text-primary">
            <Star className="mr-2 h-8 w-8" />
            Celefix
          </div>
          <p className="text-muted-foreground mt-2">연예인 섭외의 모든 것</p>
        </div>

        {/* 탭 */}
        <div className="flex border-b border-border mb-6">
          <Tab id="user" label="사용자 로그인" Icon={User} />
          <Tab id="admin" label="관리자 로그인" Icon={Shield} />
        </div>

        {/* 폼 */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="mb-2 block text-sm">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="이메일 주소 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="mb-2 block text-sm">비밀번호</Label>
            <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
              required
            />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보이기"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border border-border bg-transparent"
              />
              로그인 유지
            </label>
            {/* 내부 라우팅: react-router-dom 사용 */}
            <Link to="/forgot" className="text-sm text-muted-foreground hover:text-primary">비밀번호 찾기</Link>
          </div>

          <Button type="submit" className="w-full font-semibold">
            로그인
          </Button>

          {/* 구분선 */}
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-border" />
            <span className="mx-4 text-sm text-muted-foreground">또는</span>
            <div className="flex-1 border-t border-border" />
          </div>

          {/* 소셜 로그인 */}
          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="outline" className="w-full">
              <span className="mr-2">G</span>Google
            </Button>
            <Button type="button" variant="outline" className="w-full">
              <span className="mr-2"></span>Apple
            </Button>
          </div>

          {/* 가입 */}
          <p className="text-center text-sm mt-6 text-muted-foreground">
            계정이 없으신가요? <Link to="/signup" className="font-medium text-primary">가입하기</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
