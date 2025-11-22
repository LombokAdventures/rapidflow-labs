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
    hero_badge: "Your next AI partner • Future-ready solutions",
    cta_start: "Start Your AI Journey",
    cta_portfolio: "View Portfolio",

    nav_team: "Team",
    nav_services: "Services",
    nav_portfolio: "Portfolio",
    nav_process: "Process",
    nav_reviews: "Reviews",
    nav_cta: "Get Started",

    team_title: "Meet Our",
    team_dream: "AI Experts",
    team_subtitle: "Applied AI researchers and software architects turning cutting-edge research into production systems",
    why_title: "Why Choose Us?",
    why_fast_title: "Research-Driven AI",
    why_fast_desc: "We design, train and deploy state-of-the-art models across Vision, NLP and multimodal tasks.",
    why_quality_title: "Enterprise-Grade Systems",
    why_quality_desc: "Architectures built for reliability, observability and long-term maintainability.",
    why_global_title: "Global Impact",
    why_global_desc: "Solutions serving users worldwide with robust infrastructure and support.",

    services_title: "Our",
    services_word: "Services",
    services_subtitle: "From research prototypes to production AI platforms, we design and ship end-to-end solutions.",
    services_select: "Select This →",

    portfolio_title: "See What We",
    portfolio_build: "Actually Build",
    portfolio_subtitle: "Real AI solutions deployed for global clients.",
    view_demo: "View Demo",
    open: "Open",
    previous: "Previous",
    next: "Next",
    open_full_site: "Open Full Site",
    project_details: "Project Details",
    key_features: "Key Features",
    category: "Category",
    delivery: "Delivery",

    process_title: "How It",
    process_accent: "Works",
    process_subtitle: "A focused, engineering-first workflow from idea to production deployment.",
    process_step1_title: "Discovery",
    process_step1_desc: "We clarify objectives, constraints and success metrics with you and your stakeholders.",
    process_step2_title: "Architecture",
    process_step2_desc: "We design the AI and system architecture aligned with your existing stack.",
    process_step3_title: "Implementation",
    process_step3_desc: "We build, evaluate and iterate rapidly with tight feedback cycles.",
    process_step4_title: "Launch",
    process_step4_desc: "We deploy, monitor and hand over a reliable production system.",

    reviews_title: "Client",
    reviews_accent: "Reviews",
    reviews_subtitle: "What technical and business leaders say about collaborating with our team.",
    reviews_cta: "Leave a Review",

    contact_title: "Get In",
    contact_accent: "Touch",
    contact_subtitle: "Tell us about your challenge and we’ll propose the next best AI step for your business.",
  },
  ru: {
    hero_title: "AI-Решения За",
    hero_days: "Рекордное Время",
    hero_subtitle: "ИИ-разработка нового поколения для передовых предприятий",
    hero_badge: "Ваш следующий AI-партнёр • Решения для будущего",
    cta_start: "Начать AI Путь",
    cta_portfolio: "Портфолио",

    nav_team: "Команда",
    nav_services: "Услуги",
    nav_portfolio: "Портфолио",
    nav_process: "Процесс",
    nav_reviews: "Отзывы",
    nav_cta: "Начать",

    team_title: "Познакомьтесь с",
    team_dream: "Экспертами AI",
    team_subtitle: "Исследователи и архитекторы, превращающие передовые разработки в продакшн-системы.",
    why_title: "Почему Мы?",
    why_fast_title: "Исследовательский AI",
    why_fast_desc: "Проектируем, обучаем и внедряем модели последнего поколения для Vision, NLP и мультимодальных задач.",
    why_quality_title: "Enterprise-Уровень",
    why_quality_desc: "Архитектуры, созданные для надёжности, наблюдаемости и долгосрочной поддержки.",
    why_global_title: "Глобальный Масштаб",
    why_global_desc: "Решения для пользователей по всему миру с устойчивой инфраструктурой.",

    services_title: "Наши",
    services_word: "Услуги",
    services_subtitle: "От исследовательских прототипов до продакшн-платформ AI — полный цикл разработки.",
    services_select: "Выбрать →",

    portfolio_title: "Посмотрите Что Мы",
    portfolio_build: "Реально Создаем",
    portfolio_subtitle: "Реальные AI-решения, запущенные для глобальных клиентов.",
    view_demo: "Смотреть Демо",
    open: "Открыть",
    previous: "Назад",
    next: "Вперёд",
    open_full_site: "Открыть Полный Сайт",
    project_details: "Детали Проекта",
    key_features: "Ключевые Функции",
    category: "Категория",
    delivery: "Сроки",

    process_title: "Как Это",
    process_accent: "Работает",
    process_subtitle: "Сфокусированный инженерный процесс от идеи до запуска в продакшн.",
    process_step1_title: "Дискавери",
    process_step1_desc: "Формулируем цели, ограничения и метрики успеха вместе с вашей командой.",
    process_step2_title: "Архитектура",
    process_step2_desc: "Проектируем AI и системную архитектуру под ваш текущий стек.",
    process_step3_title: "Разработка",
    process_step3_desc: "Быстро разрабатываем, тестируем и итеративно улучшаем систему.",
    process_step4_title: "Запуск",
    process_step4_desc: "Внедряем, настраиваем мониторинг и передаём стабильную систему.",

    reviews_title: "Отзывы",
    reviews_accent: "Клиентов",
    reviews_subtitle: "Что технические лидеры и основатели говорят о работе с нами.",
    reviews_cta: "Оставить отзыв",

    contact_title: "Свяжитесь",
    contact_accent: "С Нами",
    contact_subtitle: "Расскажите о вашей задаче, и мы предложим следующий лучший AI-шаг для бизнеса.",
  },
  uz: {
    hero_title: "AI Yechimlari",
    hero_days: "Rekord Vaqtda",
    hero_subtitle: "Ilg'or korxonalar uchun yangi avlod AI ishlab chiqish",
    hero_badge: "Sizning keyingi AI hamkoringiz • Kelajakga tayyor yechimlar",
    cta_start: "AI Loyihasini Boshlash",
    cta_portfolio: "Portfolio",

    nav_team: "Jamoa",
    nav_services: "Xizmatlar",
    nav_portfolio: "Portfolio",
    nav_process: "Jarayon",
    nav_reviews: "Fikrlar",
    nav_cta: "Boshlash",

    team_title: "Bizning",
    team_dream: "AI Mutaxassislar",
    team_subtitle: "Eng soʻnggi tadqiqotlarni ishlab chiqarish tizimlariga aylantiradigan tadqiqotchilar va arxitektorlar.",
    why_title: "Nega Aynan Biz?",
    why_fast_title: "Tadqiqotga Asoslangan AI",
    why_fast_desc: "Vision, NLP va multimodal vazifalar uchun ilgʻor modellarning dizayni va joriy etilishi.",
    why_quality_title: "Enterprise Sifat",
    why_quality_desc: "Uzoq muddatli barqarorlik va kuzatuvchanlik uchun qurilgan arxitekturalar.",
    why_global_title: "Global Ta'sir",
    why_global_desc: "Butun dunyo foydalanuvchilari uchun ishonchli infratuzilmaga ega yechimlar.",

    services_title: "Bizning",
    services_word: "Xizmatlar",
    services_subtitle: "Tadqiqot prototiplaridan tortib ishlab chiqarish darajasidagi AI platformalarigacha toʻliq sikl.",
    services_select: "Tanlash →",

    portfolio_title: "Biz Nima",
    portfolio_build: "Yaratamiz",
    portfolio_subtitle: "Global mijozlar uchun haqiqiy AI yechimlari.",
    view_demo: "Demoni Ko'rish",
    open: "Ochish",
    previous: "Oldingi",
    next: "Keyingi",
    open_full_site: "To'liq Saytni Ochish",
    project_details: "Loyiha Tafsilotlari",
    key_features: "Asosiy Xususiyatlar",
    category: "Kategoriya",
    delivery: "Muddat",

    process_title: "Qanday",
    process_accent: "Ishlaydi",
    process_subtitle: "G'oyadan ishga tushirishgacha bo'lgan aniq va tezkor muhandislik jarayoni.",
    process_step1_title: "Tahlil",
    process_step1_desc: "Maqsadlar, cheklovlar va muvaffaqiyat mezonlarini birgalikda aniqlaymiz.",
    process_step2_title: "Arxitektura",
    process_step2_desc: "AI va tizim arxitekturasini sizning texnologik stack'ingizga mos tarzda loyihalaymiz.",
    process_step3_title: "Ishlab Chiqish",
    process_step3_desc: "Tez iteratsiyalar bilan quramiz, sinovdan oʻtkazamiz va yaxshilaymiz.",
    process_step4_title: "Ishga Tushirish",
    process_step4_desc: "Barqaror tizimni joriy qilamiz, monitoring oʻrnatamiz va topshiramiz.",

    reviews_title: "Mijoz",
    reviews_accent: "Fikrlari",
    reviews_subtitle: "Texnik liderlar va asoschilarning biz bilan hamkorlik haqidagi fikrlari.",
    reviews_cta: "Fikr Qoldirish",

    contact_title: "Biz Bilan",
    contact_accent: "Bog'laning",
    contact_subtitle: "Muammoingiz haqida yozing, biz biznesingiz uchun navbatdagi AI qadamni taklif qilamiz.",
  },
  id: {
    hero_title: "Solusi AI dalam",
    hero_days: "Waktu Singkat",
    hero_subtitle: "Pengembangan AI generasi berikutnya untuk perusahaan visioner",
    hero_badge: "Partner AI berikutnya • Solusi siap masa depan",
    cta_start: "Mulai Perjalanan AI",
    cta_portfolio: "Lihat Portofolio",

    nav_team: "Tim",
    nav_services: "Layanan",
    nav_portfolio: "Portofolio",
    nav_process: "Proses",
    nav_reviews: "Testimoni",
    nav_cta: "Mulai Sekarang",

    team_title: "Temui",
    team_dream: "Ahli AI Kami",
    team_subtitle: "Peneliti dan arsitek yang mengubah riset mutakhir menjadi sistem produksi.",
    why_title: "Mengapa nextuAI?",
    why_fast_title: "AI Berbasis Riset",
    why_fast_desc: "Merancang dan menerapkan model terkini untuk Vision, NLP, dan sistem multimodal.",
    why_quality_title: "Kualitas Enterprise",
    why_quality_desc: "Arsitektur yang dibangun untuk keandalan dan pemeliharaan jangka panjang.",
    why_global_title: "Dampak Global",
    why_global_desc: "Solusi yang melayani pengguna di seluruh dunia dengan infrastruktur yang kokoh.",

    services_title: "Layanan",
    services_word: "Kami",
    services_subtitle: "Dari prototipe riset hingga platform AI produksi, kami menangani ujung ke ujung.",
    services_select: "Pilih Ini →",

    portfolio_title: "Lihat Apa Yang",
    portfolio_build: "Kami Bangun",
    portfolio_subtitle: "Solusi AI nyata untuk klien global.",
    view_demo: "Lihat Demo",
    open: "Buka",
    previous: "Sebelumnya",
    next: "Berikutnya",
    open_full_site: "Buka Situs Lengkap",
    project_details: "Detail Proyek",
    key_features: "Fitur Utama",
    category: "Kategori",
    delivery: "Waktu",

    process_title: "Bagaimana",
    process_accent: "Bekerja",
    process_subtitle: "Alur kerja rekayasa yang fokus dari ide hingga produksi.",
    process_step1_title: "Discovery",
    process_step1_desc: "Kami menyelaraskan tujuan, batasan, dan metrik keberhasilan dengan tim Anda.",
    process_step2_title: "Arsitektur",
    process_step2_desc: "Kami merancang arsitektur AI dan sistem yang cocok dengan stack Anda.",
    process_step3_title: "Implementasi",
    process_step3_desc: "Kami membangun dan menguji dengan iterasi cepat dan umpan balik rutin.",
    process_step4_title: "Peluncuran",
    process_step4_desc: "Kami deploy, monitor, dan menyerahkan sistem yang andal.",

    reviews_title: "Testimoni",
    reviews_accent: "Klien",
    reviews_subtitle: "Pendapat para pemimpin teknis dan bisnis tentang kerja sama dengan kami.",
    reviews_cta: "Tulis Testimoni",

    contact_title: "Hubungi",
    contact_accent: "Kami",
    contact_subtitle: "Ceritakan tantangan Anda dan kami bantu menentukan langkah AI berikutnya untuk bisnis Anda.",
  },
} as const;

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("language");
      const validLanguage =
        saved === "en" || saved === "ru" || saved === "uz" || saved === "id"
          ? (saved as Language)
          : "en";
      return validLanguage;
    } catch (error) {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("language", language);
    } catch (error) {
      // ignore
    }
  }, [language]);

  const t = (key: string): string => {
    const dict = translations[language] as Record<string, string>;
    return dict[key] || key;
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
