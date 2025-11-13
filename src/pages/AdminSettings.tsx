import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/admin/login");
  };

  const { data: companyInfo, isLoading } = useQuery({
    queryKey: ["company-info-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_info")
        .select("*")
        .single();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (companyInfo) {
      setFormData(companyInfo);
    }
  }, [companyInfo]);

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase
        .from("company_info")
        .update(data)
        .eq("id", data.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-info-admin"] });
      queryClient.invalidateQueries({ queryKey: ["company-info"] });
      toast({
        title: "Settings Saved",
        description: "Company information has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="border-b glass-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">
              Company <span className="text-gradient">Settings</span>
            </h1>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Email *</Label>
                <Input
                  required
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Telegram (e.g., @username) *</Label>
                  <Input
                    required
                    value={formData.telegram || ""}
                    onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                    placeholder="@username"
                  />
                </div>
                <div>
                  <Label>WhatsApp (with country code) *</Label>
                  <Input
                    required
                    value={formData.whatsapp || ""}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="+1234567890"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Company Description</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                rows={4}
                value={formData.company_description || ""}
                onChange={(e) => setFormData({ ...formData, company_description: e.target.value })}
                placeholder="Brief description of your company..."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Founder 1</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={formData.founder1_name || ""}
                    onChange={(e) => setFormData({ ...formData, founder1_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={formData.founder1_title || ""}
                    onChange={(e) => setFormData({ ...formData, founder1_title: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Photo URL</Label>
                <Input
                  value={formData.founder1_photo || ""}
                  onChange={(e) => setFormData({ ...formData, founder1_photo: e.target.value })}
                />
              </div>
              <div>
                <Label>LinkedIn URL</Label>
                <Input
                  value={formData.founder1_linkedin || ""}
                  onChange={(e) => setFormData({ ...formData, founder1_linkedin: e.target.value })}
                />
              </div>
              <div>
                <Label>Bio</Label>
                <Textarea
                  rows={3}
                  value={formData.founder1_bio || ""}
                  onChange={(e) => setFormData({ ...formData, founder1_bio: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Founder 2</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={formData.founder2_name || ""}
                    onChange={(e) => setFormData({ ...formData, founder2_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={formData.founder2_title || ""}
                    onChange={(e) => setFormData({ ...formData, founder2_title: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Photo URL</Label>
                <Input
                  value={formData.founder2_photo || ""}
                  onChange={(e) => setFormData({ ...formData, founder2_photo: e.target.value })}
                />
              </div>
              <div>
                <Label>LinkedIn URL</Label>
                <Input
                  value={formData.founder2_linkedin || ""}
                  onChange={(e) => setFormData({ ...formData, founder2_linkedin: e.target.value })}
                />
              </div>
              <div>
                <Label>Bio</Label>
                <Textarea
                  rows={3}
                  value={formData.founder2_bio || ""}
                  onChange={(e) => setFormData({ ...formData, founder2_bio: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Link to="/admin/dashboard">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="gradient-primary" disabled={saveMutation.isPending}>
              <Save className="w-4 h-4 mr-2" />
              {saveMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
