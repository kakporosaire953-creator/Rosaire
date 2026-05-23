import { ReactNode, useState, useEffect } from "react";
import { FloatingNav } from "./FloatingNav";
import { CustomCursor } from "./CustomCursor";
import { useTranslation } from "@/context/TranslationContext";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Globe } from "lucide-react";
import { useLocation } from "wouter";

const BOOT_LINES = [
  "Initialisation RK_OS v2.0...",
  "Chargement african_futurism.module...",
  "Connexion aux systèmes créatifs...",
  "Identité confirmée : ROSAIRE KAKPO",
  "Prêt.",
];

const BOOT_LINES_EN = [
  "Initializing RK_OS v2.0...",
  "Loading african_futurism.module...",
  "Connecting to creative systems...",
  "Identity confirmed: ROSAIRE KAKPO",
  "Ready.",
];

export function Layout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const { lang, setLang } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();

  const lines = lang === "fr" ? BOOT_LINES : BOOT_LINES_EN;

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < lines.length) {
        setBootLines(prev => [...prev, lines[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 600);
      }
    }, 320);
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
    <div className="relative min-h-screen w-full bg-background text-foreground selection:bg-primary/20 selection:text-foreground">
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 font-display font-extrabold text-5xl tracking-tighter text-foreground"
            >
              RK
              <span className="text-primary">.</span>
            </motion.div>

            <div className="font-mono text-xs space-y-2 text-left w-72 mb-10">
              {bootLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={i === bootLines.length - 1 ? "text-primary" : "text-muted-foreground"}
                >
                  <span className="text-primary/50 mr-2">›</span>{line}
                </motion.div>
              ))}
              <span className="inline-block w-2 h-3 bg-primary blink ml-4" />
            </div>

            <div className="w-72 h-px bg-card-border overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
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
            {/* Top bar */}
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 border-b border-border/30 backdrop-blur-xl bg-background/60">
              <div className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                RK_OS — <span className="text-primary">{routeLabel[location] ?? "—"}</span>
              </div>

              <div className="flex items-center gap-3">
                {/* Lang toggle */}
                <button
                  data-testid="btn-lang-toggle"
                  onClick={() => setLang(lang === "fr" ? "en" : "fr")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 font-mono text-xs text-muted-foreground hover:text-foreground"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{lang.toUpperCase()}</span>
                </button>

                {/* Theme toggle */}
                <button
                  data-testid="btn-theme-toggle"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-muted-foreground hover:text-foreground"
                >
                  {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                </button>
              </div>
            </header>

            {/* Main content */}
            <main className="pt-14">
              {children}
            </main>

            <FloatingNav />

            {/* Made in Benin badge */}
            <div className="fixed bottom-5 right-5 z-40 hidden md:flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/40 tracking-widest uppercase hover:text-muted-foreground transition-colors">
              <span className="w-1 h-1 rounded-full bg-primary/40 pulse-dot" />
              Créé au Bénin
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
