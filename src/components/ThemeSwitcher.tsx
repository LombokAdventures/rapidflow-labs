import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "./ui/button";
import { Moon, Sun, Sparkles } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      code: "light",
      icon: Sun,
      name: "Light",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      code: "dark",
      icon: Moon,
      name: "Dark",
      gradient: "from-blue-700 to-indigo-700",
    },
  ];

  return (
    <div className="fixed top-20 right-6 z-50 glass-card px-3 py-2 rounded-full">
      <div className="flex gap-1">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          return (
            <Button
              key={themeOption.code}
              variant="ghost"
              size="sm"
              onClick={() => setTheme(themeOption.code as any)}
              className={`px-3 py-2 rounded-full transition-all relative group ${
                theme === themeOption.code
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "hover:bg-primary/20"
              }`}
              title={themeOption.name}
            >
              <Icon className="w-4 h-4" />
              {theme === themeOption.code && (
                <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${themeOption.gradient} opacity-20 animate-pulse`} />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
