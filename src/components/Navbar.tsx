import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="font-bold text-xl">WebAgency</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("team")} className="text-foreground hover:text-primary transition-colors">
              Team
            </button>
            <button onClick={() => scrollToSection("services")} className="text-foreground hover:text-primary transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection("portfolio")} className="text-foreground hover:text-primary transition-colors">
              Portfolio
            </button>
            <button onClick={() => scrollToSection("process")} className="text-foreground hover:text-primary transition-colors">
              Process
            </button>
            <button onClick={() => scrollToSection("reviews")} className="text-foreground hover:text-primary transition-colors">
              Reviews
            </button>
            <Button onClick={() => scrollToSection("contact")} className="gradient-primary glow-primary">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <button onClick={() => scrollToSection("team")} className="block w-full text-left px-4 py-2 hover:bg-muted rounded-lg">
              Team
            </button>
            <button onClick={() => scrollToSection("services")} className="block w-full text-left px-4 py-2 hover:bg-muted rounded-lg">
              Services
            </button>
            <button onClick={() => scrollToSection("portfolio")} className="block w-full text-left px-4 py-2 hover:bg-muted rounded-lg">
              Portfolio
            </button>
            <button onClick={() => scrollToSection("process")} className="block w-full text-left px-4 py-2 hover:bg-muted rounded-lg">
              Process
            </button>
            <button onClick={() => scrollToSection("reviews")} className="block w-full text-left px-4 py-2 hover:bg-muted rounded-lg">
              Reviews
            </button>
            <Button onClick={() => scrollToSection("contact")} className="w-full gradient-primary glow-primary">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
