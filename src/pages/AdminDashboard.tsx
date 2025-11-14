import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { LogOut, MessageSquare, Star, FolderKanban, Settings, Briefcase, Layout, Users, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/secret/admin");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate("/secret/admin");
  };

  const { data: inquiriesCount } = useQuery({
    queryKey: ["inquiries-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("contact_inquiries")
        .select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: pendingReviewsCount } = useQuery({
    queryKey: ["pending-reviews-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("reviews")
        .select("*", { count: "exact", head: true })
        .eq("is_approved", false);
      return count || 0;
    },
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="border-b glass-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Admin <span className="text-gradient">Dashboard</span>
          </h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Total Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">{inquiriesCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-secondary">{pendingReviewsCount}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/secret/admin/inquiries">
            <Card className="hover:scale-105 transition-transform cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Inquiries</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Manage contact form submissions
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/secret/admin/demos">
            <Card className="hover:scale-105 transition-transform cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                    <FolderKanban className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Demos</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Add and manage portfolio demos
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/secret/admin/reviews">
            <Card className="hover:scale-105 transition-transform cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Reviews</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Approve and manage reviews
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/secret/admin/services">
            <Card className="hover:scale-105 transition-transform cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Services</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Manage service offerings
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/secret/admin/portfolio">
            <Card className="hover:scale-105 transition-transform cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Portfolio</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Manage portfolio projects
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/secret/admin/templates">
            <Card className="hover:scale-105 transition-transform cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                    <Layout className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Templates</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Manage service templates
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/secret/admin/team">
            <Card className="hover:scale-105 transition-transform cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Team Members</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Manage team members
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/secret/admin/settings">
            <Card className="hover:scale-105 transition-transform cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Update company information
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
