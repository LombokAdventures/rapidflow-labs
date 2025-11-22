import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useLanguage } from "@/contexts/LanguageContext";

const reviewSchema = z.object({
  reviewer_name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  rating: z.number().min(1).max(5),
  review_text: z.string().min(10, "Review must be at least 10 characters"),
});

const Reviews = () => {
  const { t } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    reviewer_name: "",
    company: "",
    review_text: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const submitReview = useMutation({
    mutationFn: async (reviewData: any) => {
      const { error } = await supabase
        .from("reviews")
        .insert([reviewData]);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Review Submitted!",
        description: "Your review will be published after approval.",
      });
      setIsDialogOpen(false);
      setFormData({ reviewer_name: "", company: "", review_text: "" });
      setRating(5);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = reviewSchema.parse({
        ...formData,
        rating,
      });
      submitReview.mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <section id="reviews" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("reviews_title")} <span className="text-gradient">{t("reviews_accent")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("reviews_subtitle")}
          </p>
          <Button onClick={() => setIsDialogOpen(true)} className="gradient-primary">
            {t("reviews_cta")}
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {reviews?.map((review) => (
            <div key={review.id} className="glass-card p-8 rounded-2xl space-y-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? "fill-secondary text-secondary"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                "{review.review_text}"
              </p>
              <div className="pt-4 border-t">
                <p className="font-semibold">{review.reviewer_name}</p>
                {review.company && (
                  <p className="text-sm text-muted-foreground">{review.company}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Review Submission Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Leave a Review</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Rating</label>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(i + 1)}
                    >
                      <Star
                        className={`w-8 h-8 cursor-pointer ${
                          i < rating
                            ? "fill-secondary text-secondary"
                            : "text-muted"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Name</label>
                <Input
                  required
                  value={formData.reviewer_name}
                  onChange={(e) =>
                    setFormData({ ...formData, reviewer_name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Company (Optional)
                </label>
                <Input
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Review</label>
                <Textarea
                  required
                  rows={4}
                  value={formData.review_text}
                  onChange={(e) =>
                    setFormData({ ...formData, review_text: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full gradient-primary">
                Submit Review
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Reviews;
