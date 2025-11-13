import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminInquiries from "./pages/AdminInquiries";
import AdminDemos from "./pages/AdminDemos";
import AdminReviews from "./pages/AdminReviews";
import AdminServices from "./pages/AdminServices";
import AdminSettings from "./pages/AdminSettings";
import AdminTeam from "./pages/AdminTeam";
import AdminPortfolio from "./pages/AdminPortfolio";
import AdminTemplates from "./pages/AdminTemplates";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/inquiries" element={<AdminInquiries />} />
          <Route path="/admin/demos" element={<AdminDemos />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/team" element={<AdminTeam />} />
          <Route path="/admin/portfolio" element={<AdminPortfolio />} />
          <Route path="/admin/templates" element={<AdminTemplates />} />

          {/* Legacy logic/admin routes for backward compatibility */}
          <Route path="/logic/admin" element={<AdminLogin />} />
          <Route path="/logic/admin/login" element={<AdminLogin />} />
          <Route path="/logic/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/logic/admin/inquiries" element={<AdminInquiries />} />
          <Route path="/logic/admin/demos" element={<AdminDemos />} />
          <Route path="/logic/admin/reviews" element={<AdminReviews />} />
          <Route path="/logic/admin/services" element={<AdminServices />} />
          <Route path="/logic/admin/settings" element={<AdminSettings />} />
          <Route path="/logic/admin/team" element={<AdminTeam />} />
          <Route path="/logic/admin/portfolio" element={<AdminPortfolio />} />
          <Route path="/logic/admin/templates" element={<AdminTemplates />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
