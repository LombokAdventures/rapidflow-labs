import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Check, X, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";

const AdminReviews = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/admin/login");
  };

  const { data: reviews } = useQuery({
    queryKey: ["reviews-admin"],
    queryFn: async () => {
      const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("reviews").update({ is_approved: true, approved_at: new Date().toISOString() }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews-admin"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast({ title: "Approved", description: "Review has been approved." });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews-admin"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast({ title: "Deleted", description: "Review has been deleted." });
    },
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="border-b glass-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button></Link>
            <h1 className="text-2xl font-bold">Manage <span className="text-gradient">Reviews</span></h1>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Pending Reviews</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews?.filter(r => !r.is_approved).map((review) => (
              <div key={review.id} className="glass-card p-6 rounded-2xl space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-secondary text-secondary" : "text-muted"}`} />
                  ))}
                </div>
                <p className="text-sm">{review.review_text}</p>
                <div className="pt-4 border-t">
                  <p className="font-semibold">{review.reviewer_name}</p>
                  {review.company && <p className="text-sm text-muted-foreground">{review.company}</p>}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => approveMutation.mutate(review.id)} className="gradient-primary"><Check className="w-4 h-4 mr-2" />Approve</Button>
                  <Button size="sm" variant="outline" onClick={() => deleteMutation.mutate(review.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Published Reviews</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews?.filter(r => r.is_approved).map((review) => (
              <div key={review.id} className="glass-card p-6 rounded-2xl space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-secondary text-secondary" : "text-muted"}`} />
                  ))}
                </div>
                <p className="text-sm">{review.review_text}</p>
                <div className="pt-4 border-t">
                  <p className="font-semibold">{review.reviewer_name}</p>
                  {review.company && <p className="text-sm text-muted-foreground">{review.company}</p>}
                </div>
                <Button size="sm" variant="outline" onClick={() => deleteMutation.mutate(review.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;
