import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const { t } = useLanguage();
  
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-hero animate-gradient opacity-50" />
      
      {/* Animated particles/grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(120, 119, 198, 0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(120, 119, 198, 0.03) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm mb-4 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>{t("hero_badge")}</span>
          </div>

          <div className="space-y-6 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight">
              {t("hero_title")} <span className="text-gradient">{t("hero_days")}</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("hero_subtitle")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in pt-4">
            <Button 
              size="lg" 
              className="gradient-primary text-lg px-8 py-6 group glow-primary hover:scale-105 transition-all"
              onClick={scrollToContact}
            >
              {t("cta_start")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-2 hover:bg-primary/10 hover:border-primary transition-all"
              onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t("cta_portfolio")}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 animate-fade-in">
            <div className="glass-card p-8 rounded-2xl hover-lift">
              <div className="text-5xl font-bold text-gradient mb-2">1-3</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Days Delivery</div>
            </div>
            <div className="glass-card p-8 rounded-2xl hover-lift">
              <div className="text-5xl font-bold text-gradient mb-2">100%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Quality Guarantee</div>
            </div>
            <div className="glass-card p-8 rounded-2xl hover-lift">
              <div className="text-5xl font-bold text-gradient mb-2">24/7</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Worldwide Service</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
