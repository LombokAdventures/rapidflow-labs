import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import AdminCompanyInfo from "./pages/AdminCompanyInfo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Admin routes */}
          <Route path="/secret/admin" element={<AdminLogin />} />
          <Route path="/secret/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/secret/admin/inquiries" element={<AdminInquiries />} />
          <Route path="/secret/admin/demos" element={<AdminDemos />} />
          <Route path="/secret/admin/reviews" element={<AdminReviews />} />
          <Route path="/secret/admin/services" element={<AdminServices />} />
          <Route path="/secret/admin/settings" element={<AdminSettings />} />
          <Route path="/secret/admin/team" element={<AdminTeam />} />
          <Route path="/secret/admin/portfolio" element={<AdminPortfolio />} />
          <Route path="/secret/admin/templates" element={<AdminTemplates />} />
          <Route path="/secret/admin/company" element={<AdminCompanyInfo />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;