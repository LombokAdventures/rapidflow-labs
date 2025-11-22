import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem("theme");
      console.log("[ThemeProvider] Loading saved theme:", saved);
      const validTheme = (saved === "dark" || saved === "light") ? saved : "light";
      console.log("[ThemeProvider] Using theme:", validTheme);
      return validTheme;
    } catch (error) {
      console.error("[ThemeProvider] Error loading theme from localStorage:", error);
      return "light";
    }
  });

  useEffect(() => {
    try {
      console.log("[ThemeProvider] Applying theme:", theme);
      localStorage.setItem("theme", theme);

      // Remove all theme classes first
      document.documentElement.classList.remove("theme-dark", "theme-light");

      // Add the current theme class
      document.documentElement.classList.add(`theme-${theme}`);

      console.log("[ThemeProvider] Theme applied successfully. Document classes:", document.documentElement.className);
    } catch (error) {
      console.error("[ThemeProvider] Error applying theme:", error);
    }
  }, [theme]);

  // Apply initial theme immediately to prevent white flash
  useEffect(() => {
    try {
      console.log("[ThemeProvider] Initial mount - ensuring theme is applied");
      document.documentElement.classList.add(`theme-${theme}`);
    } catch (error) {
      console.error("[ThemeProvider] Error on initial mount:", error);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
