import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const PortfolioShowcase = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: projects } = useQuery({
    queryKey: ["portfolio-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .eq("is_published", true)
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const openProject = (project: any) => {
    setSelectedProject(project);
    const index = projects?.findIndex(p => p.id === project.id) || 0;
    setCurrentIndex(index);
  };

  const navigateProject = (direction: 'prev' | 'next') => {
    if (!projects) return;
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex < 0) newIndex = projects.length - 1;
    if (newIndex >= projects.length) newIndex = 0;
    setCurrentIndex(newIndex);
    setSelectedProject(projects[newIndex]);
  };

  return (
    <section id="portfolio" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("portfolio_subtitle")}
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="glass-card-hover rounded-3xl overflow-hidden group"
            >
              <div className="relative aspect-video overflow-hidden">
                <iframe
                  src={project.demo_url}
                  title={project.project_name}
                  className="w-full h-full border-0 pointer-events-none"
                  sandbox="allow-scripts allow-same-origin"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 gap-3">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="glow-accent"
                    onClick={() => openProject(project)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {t("view_demo")}
                  </Button>
                  {project.demo_url !== '#' && (
                    <Button
                      size="sm"
                      className="gradient-primary glow-primary"
                      onClick={() => window.open(project.demo_url, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t("open")}
                    </Button>
                  )}
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold flex-1">{project.project_name}</h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 whitespace-nowrap">
                    {project.category}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-1 rounded bg-accent/20 text-accent">
                    ⚡ {project.delivery_time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full-Screen Project Viewer */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-[95vw] h-[95vh] p-0 gap-0">
            <div className="flex h-full overflow-hidden">
              {/* Demo Viewer - Full Height */}
              <div className="flex-1 overflow-hidden bg-muted/30">
                <iframe
                  src={selectedProject?.demo_url}
                  className="w-full h-full border-0"
                  title={selectedProject?.project_name}
                />
              </div>

              {/* Sidebar */}
              <div className="w-80 p-6 border-l border-border glass-card overflow-y-auto flex flex-col">
                {/* Close Button */}
                <div className="flex justify-end mb-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Project Info */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">{selectedProject?.project_name}</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedProject?.category} • {selectedProject?.delivery_time}
                  </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-2 mb-6">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigateProject('prev')}
                    className="flex-1 rounded-full"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    {t("previous")}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigateProject('next')}
                    className="flex-1 rounded-full"
                  >
                    {t("next")}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                {/* Open Full Site Button */}
                {selectedProject?.demo_url !== '#' && (
                  <Button
                    size="sm"
                    className="gradient-primary glow-primary mb-6 w-full"
                    onClick={() => window.open(selectedProject?.demo_url, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t("open_full_site")}
                  </Button>
                )}

                {/* Project Details */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold mb-4">{t("project_details")}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {selectedProject?.description}
                  </p>

                  {selectedProject?.features && selectedProject.features.length > 0 && (
                    <>
                      <h4 className="font-semibold mb-3">{t("key_features")}</h4>
                      <ul className="space-y-2 mb-6">
                        {selectedProject.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("category")}:</span>
                      <span className="font-medium">{selectedProject?.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("delivery")}:</span>
                      <span className="font-medium">{selectedProject?.delivery_time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default PortfolioShowcase;
