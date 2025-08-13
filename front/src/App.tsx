import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/Login";
import AdminHome from "./pages/admin/AdminHome";
import ChatForecast from "./pages/admin/ChatForecast";
import ChatLineup from "./pages/admin/ChatLineup";
import ChatDashboard from "./pages/admin/ChatDashboard";
import ChatProposal from "./pages/admin/ChatProposal";
import ChatContract from "./pages/admin/ChatContract";
import CalendarTalents from "./pages/admin/CalendarTalents";
import CalendarEvents from "./pages/admin/CalendarEvents";
import CalendarContracts from "./pages/admin/CalendarContracts";
import MainDashboard from "./pages/admin/MainDashboard";
import AdminNotifications from "./pages/admin/AdminNotifications";
import UserHome from "./pages/user/UserHome";
import UserRequest from "./pages/user/UserRequest";
import UserFeedback from "./pages/user/UserFeedback";
import ChatNew from "./pages/admin/ChatNew";
import ChatDashboardDetail from "./pages/admin/ChatDashboardDetail";
import ChatResult from "./pages/admin/ChatResult";
import ChatDashboardSolid from "./pages/admin/ChatDashboardSolid";
import UserLayout from "./layouts/UserLayout";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>

            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />

              {/* Admin routes with layout */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminHome />} />
                <Route path="chat" element={<Navigate to="/admin/chat/dashboard" replace />} />
                <Route path="chat/forecast" element={<ChatForecast />} />
                <Route path="chat/lineup" element={<ChatLineup />} />
                <Route path="chat/dashboard" element={<ChatDashboard />} />
                <Route path="chat/dashboard/solid" element={<ChatDashboardSolid />} />
                <Route path="chat/dashboard-detail" element={<ChatDashboardDetail />} />
                <Route path="chat/proposal" element={<ChatProposal />} />
                <Route path="chat/result" element={<ChatResult />} />
                <Route path="chat/contract" element={<ChatContract />} />
                <Route path="chat/new" element={<ChatNew />} />
                <Route path="calendar" element={<Navigate to="/admin/calendar/talents" replace />} />
                <Route path="calendar/talents" element={<CalendarTalents />} />
                <Route path="calendar/events" element={<CalendarEvents />} />
                <Route path="calendar/contracts" element={<CalendarContracts />} />
                <Route path="dashboard" element={<MainDashboard />} />
                <Route path="notifications" element={<AdminNotifications />} />
              </Route>

              {/* User routes */}
              <Route path="/user" element={<UserLayout />}>
                <Route index element={<UserHome />} />
                <Route path="request" element={<UserRequest />} />
                <Route path="feedback" element={<UserFeedback />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
