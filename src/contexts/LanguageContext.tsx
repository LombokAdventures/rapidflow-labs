import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ru" | "uz" | "id";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    hero_title: "AI-Powered Solutions in",
    hero_days: "Record Time",
    hero_subtitle: "Next-generation AI development for forward-thinking enterprises",
    cta_start: "Start Your AI Journey",
    cta_portfolio: "View Portfolio",
    team_title: "Meet Our",
    team_dream: "AI Experts",
    services_title: "Our",
    services_word: "Services",
    portfolio_title: "See What We",
    portfolio_build: "Actually Build",
    portfolio_subtitle: "Real AI solutions deployed for global clients",
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
    hero_title: "AI-Решения За",
    hero_days: "Рекордное Время",
    hero_subtitle: "ИИ-разработка нового поколения для передовых предприятий",
    cta_start: "Начать AI Проект",
    cta_portfolio: "Портфолио",
    team_title: "Познакомьтесь с",
    team_dream: "Экспертами AI",
    services_title: "Наши",
    services_word: "Услуги",
    portfolio_title: "Посмотрите Что Мы",
    portfolio_build: "Реально Создаем",
    portfolio_subtitle: "Реальные AI решения для глобальных клиентов",
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
    hero_title: "AI Yechimlari",
    hero_days: "Rekord Vaqtda",
    hero_subtitle: "Ilg'or korxonalar uchun yangi avlod AI ishlab chiqish",
    cta_start: "AI Loyihasini Boshlash",
    cta_portfolio: "Portfolio",
    team_title: "Bizning",
    team_dream: "AI Mutaxassislar",
    services_title: "Bizning",
    services_word: "Xizmatlar",
    portfolio_title: "Biz Nima",
    portfolio_build: "Yaratamiz",
    portfolio_subtitle: "Global mijozlar uchun haqiqiy AI yechimlari",
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
  id: {
    hero_title: "Solusi AI dalam",
    hero_days: "Waktu Singkat",
    hero_subtitle: "Pengembangan AI generasi berikutnya untuk perusahaan visioner",
    cta_start: "Mulai Perjalanan AI",
    cta_portfolio: "Lihat Portfolio",
    team_title: "Temui",
    team_dream: "Ahli AI Kami",
    services_title: "Layanan",
    services_word: "Kami",
    portfolio_title: "Lihat Apa Yang",
    portfolio_build: "Kami Bangun",
    portfolio_subtitle: "Solusi AI nyata untuk klien global",
    view_demo: "Lihat Demo",
    open: "Buka",
    previous: "Sebelumnya",
    next: "Selanjutnya",
    open_full_site: "Buka Situs Lengkap",
    project_details: "Detail Proyek",
    key_features: "Fitur Utama",
    category: "Kategori",
    delivery: "Pengiriman",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("language");
      console.log("[LanguageProvider] Loading saved language:", saved);
      const validLanguage = (saved === "en" || saved === "ru" || saved === "uz" || saved === "id") ? saved : "en";
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
