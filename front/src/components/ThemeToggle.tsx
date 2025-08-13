import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={className}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
};

export default ThemeToggle;
