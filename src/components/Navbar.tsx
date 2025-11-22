import { Button } from "@/components/ui/button";
import { Menu, Languages, Moon, Sun, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const languages = [
    { code: "en", label: "EN", name: "English", flag: "🇬🇧" },
    { code: "ru", label: "РУ", name: "Русский", flag: "🇷🇺" },
    { code: "uz", label: "UZ", name: "O'zbek", flag: "🇺🇿" },
  ];

  const themes = [
    { code: "purple", icon: Sparkles, name: "Purple" },
    { code: "dark", icon: Moon, name: "Dark" },
    { code: "light", icon: Sun, name: "Light" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="font-bold text-xl">nextu<span className="text-gradient">AI</span></span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => scrollToSection("team")} className="text-foreground hover:text-primary transition-colors">
              Team
            </button>
            <button onClick={() => scrollToSection("services")} className="text-foreground hover:text-primary transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection("portfolio")} className="text-foreground hover:text-primary transition-colors">
              Portfolio
            </button>
            <button onClick={() => scrollToSection("process")} className="text-foreground hover:text-primary transition-colors">
              Process
            </button>
            <button onClick={() => scrollToSection("reviews")} className="text-foreground hover:text-primary transition-colors">
              Reviews
            </button>
            <Button onClick={() => scrollToSection("contact")} className="gradient-primary glow-primary">
              Get Started
            </Button>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-full border border-border/50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                    language === lang.code
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                  title={lang.name}
                >
                  {lang.flag}
                </button>
              ))}
            </div>

            {/* Theme Switcher */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-full border border-border/50">
              {themes.map((themeOption) => {
                const Icon = themeOption.icon;
                return (
                  <button
                    key={themeOption.code}
                    onClick={() => setTheme(themeOption.code as any)}
                    className={`p-1.5 rounded-full transition-all ${
                      theme === themeOption.code
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                    title={themeOption.name}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <button onClick={() => scrollToSection("team")} className="block w-full text-left px-4 py-2 hover:bg-muted rounded-lg">
              Team
            </button>
            <button onClick={() => scrollToSection("services")} className="block w-full text-left px-4 py-2 hover:bg-muted rounded-lg">
              Services
            </button>
            <button onClick={() => scrollToSection("portfolio")} className="block w-full text-left px-4 py-2 hover:bg-muted rounded-lg">
              Portfolio
            </button>
            <button onClick={() => scrollToSection("process")} className="block w-full text-left px-4 py-2 hover:bg-muted rounded-lg">
              Process
            </button>
            <button onClick={() => scrollToSection("reviews")} className="block w-full text-left px-4 py-2 hover:bg-muted rounded-lg">
              Reviews
            </button>
            <Button onClick={() => scrollToSection("contact")} className="w-full gradient-primary glow-primary">
              Get Started
            </Button>

            {/* Mobile Language Switcher */}
            <div className="px-4 py-2">
              <p className="text-xs text-muted-foreground mb-2">Language</p>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      language === lang.code
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {lang.flag} {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Theme Switcher */}
            <div className="px-4 py-2">
              <p className="text-xs text-muted-foreground mb-2">Theme</p>
              <div className="flex gap-2">
                {themes.map((themeOption) => {
                  const Icon = themeOption.icon;
                  return (
                    <button
                      key={themeOption.code}
                      onClick={() => setTheme(themeOption.code as any)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        theme === themeOption.code
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {themeOption.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
