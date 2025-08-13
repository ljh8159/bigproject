import { NavLink, useLocation } from "react-router-dom";
import { 
  Bot,
  Home,
  Sparkles,
  BarChart3,
  FileText,
  FileSignature,
  Calendar,
  CalendarCheck,
  CalendarDays,
  Bell
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "관리자 홈", url: "/admin", icon: Home },
  { title: "선제 제안", url: "/admin/chat/forecast", icon: Sparkles },
  { title: "라인업 추천", url: "/admin/chat/lineup", icon: Bot },
  { title: "세부 대시보드", url: "/admin/chat/dashboard", icon: BarChart3 },
  { title: "제안서", url: "/admin/chat/proposal", icon: FileText },
  { title: "계약서", url: "/admin/chat/contract", icon: FileSignature },
  { title: "캘린더(연예인)", url: "/admin/calendar/talents", icon: Calendar },
  { title: "캘린더(행사)", url: "/admin/calendar/events", icon: CalendarDays },
  { title: "캘린더(계약)", url: "/admin/calendar/contracts", icon: CalendarCheck },
  { title: "메인 대시보드", url: "/admin/dashboard", icon: BarChart3 },
  { title: "알림", url: "/admin/notifications", icon: Bell },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-muted text-primary font-medium" : "hover:bg-muted/50";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Celefix Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
