import { ReactNode, useState, useEffect } from "react";
import { FloatingNav } from "./FloatingNav";
import { CustomCursor } from "./CustomCursor";
import { NeuralBackground } from "./NeuralBackground";
import { AIAssistant } from "./AIAssistant";
import { Logo } from "./Logo";
import { useTranslation } from "@/context/TranslationContext";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Globe } from "lucide-react";
import { useLocation } from "wouter";

const BOOT_LINES_FR = [
  "RK_OS v2.0 — AFRICAN FUTURISM EDITION",
  "Chargement african_futurism.module...",
  "Connexion réseau neural — [OK]",
  "Identité confirmée : ROSAIRE KAKPO",
  "Prêt.",
];

const BOOT_LINES_EN = [
  "RK_OS v2.0 — AFRICAN FUTURISM EDITION",
  "Loading african_futurism.module...",
  "Neural network connected — [OK]",
  "Identity confirmed: ROSAIRE KAKPO",
  "Ready.",
];

export function Layout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const { lang, setLang } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();

  const lines = lang === "fr" ? BOOT_LINES_FR : BOOT_LINES_EN;

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < lines.length) {
        setBootLines(prev => [...prev, lines[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 400);
      }
    }, 280);
    return () => clearInterval(interval);
  }, []);

  const routeLabel: Record<string, string> = {
    "/": "HOME",
    "/projects": "PROJECTS",
    "/skills": "SKILLS",
    "/experience": "EXPERIENCE",
    "/contact": "CONTACT",
    "/hire": "HIRE",
    "/explore": "EXPLORE",
    "/ai-mode": "AI_MODE",
  };

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground">
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
            exit={{ opacity: 0, filter: "blur(16px)", scale: 1.05 }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Scan lines */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(255,110,0,0.04) 28px, rgba(255,110,0,0.04) 29px)`,
              }}
            />

            {/* Logo centered */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-10"
            >
              <Logo size="xl" showWordmark={false} />
            </motion.div>

            {/* Boot lines */}
            <div className="font-mono text-xs space-y-2 text-left w-80 mb-10">
              {bootLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={i === bootLines.length - 1 ? "text-primary" : "text-muted-foreground"}
                >
                  <span className="text-primary/40 mr-2">›</span>{line}
                </motion.div>
              ))}
              <span className="inline-block w-2 h-3.5 bg-primary blink ml-5" />
            </div>

            {/* Progress bar */}
            <div className="w-80 h-px bg-border/30 overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Global neural network canvas */}
            <NeuralBackground />

            {/* Top bar */}
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 py-3 border-b border-border/20 backdrop-blur-xl bg-background/60">
              <Logo size="sm" showWordmark={true} />

              <div className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                <span className="text-primary/40 hidden sm:block">—</span>
                <span className="hidden sm:block tracking-widest uppercase">
                  {routeLabel[location] ?? ""}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  data-testid="btn-lang-toggle"
                  onClick={() => setLang(lang === "fr" ? "en" : "fr")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 font-mono text-xs text-muted-foreground hover:text-foreground"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {lang.toUpperCase()}
                </button>

                <button
                  data-testid="btn-theme-toggle"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-muted-foreground hover:text-foreground"
                >
                  {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                </button>
              </div>
            </header>

            <main className="pt-14 relative z-10">
              {children}
            </main>

            <FloatingNav />
            <AIAssistant />

            <div className="fixed bottom-5 right-5 z-40 hidden md:flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/30 tracking-widest uppercase">
              <span className="w-1 h-1 rounded-full bg-primary/40 pulse-dot" />
              Créé au Bénin
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
