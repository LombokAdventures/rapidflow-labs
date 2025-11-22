import { MessageSquare, Lightbulb, Code, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Process = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: MessageSquare,
      title: t("process_step1_title"),
      description: t("process_step1_desc"),
    },
    {
      icon: Lightbulb,
      title: t("process_step2_title"),
      description: t("process_step2_desc"),
    },
    {
      icon: Code,
      title: t("process_step3_title"),
      description: t("process_step3_desc"),
    },
    {
      icon: Rocket,
      title: t("process_step4_title"),
      description: t("process_step4_desc"),
    },
  ];

  return (
    <section id="process" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("process_title")} <span className="text-gradient">{t("process_accent")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("process_subtitle")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="glass-card p-8 rounded-2xl text-center space-y-4 hover:scale-105 transition-transform">
                  <div className="w-16 h-16 mx-auto rounded-full gradient-primary flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold pt-4">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/3 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
