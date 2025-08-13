import { Link, NavLink, Outlet } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { Star, Home, FileSignature, MessageSquare } from "lucide-react";

export default function UserLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 h-14 border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto grid h-full max-w-screen-2xl items-center px-4 grid-cols-[1fr_auto_1fr]">
          {/* Left: Brand */}
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" aria-hidden="true" />
            <Link to="/" className="text-sm font-semibold">Celefix</Link>
          </div>

          {/* Center: Nav */}
          <nav className="hidden items-center gap-6 text-sm sm:flex justify-self-center">
            <NavLink
              to="/user"
              end
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
              }
            >
              <span className="inline-flex items-center gap-2"><Home className="h-4 w-4" /> 홈</span>
            </NavLink>
            <NavLink
              to="/user/request"
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
              }
            >
              <span className="inline-flex items-center gap-2"><FileSignature className="h-4 w-4" /> 요청서</span>
            </NavLink>
            <NavLink
              to="/user/feedback"
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
              }
            >
              <span className="inline-flex items-center gap-2"><MessageSquare className="h-4 w-4" /> 피드백</span>
            </NavLink>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 justify-self-end">
            <ThemeToggle />
            <div
              className="hidden sm:grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold"
              aria-label="사용자 이니셜"
            >
              서
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-screen-2xl p-6 flex-1 min-h-0">
        <Outlet />
      </main>
    </div>
  );
}
