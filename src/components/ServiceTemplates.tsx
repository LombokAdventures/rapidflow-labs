import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as Icons from "lucide-react";

const ServiceTemplates = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
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

  const categories = ["All", ...(services?.map(s => s.service_name) || [])];
  const filteredTemplates = selectedCategory === "All" 
    ? templates 
    : templates?.filter(t => t.category === selectedCategory);

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
            Our <span className="text-gradient">Services</span>
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

        {/* Templates Showcase */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">
              See What We <span className="text-gradient">Actually Build</span>
            </h3>
            <p className="text-lg text-muted-foreground">
              Interactive demos of real projects we've delivered
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`rounded-full px-6 py-3 transition-all ${
                  selectedCategory === category 
                    ? "gradient-primary glow-primary" 
                    : "hover:border-primary hover:text-primary"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredTemplates?.map((template) => (
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
                      View Demo
                    </Button>
                    <Button
                      size="sm"
                      className="gradient-primary glow-primary"
                      onClick={() => window.open(template.demo_url, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open
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

        {/* Template Preview Modal */}
        <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
          <DialogContent className="max-w-6xl h-[90vh] p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-2xl">{selectedTemplate?.template_name}</DialogTitle>
            </DialogHeader>
            <div className="flex-1 p-6 overflow-hidden">
              <iframe
                src={selectedTemplate?.demo_url}
                className="w-full h-full rounded-2xl border border-border"
                title={selectedTemplate?.template_name}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ServiceTemplates;
