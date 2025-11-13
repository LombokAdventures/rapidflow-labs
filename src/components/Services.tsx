import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";

const Services = () => {
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
      // Store selected service in sessionStorage for the contact form
      sessionStorage.setItem("selectedService", serviceName);
    }
  };

  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From simple landing pages to complex web applications, we deliver exceptional solutions tailored to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services?.map((service) => {
            const IconComponent = (Icons as any)[service.icon_name] || Icons.Code;
            
            return (
              <div
                key={service.id}
                className="glass-card p-8 rounded-2xl space-y-4 hover:scale-105 transition-all duration-300 group cursor-pointer"
                onClick={() => scrollToContact(service.service_name)}
              >
                <div className="w-14 h-14 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold">{service.service_name}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <Button variant="ghost" className="text-primary hover:text-primary/80 p-0 h-auto group-hover:translate-x-2 transition-transform">
                  Select This →
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
