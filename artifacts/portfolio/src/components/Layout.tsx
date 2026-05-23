import { ReactNode, useState, useEffect } from "react";
import { FloatingNav } from "./FloatingNav";
import { CustomCursor } from "./CustomCursor";
import { useTranslation } from "@/context/TranslationContext";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Globe } from "lucide-react";

export function Layout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { lang, setLang, t } = useTranslation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-mono font-bold text-primary mb-4 tracking-tighter"
            >
              RK_OS_V1
            </motion.div>
            <div className="w-64 h-1 bg-muted overflow-hidden rounded-full relative">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-sm font-mono text-muted-foreground uppercase tracking-widest"
            >
              {t("terminal.init")}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Top controls */}
            <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
              <button
                onClick={() => setLang(lang === "fr" ? "en" : "fr")}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-card border border-card-border hover:border-primary/50 transition-colors text-sm font-medium"
              >
                <Globe className="w-4 h-4" />
                <span>{lang.toUpperCase()}</span>
              </button>
              
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-card-border hover:border-primary/50 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            </div>

            <main className="pb-32 pt-20 px-6 max-w-7xl mx-auto">
              {children}
            </main>
            <FloatingNav />
            
            <div className="fixed bottom-6 right-6 z-40 text-xs font-mono text-muted-foreground">
              Créé au Bénin 🌍
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
