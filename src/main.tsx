import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";

console.log("[Main] Starting RapidFlow Labs application...");
console.log("[Main] Environment:", import.meta.env.MODE);

try {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    console.error("[Main] CRITICAL: Root element not found!");
    throw new Error("Root element not found. Cannot mount React application.");
  }

  console.log("[Main] Root element found, creating React root...");

  const root = createRoot(rootElement);

  console.log("[Main] Rendering application with providers...");

  root.render(
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );

  console.log("[Main] Application rendered successfully!");
} catch (error) {
  console.error("[Main] FATAL ERROR during application initialization:", error);

  // Display user-friendly error message
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; background-color: #1a1625; color: #fff; font-family: system-ui, -apple-system, sans-serif">
        <div style="max-width: 600px; padding: 2rem; background-color: rgba(255, 255, 255, 0.05); border-radius: 1rem; border: 1px solid rgba(255, 255, 255, 0.1)">
          <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem; background: linear-gradient(to right, #9b87f5, #7dd3fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Failed to Load Application
          </h1>
          <p style="margin-bottom: 1.5rem; color: rgba(255, 255, 255, 0.7); line-height: 1.6">
            We encountered a critical error while loading the application. Please try refreshing the page.
          </p>
          <pre style="overflow: auto; padding: 1rem; background-color: rgba(0, 0, 0, 0.2); border-radius: 0.5rem; font-size: 0.75rem; color: rgba(255, 255, 255, 0.6)">
${error instanceof Error ? error.message + '\n' + error.stack : String(error)}
          </pre>
          <button onclick="window.location.reload()" style="margin-top: 1.5rem; padding: 0.75rem 1.5rem; background: linear-gradient(to right, #9b87f5, #7dd3fc); border: none; border-radius: 0.5rem; color: #fff; font-weight: 600; cursor: pointer; font-size: 1rem">
            Reload Page
          </button>
        </div>
      </div>
    `;
  }
}
