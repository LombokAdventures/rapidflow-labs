import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import * as Icons from "lucide-react";
import { X } from "lucide-react";

const ServiceTemplates = () => {
  const { t } = useLanguage();
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

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

  const { data: templates } = useQuery({
    queryKey: ["service-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_templates")
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
            From simple landing pages to complex applications, explore our solutions
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
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
                  Select This →
                </Button>
              </div>
            );
          })}
        </div>

        {/* Templates Showcase by Service */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">
              {t("portfolio_title")} <span className="text-gradient">{t("portfolio_build")}</span>
            </h3>
            <p className="text-lg text-muted-foreground">
              Browse our template examples by service category
            </p>
          </div>

          {/* Templates Grid Grouped by Service */}
          {services?.map((service) => {
            const serviceTemplates = templates?.filter(
              (template) => template.category === service.service_name
            );
            
            if (!serviceTemplates || serviceTemplates.length === 0) return null;

            return (
              <div key={service.id} className="mb-16">
                <h4 className="text-2xl font-bold mb-6 text-center">
                  {service.service_name} Templates
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  {serviceTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="glass-card-hover rounded-3xl overflow-hidden group cursor-pointer"
                    >
                      <div className="relative aspect-video overflow-hidden bg-muted/50">
                        <img
                          src={template.preview_url}
                          alt={template.template_name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 gap-3">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="glow-accent"
                            onClick={() => setSelectedTemplate(template)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            {t("view_demo")}
                          </Button>
                          <Button
                            size="sm"
                            className="gradient-primary glow-primary"
                            onClick={() => window.open(template.demo_url, "_blank")}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {t("open")}
                          </Button>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-bold mb-2">{template.template_name}</h4>
                        <p className="text-muted-foreground text-sm">{template.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Template Preview Modal */}
        <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] h-[95vh] p-0 gap-0 [&>button]:hidden">
            <div className="flex flex-col md:flex-row h-full overflow-hidden">
              {/* Demo Viewer */}
              <div className="flex-1 overflow-hidden bg-muted/30 h-64 md:h-full">
                <iframe
                  src={selectedTemplate?.demo_url}
                  className="w-full h-full border-0"
                  title={selectedTemplate?.template_name}
                />
              </div>

              {/* Sidebar */}
              <div className="w-full md:w-80 p-6 border-t md:border-t-0 md:border-l border-border glass-card overflow-y-auto">
                <div className="flex justify-end mb-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedTemplate(null)}
                    className="rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <h2 className="text-2xl font-bold mb-2">{selectedTemplate?.template_name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{selectedTemplate?.category}</p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {selectedTemplate?.description}
                </p>

                {selectedTemplate?.demo_url && (
                  <Button
                    size="sm"
                    className="gradient-primary glow-primary w-full"
                    onClick={() => window.open(selectedTemplate?.demo_url, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t("open_full_site")}
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ServiceTemplates;
