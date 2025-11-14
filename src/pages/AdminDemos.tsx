import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const AdminDemos = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDemo, setEditingDemo] = useState<any>(null);
  const [formData, setFormData] = useState({
    project_name: "",
    category: "",
    description: "",
    key_features: "",
    demo_url: "",
    preview_image: "",
    is_featured: false,
    is_published: true,
    display_order: 0,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/secret/admin/login");
    }
  };

  const { data: demos } = useQuery({
    queryKey: ["demos-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("demos")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (demoData: any) => {
      const payload = {
        ...demoData,
        key_features: demoData.key_features.split("\n").filter((f: string) => f.trim()),
      };

      if (editingDemo) {
        const { error } = await supabase
          .from("demos")
          .update(payload)
          .eq("id", editingDemo.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("demos").insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["demos-admin"] });
      queryClient.invalidateQueries({ queryKey: ["demos"] });
      toast({
        title: editingDemo ? "Demo Updated" : "Demo Created",
        description: `Demo has been ${editingDemo ? "updated" : "created"} successfully.`,
      });
      resetForm();
      setIsDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("demos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["demos-admin"] });
      queryClient.invalidateQueries({ queryKey: ["demos"] });
      toast({ title: "Deleted", description: "Demo has been deleted." });
    },
  });

  const resetForm = () => {
    setFormData({
      project_name: "",
      category: "",
      description: "",
      key_features: "",
      demo_url: "",
      preview_image: "",
      is_featured: false,
      is_published: true,
      display_order: 0,
    });
    setEditingDemo(null);
  };

  const handleEdit = (demo: any) => {
    setEditingDemo(demo);
    setFormData({
      ...demo,
      key_features: demo.key_features.join("\n"),
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="border-b glass-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/secret/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">
              Manage <span className="text-gradient">Demos</span>
            </h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Demo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingDemo ? "Edit" : "Add"} Demo</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Project Name</label>
                  <Input
                    required
                    value={formData.project_name}
                    onChange={(e) =>
                      setFormData({ ...formData, project_name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Landing Pages">Landing Pages</SelectItem>
                      <SelectItem value="Admin Panels">Admin Panels</SelectItem>
                      <SelectItem value="E-commerce">E-commerce</SelectItem>
                      <SelectItem value="Web Applications">Web Applications</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Key Features (one per line)
                  </label>
                  <Textarea
                    required
                    rows={4}
                    value={formData.key_features}
                    onChange={(e) =>
                      setFormData({ ...formData, key_features: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Demo URL</label>
                  <Input
                    required
                    value={formData.demo_url}
                    onChange={(e) =>
                      setFormData({ ...formData, demo_url: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Preview Image URL</label>
                  <Input
                    required
                    value={formData.preview_image}
                    onChange={(e) =>
                      setFormData({ ...formData, preview_image: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Display Order</label>
                  <Input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        display_order: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, is_featured: checked as boolean })
                    }
                  />
                  <label htmlFor="featured" className="text-sm font-medium">
                    Featured
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, is_published: checked as boolean })
                    }
                  />
                  <label htmlFor="published" className="text-sm font-medium">
                    Published
                  </label>
                </div>
                <Button type="submit" className="w-full gradient-primary">
                  {editingDemo ? "Update" : "Create"} Demo
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos?.map((demo) => (
            <div key={demo.id} className="glass-card rounded-2xl overflow-hidden">
              <img
                src={demo.preview_image}
                alt={demo.project_name}
                className="w-full aspect-video object-cover"
              />
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">{demo.project_name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {demo.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{demo.description}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(demo)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteMutation.mutate(demo.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDemos;
