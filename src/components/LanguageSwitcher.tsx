import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "en", label: "EN", name: "English", flag: "🇬🇧" },
    { code: "ru", label: "РУ", name: "Русский", flag: "🇷🇺" },
    { code: "uz", label: "UZ", name: "O'zbek", flag: "🇺🇿" },
  ];

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3 glass-card px-4 py-2.5 rounded-full shadow-xl border-2 border-primary/20">
      <div className="flex items-center gap-2">
        <Languages className="w-5 h-5 text-primary animate-pulse-slow" />
        <span className="text-xs font-medium text-muted-foreground hidden sm:inline">Language</span>
      </div>
      <div className="h-6 w-px bg-border" />
      <div className="flex gap-1.5">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(lang.code as any)}
            className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-all relative group ${
              language === lang.code
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "hover:bg-primary/20 hover:scale-105"
            }`}
            title={lang.name}
          >
            <span className="flex items-center gap-1.5">
              <span className="text-base">{lang.flag}</span>
              <span>{lang.label}</span>
            </span>
            {language === lang.code && (
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-30 animate-pulse" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
