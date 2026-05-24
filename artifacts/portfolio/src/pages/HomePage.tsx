import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { Logo } from "@/components/Logo";
import { useTranslation } from "@/context/TranslationContext";

const ROLES_FR = [
  "Développeur Frontend",
  "Créateur d'Expériences IA",
  "Architecte E-commerce",
  "Digital Product Builder",
];
const ROLES_EN = [
  "Frontend Developer",
  "AI Experience Creator",
  "E-commerce Architect",
  "Digital Product Builder",
];

function TypingRole({ roles }: { roles: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = roles[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (charIdx < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        }, 52);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        }, 28);
      } else {
        setDeleting(false);
        setIdx(i => (i + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, roles]);

  return (
    <span>
      {displayed}
      <span className="blink text-primary">|</span>
    </span>
  );
}

export function HomePage() {
  const { lang } = useTranslation();
  const roles = lang === "fr" ? ROLES_FR : ROLES_EN;

  const description = lang === "fr"
    ? "Je crée des expériences digitales futuristes et des écosystèmes e-commerce premium pensés pour la nouvelle génération d'innovation africaine."
    : "I craft futuristic digital experiences and premium e-commerce ecosystems designed for the next generation of African innovation.";

  const ctaProjects = lang === "fr" ? "Voir mes projets" : "View projects";
  const ctaContact  = lang === "fr" ? "Me contacter"   : "Get in touch";
  const available   = lang === "fr" ? "Disponible pour missions freelance" : "Available for freelance projects";
  const scrollText  = lang === "fr" ? "Défiler" : "Scroll";

  const stats = [
    { value: "5+",    label: lang === "fr" ? "Projets"      : "Projects"     },
    { value: "3 sem.", label: lang === "fr" ? "Délai moyen" : "Avg. delivery" },
    { value: "100%",  label: lang === "fr" ? "Passion"      : "Passion"       },
  ];

  return (
    <PageTransition>
      <section className="relative min-h-[calc(100vh-56px)] flex flex-col overflow-hidden">

        {/* Ambient glows */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] ambient-orb bg-primary pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full filter blur-[100px] opacity-[0.07] bg-secondary pointer-events-none" />

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-bg pointer-events-none" />

        {/* Main hero */}
        <div className="relative z-10 flex-1 flex items-center px-4 sm:px-6 md:px-12 lg:px-20 pt-4 md:pt-0">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-20 items-center">

              {/* ── Left column ── */}
              <div>
                {/* Available badge */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-2 mb-8"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
                  <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                    {available}
                  </span>
                </motion.div>

                {/* Name — Bricolage Grotesque at max weight */}
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-display leading-none tracking-tighter text-foreground mb-4 md:mb-6"
                  style={{ fontSize: "clamp(2.6rem,9vw,7.5rem)", fontWeight: 800 }}
                >
                  ROSAIRE
                  <br />
                  <span className="gradient-text-gold">KAKPO</span>
                </motion.h1>

                {/* Typing role */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-mono text-base md:text-lg text-primary/90 mb-5 h-7"
                >
                  <TypingRole roles={roles} />
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-10"
                >
                  {description}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-3 mb-8 md:mb-16"
                >
                  <Link href="/projects">
                    <motion.div
                      data-testid="cta-projects"
                      className="group flex items-center gap-2.5 px-6 py-3.5 bg-primary text-primary-foreground font-display font-bold rounded-xl shadow-[0_0_30px_rgba(255,110,0,0.3)] hover:shadow-[0_0_50px_rgba(255,110,0,0.5)] transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ fontWeight: 700 }}
                    >
                      {ctaProjects}
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.div>
                  </Link>

                  <Link href="/contact">
                    <motion.div
                      data-testid="cta-contact"
                      className="group flex items-center gap-2.5 px-6 py-3.5 border border-border/80 hover:border-primary/60 hover:bg-primary/5 font-display font-medium rounded-xl transition-all duration-300 cursor-pointer text-foreground"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {ctaContact}
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  className="flex items-center gap-4 sm:gap-8 pt-6 border-t border-border/40"
                >
                  {stats.map((stat, i) => (
                    <div key={i}>
                      <div className="font-display font-extrabold text-2xl text-foreground">{stat.value}</div>
                      <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* ── Right column — Photo Rosaire ── */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="hidden lg:flex items-end justify-center"
              >
                <div className="relative">
                  {/* Glow ambiant derrière la photo */}
                  <div
                    className="absolute -inset-8 rounded-full opacity-30 blur-3xl pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 60% 80%, hsl(28,96%,54%) 0%, transparent 70%)" }}
                  />

                  {/* Ligne décorative verticale */}
                  <div className="absolute left-0 top-8 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

                  {/* Étiquette flottante haut */}
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="absolute -top-3 left-8 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-background/80 backdrop-blur-sm shadow-lg"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot" />
                    <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">Cotonou, Bénin</span>
                  </motion.div>

                  {/* Photo principale */}
                  <motion.img
                    src="/assets/rosaire-hero.png"
                    alt="Rosaire KAKPO — Frontend Developer"
                    className="relative z-10 w-[320px] xl:w-[380px] object-contain drop-shadow-2xl"
                    style={{
                      filter: "drop-shadow(0 24px 60px rgba(255,110,0,0.20)) drop-shadow(0 4px 20px rgba(0,0,0,0.5))",
                      maxHeight: "520px",
                    }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />

                  {/* Badge RK.OS version flottant bas-droite */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                    className="absolute bottom-4 -right-4 z-20 flex items-center gap-2 px-3 py-2 rounded-xl border border-border/50 bg-background/90 backdrop-blur-sm shadow-xl"
                  >
                    <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center">
                      <span className="font-mono text-[9px] text-primary font-bold">RK</span>
                    </div>
                    <div>
                      <div className="font-display font-bold text-xs text-foreground leading-none">v2.0</div>
                      <div className="font-mono text-[9px] text-muted-foreground leading-none mt-0.5">African Futurism</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-2 pb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">{scrollText}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground animate-bounce" />
        </motion.div>
      </section>
    </PageTransition>
  );
}
