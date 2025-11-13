import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ru" | "uz";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    hero_title: "We Build Websites in",
    hero_days: "1-3 Days",
    hero_subtitle: "Lightning-fast development, enterprise quality",
    cta_start: "Start Your Project",
    cta_portfolio: "View Portfolio",
    team_title: "Meet the",
    team_dream: "Dream Team",
    services_title: "Our",
    services_word: "Services",
    portfolio_title: "See What We",
    portfolio_build: "Actually Build",
  },
  ru: {
    hero_title: "Создаем Сайты за",
    hero_days: "1-3 Дня",
    hero_subtitle: "Молниеносная разработка, корпоративное качество",
    cta_start: "Начать Проект",
    cta_portfolio: "Портфолио",
    team_title: "Познакомьтесь с",
    team_dream: "Командой Мечты",
    services_title: "Наши",
    services_word: "Услуги",
    portfolio_title: "Посмотрите Что Мы",
    portfolio_build: "Реально Создаем",
  },
  uz: {
    hero_title: "1-3 Kunda Veb-sayt",
    hero_days: "Yaratamiz",
    hero_subtitle: "Tezkor ishlab chiqish, yuqori sifat",
    cta_start: "Boshlash",
    cta_portfolio: "Portfolio",
    team_title: "Bizning",
    team_dream: "Orzular Jamoasi",
    services_title: "Bizning",
    services_word: "Xizmatlar",
    portfolio_title: "Biz Nima",
    portfolio_build: "Yaratamiz",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
