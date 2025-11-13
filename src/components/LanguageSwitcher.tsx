import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "en", label: "EN", name: "English" },
    { code: "ru", label: "РУ", name: "Русский" },
    { code: "uz", label: "UZ", name: "O'zbek" },
  ];

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-2 glass-card px-4 py-2 rounded-full">
      <Languages className="w-4 h-4 text-primary" />
      <div className="flex gap-1">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(lang.code as any)}
            className={`px-3 py-1 text-sm transition-all ${
              language === lang.code
                ? "bg-primary text-primary-foreground"
                : "hover:bg-primary/20"
            }`}
          >
            {lang.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
