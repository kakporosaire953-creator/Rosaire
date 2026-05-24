import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Home, Layers, Cpu, Clock, Send, Briefcase, FlaskConical, Terminal, Trophy, Images } from "lucide-react";
import { useTranslation } from "@/context/TranslationContext";

const links = [
  { href: "/",            icon: Home,         labelFr: "Accueil",    labelEn: "Home"       },
  { href: "/projects",    icon: Layers,       labelFr: "Projets",    labelEn: "Projects"   },
  { href: "/skills",      icon: Cpu,          labelFr: "Skills",     labelEn: "Skills"     },
  { href: "/experience",  icon: Clock,        labelFr: "Parcours",   labelEn: "Timeline"   },
  { href: "/hire",        icon: Briefcase,    labelFr: "Services",   labelEn: "Hire"       },
  { href: "/contact",     icon: Send,         labelFr: "Contact",    labelEn: "Contact"    },
  { href: "/hackathons",  icon: Trophy,       labelFr: "Hackathons", labelEn: "Hackathons" },
  { href: "/gallery",     icon: Images,       labelFr: "Galerie",    labelEn: "Gallery"    },
  { href: "/explore",     icon: FlaskConical, labelFr: "Labo",       labelEn: "Lab"        },
  { href: "/ai-mode",     icon: Terminal,     labelFr: "OS",         labelEn: "OS"         },
];

export function FloatingNav() {
  const [location] = useLocation();
  const { lang } = useTranslation();

  return (
    // Sur mobile : ancré left-3 right-3 → le premier item (Home) est toujours visible
    // Sur desktop (sm+) : centré avec left-1/2 -translate-x-1/2 et width automatique
    <motion.nav
      className="fixed bottom-4 z-50
        left-3 right-3
        sm:left-1/2 sm:right-auto sm:w-max sm:-translate-x-1/2
        flex items-center justify-center sm:justify-start
        gap-0.5 p-1
        rounded-2xl border border-border/60 backdrop-blur-2xl bg-background/80
        shadow-2xl shadow-black/30
        overflow-x-auto nav-no-scrollbar"
      style={{
        // Centrage desktop via CSS pur (pas Framer Motion x)
        // sur mobile, left-3/right-3 ancrent les bords
      } as React.CSSProperties}
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
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
              className="relative flex flex-col items-center justify-center group shrink-0"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div
                className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navBg"
                    className="absolute inset-0 bg-primary rounded-xl shadow-[0_0_14px_rgba(255,120,0,0.4)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10" />
              </div>

              {/* Tooltip — desktop uniquement */}
              <div className="hidden sm:block absolute bottom-full mb-2 px-2 py-1 rounded-lg bg-foreground text-background text-[10px] font-mono tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-150 pointer-events-none">
                {label}
              </div>
            </motion.div>
          </Link>
        );
      })}
    </motion.nav>
  );
}
