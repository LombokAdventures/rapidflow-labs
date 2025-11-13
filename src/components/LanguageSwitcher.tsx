import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "./ui/button";
import { Languages, Moon, Sun, Sparkles } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  const languages = [
    { code: "en", label: "EN", name: "English", flag: "🇬🇧" },
    { code: "ru", label: "РУ", name: "Русский", flag: "🇷🇺" },
    { code: "uz", label: "UZ", name: "O'zbek", flag: "🇺🇿" },
  ];

  const themes = [
    { code: "purple", icon: Sparkles, name: "Purple", gradient: "from-purple-500 to-cyan-500" },
    { code: "dark", icon: Moon, name: "Dark", gradient: "from-blue-500 to-teal-500" },
    { code: "light", icon: Sun, name: "Light", gradient: "from-purple-400 to-blue-400" },
  ];

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
      {/* Language Switcher */}
      <div className="flex items-center gap-3 glass-card px-4 py-2.5 rounded-full shadow-xl border-2 border-primary/20">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-primary animate-pulse-slow" />
          <span className="text-xs font-medium text-muted-foreground hidden sm:inline">Lang</span>
        </div>
        <div className="h-5 w-px bg-border" />
        <div className="flex gap-1.5">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(lang.code as any)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all relative group ${
                language === lang.code
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "hover:bg-primary/20 hover:scale-105"
              }`}
              title={lang.name}
            >
              <span className="flex items-center gap-1">
                <span className="text-sm">{lang.flag}</span>
                <span className="hidden sm:inline">{lang.label}</span>
              </span>
              {language === lang.code && (
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-30 animate-pulse" />
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Theme Switcher */}
      <div className="flex items-center gap-3 glass-card px-4 py-2.5 rounded-full shadow-xl border-2 border-primary/20">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary animate-pulse-slow" />
          <span className="text-xs font-medium text-muted-foreground hidden sm:inline">Theme</span>
        </div>
        <div className="h-5 w-px bg-border" />
        <div className="flex gap-1.5">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            return (
              <Button
                key={themeOption.code}
                variant="ghost"
                size="sm"
                onClick={() => setTheme(themeOption.code as any)}
                className={`px-2.5 py-1 rounded-full transition-all relative group ${
                  theme === themeOption.code
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "hover:bg-primary/20 hover:scale-105"
                }`}
                title={themeOption.name}
              >
                <Icon className="w-4 h-4" />
                {theme === themeOption.code && (
                  <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${themeOption.gradient} opacity-20 animate-pulse`} />
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
