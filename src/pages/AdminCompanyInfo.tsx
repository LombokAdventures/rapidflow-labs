import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const AdminCompanyInfo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/secret/admin");
  };

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
        .eq("id", companyInfo?.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-info"] });
      toast({ title: "Company info updated successfully" });
    },
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="border-b glass-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/secret/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">
              Company <span className="text-gradient">Information</span>
            </h1>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveMutation.mutate(formData);
          }}
          className="space-y-6 glass-card p-8 rounded-2xl"
        >
          <div>
            <Label>Company Description</Label>
            <Textarea
              rows={4}
              value={formData.company_description || ""}
              onChange={(e) =>
                setFormData({ ...formData, company_description: e.target.value })
              }
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Label>WhatsApp</Label>
              <Input
                value={formData.whatsapp || ""}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              />
            </div>
            <div>
              <Label>Telegram</Label>
              <Input
                value={formData.telegram || ""}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold mb-4">Founder 1</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={formData.founder1_name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, founder1_name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.founder1_title || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, founder1_title: e.target.value })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <Label>Bio</Label>
                <Textarea
                  rows={3}
                  value={formData.founder1_bio || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, founder1_bio: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Photo URL</Label>
                <Input
                  value={formData.founder1_photo || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, founder1_photo: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>LinkedIn</Label>
                <Input
                  value={formData.founder1_linkedin || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, founder1_linkedin: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold mb-4">Founder 2</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={formData.founder2_name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, founder2_name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.founder2_title || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, founder2_title: e.target.value })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <Label>Bio</Label>
                <Textarea
                  rows={3}
                  value={formData.founder2_bio || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, founder2_bio: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Photo URL</Label>
                <Input
                  value={formData.founder2_photo || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, founder2_photo: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>LinkedIn</Label>
                <Input
                  value={formData.founder2_linkedin || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, founder2_linkedin: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full gradient-primary">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminCompanyInfo;
