import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Home, Layers, Cpu, Clock, Send, Briefcase, FlaskConical, Terminal } from "lucide-react";
import { useTranslation } from "@/context/TranslationContext";

const links = [
  { href: "/", icon: Home, labelFr: "Accueil", labelEn: "Home" },
  { href: "/projects", icon: Layers, labelFr: "Projets", labelEn: "Projects" },
  { href: "/skills", icon: Cpu, labelFr: "Skills", labelEn: "Skills" },
  { href: "/experience", icon: Clock, labelFr: "Parcours", labelEn: "Timeline" },
  { href: "/hire", icon: Briefcase, labelFr: "Services", labelEn: "Hire" },
  { href: "/contact", icon: Send, labelFr: "Contact", labelEn: "Contact" },
  { href: "/explore", icon: FlaskConical, labelFr: "Labo", labelEn: "Lab" },
  { href: "/ai-mode", icon: Terminal, labelFr: "Terminal", labelEn: "Terminal" },
];

export function FloatingNav() {
  const [location] = useLocation();
  const { lang } = useTranslation();

  return (
    <motion.nav
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 flex items-center gap-1 p-1.5 rounded-2xl border border-border/60 backdrop-blur-2xl bg-background/70 shadow-2xl shadow-black/20"
      initial={{ y: 80, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 24 }}
    >
      {links.map((link) => {
        const isActive = location === link.href;
        const Icon = link.icon;
        const label = lang === "fr" ? link.labelFr : link.labelEn;

        return (
          <Link key={link.href} href={link.href}>
            <motion.div
              data-testid={`nav-${link.href.replace("/", "") || "home"}`}
              className="relative flex flex-col items-center justify-center group"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div
                className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navBg"
                    className="absolute inset-0 bg-primary rounded-xl shadow-[0_0_20px_rgba(255,120,0,0.4)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10" />
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 px-2 py-1 rounded-lg bg-foreground text-background text-[10px] font-mono tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-150 pointer-events-none">
                {label}
              </div>
            </motion.div>
          </Link>
        );
      })}
    </motion.nav>
  );
}
