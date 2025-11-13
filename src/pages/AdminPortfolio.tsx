import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

const AdminPortfolio = () => {
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects } = useQuery({
    queryKey: ["admin-portfolio"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
      toast({ title: "Project deleted successfully" });
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      let thumbnailUrl = data.thumbnail_url;

      if (thumbnailFile) {
        setUploading(true);
        const fileExt = thumbnailFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('project-screenshots')
          .upload(fileName, thumbnailFile);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('project-screenshots')
          .getPublicUrl(fileName);
        
        thumbnailUrl = publicUrl;
        setUploading(false);
      }

      const projectData = {
        ...data,
        thumbnail_url: thumbnailUrl,
        features: data.features ? data.features.split('\n').filter((f: string) => f.trim()) : []
      };

      if (editingProject?.id) {
        const { error } = await supabase
          .from("portfolio_projects")
          .update(projectData)
          .eq("id", editingProject.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("portfolio_projects")
          .insert([projectData]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
      toast({ title: editingProject?.id ? "Project updated" : "Project added" });
      setEditingProject(null);
      setFormData({});
      setThumbnailFile(null);
    },
  });

  const openEditDialog = (project: any = null) => {
    setEditingProject(project || {});
    setFormData(project ? {
      ...project,
      features: project.features?.join('\n') || ''
    } : {
      display_order: (projects?.length || 0) + 1,
      is_published: true
    });
    setThumbnailFile(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Portfolio Projects</h2>
        <Button onClick={() => openEditDialog()} className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Delivery</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                <img src={project.thumbnail_url} alt={project.project_name} className="w-16 h-10 rounded object-cover" />
              </TableCell>
              <TableCell className="font-medium">{project.project_name}</TableCell>
              <TableCell>{project.category}</TableCell>
              <TableCell>{project.delivery_time}</TableCell>
              <TableCell>{project.is_published ? "Yes" : "No"}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openEditDialog(project)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(project.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject?.id ? "Edit" : "Add"} Portfolio Project</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveMutation.mutate(formData);
            }}
            className="space-y-4"
          >
            <div>
              <Label>Thumbnail</Label>
              <div className="flex items-center gap-4 mt-2">
                {(thumbnailFile || formData.thumbnail_url) && (
                  <img 
                    src={thumbnailFile ? URL.createObjectURL(thumbnailFile) : formData.thumbnail_url} 
                    alt="Preview" 
                    className="w-32 h-20 rounded object-cover"
                  />
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label>Project Name *</Label>
              <Input
                required
                value={formData.project_name || ""}
                onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
              />
            </div>
            <div>
              <Label>Category *</Label>
              <Input
                required
                value={formData.category || ""}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Landing Page, Admin Panel, Web App, etc."
              />
            </div>
            <div>
              <Label>Description *</Label>
              <Textarea
                required
                rows={3}
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <Label>Demo URL *</Label>
              <Input
                required
                value={formData.demo_url || ""}
                onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
            <div>
              <Label>Delivery Time *</Label>
              <Input
                required
                value={formData.delivery_time || ""}
                onChange={(e) => setFormData({ ...formData, delivery_time: e.target.value })}
                placeholder="2 days, 1 week, etc."
              />
            </div>
            <div>
              <Label>Features (one per line)</Label>
              <Textarea
                rows={4}
                value={formData.features || ""}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Responsive design&#10;Custom animations&#10;SEO optimized"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.is_published || false}
                onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
              />
              <Label>Published</Label>
            </div>
            <div>
              <Label>Display Order</Label>
              <Input
                type="number"
                value={formData.display_order || 0}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setEditingProject(null)}>
                Cancel
              </Button>
              <Button type="submit" className="gradient-primary" disabled={uploading}>
                {uploading ? "Uploading..." : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPortfolio;
