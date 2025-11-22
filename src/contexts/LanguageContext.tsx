import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ru" | "uz";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Hero Section
    hero_title: "We Build Websites in",
    hero_days: "1-3 Days",
    hero_subtitle: "Lightning-fast development, enterprise quality",
    hero_badge: "Ultra-fast development • World-class quality",
    cta_start: "Start Your Project",
    cta_portfolio: "View Portfolio",
    // Stats
    stat_days: "Days Delivery",
    stat_quality: "Quality Guarantee",
    stat_service: "Worldwide Service",
    // Team Section
    team_title: "Meet the",
    team_dream: "Dream Team",
    team_subtitle: "Expert engineers from top tech companies, united by passion for exceptional web development",
    why_choose_us: "Why Choose Us?",
    lightning_fast: "Lightning Fast",
    lightning_fast_desc: "Deliver complex projects in 1-3 days without compromising on quality or features",
    expert_quality: "Expert Quality",
    expert_quality_desc: "Enterprise-level expertise from top American and Korean tech companies",
    worldwide_service: "Worldwide Service",
    worldwide_service_desc: "Dedicated support and communication across all timezones",
    // Services Section
    services_title: "Our",
    services_word: "Services",
    services_subtitle: "From simple landing pages to complex applications, explore our solutions",
    select_this: "Select This",
    // Portfolio Section
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
    // Hero Section
    hero_title: "Создаем Сайты за",
    hero_days: "1-3 Дня",
    hero_subtitle: "Молниеносная разработка, корпоративное качество",
    hero_badge: "Быстрая разработка • Мировой уровень качества",
    cta_start: "Начать Проект",
    cta_portfolio: "Портфолио",
    // Stats
    stat_days: "Дней Доставка",
    stat_quality: "Гарантия Качества",
    stat_service: "Мировой Сервис",
    // Team Section
    team_title: "Познакомьтесь с",
    team_dream: "Командой Мечты",
    team_subtitle: "Эксперты из ведущих IT компаний, объединённые страстью к веб-разработке",
    why_choose_us: "Почему Мы?",
    lightning_fast: "Молниеносная Скорость",
    lightning_fast_desc: "Сложные проекты за 1-3 дня без компромиссов в качестве",
    expert_quality: "Экспертное Качество",
    expert_quality_desc: "Уровень лучших американских и корейских IT компаний",
    worldwide_service: "Мировой Сервис",
    worldwide_service_desc: "Поддержка и коммуникация во всех часовых поясах",
    // Services Section
    services_title: "Наши",
    services_word: "Услуги",
    services_subtitle: "От простых лендингов до сложных приложений — изучите наши решения",
    select_this: "Выбрать",
    // Portfolio Section
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
    // Hero Section
    hero_title: "Veb-saytlarni",
    hero_days: "1-3 Kunda Yaratamiz",
    hero_subtitle: "Tezkor ishlab chiqish, yuqori sifat",
    hero_badge: "Tezkor ishlab chiqish • Jahon sifati",
    cta_start: "Loyihani Boshlash",
    cta_portfolio: "Portfolio",
    // Stats
    stat_days: "Kunlik Yetkazib Berish",
    stat_quality: "Sifat Kafolati",
    stat_service: "Jahon Xizmati",
    // Team Section
    team_title: "Bizning",
    team_dream: "Orzular Jamoasi",
    team_subtitle: "Yetakchi IT kompaniyalardan mutaxassislar, veb-dasturlash ishtiyoqi bilan birlashgan",
    why_choose_us: "Nega Biz?",
    lightning_fast: "Chaqmoq Tezligi",
    lightning_fast_desc: "Murakkab loyihalarni 1-3 kunda sifatni yo'qotmasdan yaratamiz",
    expert_quality: "Ekspert Sifati",
    expert_quality_desc: "Amerika va Koreya IT kompaniyalari darajasida",
    worldwide_service: "Jahon Xizmati",
    worldwide_service_desc: "Barcha vaqt zonalarida qo'llab-quvvatlash va aloqa",
    // Services Section
    services_title: "Bizning",
    services_word: "Xizmatlar",
    services_subtitle: "Oddiy sahifalardan murakkab ilovalargacha — yechimlarimizni ko'ring",
    select_this: "Tanlash",
    // Portfolio Section
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
