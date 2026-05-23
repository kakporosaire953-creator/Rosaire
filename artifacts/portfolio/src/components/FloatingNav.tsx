import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  Home, 
  Layers, 
  Cpu, 
  Clock, 
  Send, 
  Briefcase, 
  FlaskConical, 
  Terminal 
} from "lucide-react";
import { useTranslation } from "@/context/TranslationContext";

export function FloatingNav() {
  const [location] = useLocation();
  const { t } = useTranslation();

  const links = [
    { href: "/", icon: Home, label: "nav.home" },
    { href: "/projects", icon: Layers, label: "nav.projects" },
    { href: "/skills", icon: Cpu, label: "nav.skills" },
    { href: "/experience", icon: Clock, label: "nav.experience" },
    { href: "/hire", icon: Briefcase, label: "nav.hire" },
    { href: "/contact", icon: Send, label: "nav.contact" },
    { href: "/explore", icon: FlaskConical, label: "nav.explore" },
    { href: "/ai-mode", icon: Terminal, label: "nav.ai" },
  ];

  return (
    <motion.div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 rounded-full bg-background/50 backdrop-blur-xl border border-border shadow-2xl"
      initial={{ y: 100, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ delay: 1, type: "spring" }}
    >
      {links.map((link) => {
        const isActive = location === link.href;
        const Icon = link.icon;
        
        return (
          <Link key={link.href} href={link.href}>
            <div
              className={`relative flex items-center justify-center w-12 h-12 rounded-full cursor-pointer transition-colors ${
                isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-card"
              }`}
              data-testid={`nav-${link.href}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-primary rounded-full"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className="w-5 h-5 relative z-10" />
            </div>
          </Link>
        );
      })}
    </motion.div>
  );
}
