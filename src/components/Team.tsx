import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Team = () => {
  const { t } = useLanguage();
  const { data: teamMembers } = useQuery({
    queryKey: ["team-members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="team" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              {t("team_title")} <span className="text-gradient">{t("team_dream")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Expert engineers from top tech companies, united by passion for exceptional web development
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {teamMembers?.map((member, index) => (
              <div 
                key={member.id} 
                className="glass-card-hover p-10 rounded-3xl group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    <img
                      src={member.photo_url}
                      alt={member.name}
                      className="relative w-28 h-28 rounded-full border-4 border-primary/30 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium text-lg mb-1">{member.title}</p>
                    {member.company && (
                      <p className="text-muted-foreground mb-3">{member.company}</p>
                    )}
                    <div className="flex gap-2">
                      {member.linkedin && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 h-auto hover:text-primary transition-colors"
                          onClick={() => window.open(member.linkedin, "_blank")}
                        >
                          <Linkedin className="w-5 h-5" />
                        </Button>
                      )}
                      {member.twitter && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 h-auto hover:text-accent transition-colors"
                          onClick={() => window.open(member.twitter, "_blank")}
                        >
                          <Twitter className="w-5 h-5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {member.bio}
                </p>
                {member.skills && member.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Why Choose Us */}
          <div className="mt-24 text-center">
            <h3 className="text-4xl font-bold mb-12">Why Choose Us?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card p-8 rounded-2xl hover-lift">
                <div className="w-20 h-20 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6 glow-primary">
                  <span className="text-4xl">⚡</span>
                </div>
                <h4 className="text-2xl font-semibold mb-4">Lightning Fast</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Deliver complex projects in 1-3 days without compromising on quality or features
                </p>
              </div>
              <div className="glass-card p-8 rounded-2xl hover-lift">
                <div className="w-20 h-20 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6 glow-primary">
                  <span className="text-4xl">🎯</span>
                </div>
                <h4 className="text-2xl font-semibold mb-4">Expert Quality</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Enterprise-level expertise from top American and Korean tech companies
                </p>
              </div>
              <div className="glass-card p-8 rounded-2xl hover-lift">
                <div className="w-20 h-20 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6 glow-primary">
                  <span className="text-4xl">🌍</span>
                </div>
                <h4 className="text-2xl font-semibold mb-4">Worldwide Service</h4>
                <p className="text-muted-foreground leading-relaxed">
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

export default Team;
