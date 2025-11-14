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
    portfolio_subtitle: "Interactive demos of real projects we've delivered",
    view_demo: "View Demo",
    open: "Open",
    previous: "Previous",
    next: "Next",
    open_full_site: "Open Full Site",
    project_details: "Project Details",
    key_features: "Key Features",
    category: "Category",
    delivery: "Delivery",
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
    portfolio_subtitle: "Интерактивные демо реальных проектов, которые мы создали",
    view_demo: "Смотреть Демо",
    open: "Открыть",
    previous: "Назад",
    next: "Вперед",
    open_full_site: "Открыть Полный Сайт",
    project_details: "Детали Проекта",
    key_features: "Ключевые Функции",
    category: "Категория",
    delivery: "Доставка",
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
    portfolio_subtitle: "Biz yaratgan haqiqiy loyihalarning interaktiv demolari",
    view_demo: "Demoni Ko'rish",
    open: "Ochish",
    previous: "Oldingi",
    next: "Keyingi",
    open_full_site: "To'liq Saytni Ochish",
    project_details: "Loyiha Tafsilotlari",
    key_features: "Asosiy Xususiyatlar",
    category: "Kategoriya",
    delivery: "Yetkazib berish",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("language");
      console.log("[LanguageProvider] Loading saved language:", saved);
      const validLanguage = (saved === "en" || saved === "ru" || saved === "uz") ? saved : "en";
      console.log("[LanguageProvider] Using language:", validLanguage);
      return validLanguage;
    } catch (error) {
      console.error("[LanguageProvider] Error loading language from localStorage:", error);
      return "en";
    }
  });

  useEffect(() => {
    try {
      console.log("[LanguageProvider] Saving language:", language);
      localStorage.setItem("language", language);
    } catch (error) {
      console.error("[LanguageProvider] Error saving language to localStorage:", error);
    }
  }, [language]);

  const t = (key: string): string => {
    try {
      const translation = translations[language][key as keyof typeof translations.en];
      if (!translation) {
        console.warn("[LanguageProvider] Missing translation for key:", key, "in language:", language);
        return key;
      }
      return translation;
    } catch (error) {
      console.error("[LanguageProvider] Error getting translation for key:", key, error);
      return key;
    }
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
