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

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDemo, setSelectedDemo] = useState<any>(null);

  const { data: demos } = useQuery({
    queryKey: ["demos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("demos")
        .select("*")
        .eq("is_published", true)
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const categories = ["All", ...(demos ? [...new Set(demos.map(d => d.category))] : [])];
  const filteredDemos = selectedCategory === "All" 
    ? demos 
    : demos?.filter(d => d.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our recent projects and see the quality we deliver
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={selectedCategory === category ? "gradient-primary" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredDemos?.map((demo) => (
            <div
              key={demo.id}
              className="glass-card rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={demo.preview_image}
                  alt={demo.project_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 gap-3">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setSelectedDemo(demo)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Details
                  </Button>
                  {demo.demo_url !== '#' && (
                    <Button
                      size="sm"
                      className="gradient-primary"
                      onClick={() => window.open(demo.demo_url, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Demo
                    </Button>
                  )}
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{demo.project_name}</h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {demo.category}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">{demo.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Details Modal */}
        <Dialog open={!!selectedDemo} onOpenChange={() => setSelectedDemo(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedDemo?.project_name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <img
                src={selectedDemo?.preview_image}
                alt={selectedDemo?.project_name}
                className="w-full rounded-lg"
              />
              <p className="text-muted-foreground">{selectedDemo?.description}</p>
              <div>
                <h4 className="font-semibold mb-2">Key Features:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {selectedDemo?.key_features?.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              {selectedDemo?.demo_url !== '#' && (
                <Button
                  className="w-full gradient-primary"
                  onClick={() => window.open(selectedDemo?.demo_url, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Full Demo
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Portfolio;
