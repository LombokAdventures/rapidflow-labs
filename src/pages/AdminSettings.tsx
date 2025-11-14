import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AdminSettings = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/secret/admin/login");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="border-b glass-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/secret/admin/dashboard"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button></Link>
            <h1 className="text-2xl font-bold">Company <span className="text-gradient">Settings</span></h1>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-muted-foreground">Edit company info via backend database.</p>
      </div>
    </div>
  );
};

export default AdminSettings;
