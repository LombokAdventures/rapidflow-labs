import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  const { data: companyInfo } = useQuery({
    queryKey: ["company-info"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_info")
        .select("*")
        .single();
      if (error) throw error;
      return data;
    },
  });

  if (!companyInfo) return null;

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-gradient">Our Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {companyInfo.company_description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-16">
            {/* Founder 1 */}
            <div className="glass-card p-8 rounded-2xl space-y-6">
              <div className="flex items-start gap-6">
                <img
                  src={companyInfo.founder1_photo}
                  alt={companyInfo.founder1_name}
                  className="w-24 h-24 rounded-full border-4 border-primary/20"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">{companyInfo.founder1_name}</h3>
                  <p className="text-primary font-medium mb-2">{companyInfo.founder1_title}</p>
                  {companyInfo.founder1_linkedin && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto"
                      onClick={() => window.open(companyInfo.founder1_linkedin, "_blank")}
                    >
                      <Linkedin className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {companyInfo.founder1_bio}
              </p>
            </div>

            {/* Founder 2 */}
            <div className="glass-card p-8 rounded-2xl space-y-6">
              <div className="flex items-start gap-6">
                <img
                  src={companyInfo.founder2_photo}
                  alt={companyInfo.founder2_name}
                  className="w-24 h-24 rounded-full border-4 border-primary/20"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">{companyInfo.founder2_name}</h3>
                  <p className="text-primary font-medium mb-2">{companyInfo.founder2_title}</p>
                  {companyInfo.founder2_linkedin && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto"
                      onClick={() => window.open(companyInfo.founder2_linkedin, "_blank")}
                    >
                      <Linkedin className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {companyInfo.founder2_bio}
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold mb-8">Why Choose Us?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-3xl">⚡</span>
                </div>
                <h4 className="text-xl font-semibold">Lightning Fast</h4>
                <p className="text-muted-foreground">
                  Deliver complex projects in 1-3 days without compromising quality
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-3xl">🎯</span>
                </div>
                <h4 className="text-xl font-semibold">Expert Quality</h4>
                <p className="text-muted-foreground">
                  Enterprise-level expertise from top American and Korean tech companies
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-3xl">🌍</span>
                </div>
                <h4 className="text-xl font-semibold">Worldwide Service</h4>
                <p className="text-muted-foreground">
                  Dedicated support and communication across all timezones
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
