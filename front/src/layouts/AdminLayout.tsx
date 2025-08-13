import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Bell, Star, Home, MessageSquare, Calendar, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminLayout() {
  const [showBadge, setShowBadge] = useState(true);
  useEffect(() => {
    const onClear = (_e: Event) => setShowBadge(false);
    const onNew = (_e: Event) => setShowBadge(true);
    window.addEventListener("notifications:clear", onClear);
    window.addEventListener("notifications:new", onNew);
    return () => {
      window.removeEventListener("notifications:clear", onClear);
      window.removeEventListener("notifications:new", onNew);
    };
  }, []);
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
          <nav className="hidden items-center gap-4 text-sm text-muted-foreground sm:flex justify-self-center">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 rounded-md bg-primary/20 px-3 py-1 text-primary"
                  : "flex items-center gap-2 hover:text-foreground"
              }
            >
              <Home className="h-4 w-4" /> 홈
            </NavLink>
            <NavLink
              to="/admin/chat"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 rounded-md bg-primary/20 px-3 py-1 text-primary"
                  : "flex items-center gap-2 hover:text-foreground"
              }
            >
              <MessageSquare className="h-4 w-4" /> 챗봇
            </NavLink>
            <NavLink
              to="/admin/calendar"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 rounded-md bg-primary/20 px-3 py-1 text-primary"
                  : "flex items-center gap-2 hover:text-foreground"
              }
            >
              <Calendar className="h-4 w-4" /> 캘린더
            </NavLink>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 rounded-md bg-primary/20 px-3 py-1 text-primary"
                  : "flex items-center gap-2 hover:text-foreground"
              }
            >
              <BarChart3 className="h-4 w-4" /> 대시보드
            </NavLink>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 justify-self-end">
            {/* Theme toggle to the LEFT of the button (as requested) */}
            <ThemeToggle />


            <Link
              to="/admin/notifications"
              aria-label="알림"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted"
              role="button"
            >
              <Bell className="h-4 w-4" />
              {showBadge && <span className="absolute -right-0.5 -top-0.5 inline-flex h-2.5 w-2.5 rounded-full bg-[hsl(var(--urgent))]" />}
            </Link>

            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                김
              </div>
              
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
