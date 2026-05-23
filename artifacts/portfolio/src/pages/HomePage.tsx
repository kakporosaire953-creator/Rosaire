import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { useTranslation } from "@/context/TranslationContext";
import { Link } from "wouter";
import { ArrowRight, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

export function HomePage() {
  const { t } = useTranslation();
  const [typedText, setTypedText] = useState("");
  const fullText = "> system.initialize();\n> loading african_futurism_module...\n> identity_confirmed: ROSAIRE KAKPO";

  useEffect(() => {
    let current = "";
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        current += fullText[i];
        setTypedText(current);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center relative overflow-hidden">
        
        {/* Background visual element */}
        <div className="absolute inset-0 z-[-1] flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-[800px] h-[800px] rounded-full border border-primary/20 animate-spin-slow [animation-duration:30s]" />
          <div className="absolute w-[600px] h-[600px] rounded-full border border-secondary/20 animate-spin-slow [animation-direction:reverse] [animation-duration:20s]" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-primary/30 animate-pulse" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-6 font-mono text-sm text-secondary bg-secondary/10 px-4 py-2 rounded-full inline-block border border-secondary/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            {t("home.subtitle")}
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground/80 to-primary/50 glitch-wrapper">
            <span className="glitch" data-text="ROSAIRE KAKPO">ROSAIRE KAKPO</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("home.description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/projects" className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full overflow-hidden w-full sm:w-auto text-center shadow-[0_0_20px_rgba(234,107,0,0.4)] hover:shadow-[0_0_30px_rgba(234,107,0,0.6)] transition-all duration-300">
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t("home.cta.projects")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </Link>
            
            <Link href="/contact" className="group px-8 py-4 bg-card text-foreground font-bold rounded-full border border-card-border hover:border-primary/50 transition-colors w-full sm:w-auto text-center">
              {t("home.cta.contact")}
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 border-t border-border pt-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-black text-primary mb-1">5+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{t("home.stats.projects")}</div>
            </div>
            <div>
              <div className="text-3xl font-black text-secondary mb-1">1</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{t("home.stats.delivered")}</div>
            </div>
            <div>
              <div className="text-3xl font-black text-foreground mb-1">3 <span className="text-lg">{t("home.stats.weeks")}</span></div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{t("home.stats.delay")}</div>
            </div>
          </div>
        </motion.div>

        {/* Terminal decorative element */}
        <motion.div 
          className="absolute bottom-10 left-10 hidden lg:block text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="bg-black/50 backdrop-blur-md border border-border p-4 rounded-lg font-mono text-xs text-primary/80 max-w-xs shadow-2xl">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50">
              <Terminal className="w-4 h-4" />
              <span>terminal_log</span>
            </div>
            <pre className="whitespace-pre-wrap">{typedText}</pre>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
