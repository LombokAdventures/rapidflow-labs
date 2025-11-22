import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";

const ServiceTemplates = () => {
  const { t } = useLanguage();

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const scrollToContact = (serviceName: string) => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      sessionStorage.setItem("selectedService", serviceName);
    }
  };

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            {t("services_title")} <span className="text-gradient">{t("services_word")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("services_subtitle")}
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services?.map((service) => {
            const IconComponent = (Icons as any)[service.icon_name] || Icons.Code;

            return (
              <div
                key={service.id}
                className="glass-card-hover p-8 rounded-3xl group cursor-pointer"
                onClick={() => scrollToContact(service.service_name)}
              >
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform glow-primary">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.service_name}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                <Button variant="ghost" className="text-primary hover:text-primary/80 p-0 h-auto group-hover:translate-x-2 transition-transform">
                  {t("select_this")} →
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceTemplates;
