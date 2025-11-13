import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Team from "@/components/Team";
import ServiceTemplates from "@/components/ServiceTemplates";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LanguageSwitcher />
      <Navbar />
      <Hero />
      <Team />
      <ServiceTemplates />
      <PortfolioShowcase />
      <Process />
      <Reviews />
      <Contact />
      
      {/* Footer */}
      <footer className="py-16 border-t border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="container mx-auto px-4 text-center text-muted-foreground relative z-10">
          <p className="text-lg">&copy; 2025 WebAgency. All rights reserved.</p>
          <p className="mt-2">Built with passion for fast, quality web development ⚡</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
