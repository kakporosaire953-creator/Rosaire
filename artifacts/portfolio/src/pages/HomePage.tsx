import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { useTranslation } from "@/context/TranslationContext";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);

    const COUNT = 60;
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
    }));

    const isDark = () => document.documentElement.classList.contains("dark");

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dark = isDark();
      const baseAlpha = dark ? 0.35 : 0.2;
      const lineAlpha = dark ? 0.08 : 0.06;

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x += (dx / dist) * 0.6;
          p.y += (dy / dist) * 0.6;
        }
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            ctx.beginPath();
            ctx.strokeStyle = dark
              ? `rgba(255,110,20,${lineAlpha * (1 - d / 140)})`
              : `rgba(200,80,0,${lineAlpha * (1 - d / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2);
        ctx.fillStyle = dark ? `rgba(255,110,20,${baseAlpha})` : `rgba(200,80,0,${baseAlpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

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
        }, 50);
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
  const { t, lang } = useTranslation();
  const roles = lang === "fr" ? ROLES_FR : ROLES_EN;

  const description = lang === "fr"
    ? "Je crée des expériences digitales futuristes et des écosystèmes e-commerce premium pensés pour la nouvelle génération d'innovation africaine."
    : "I craft futuristic digital experiences and premium e-commerce ecosystems designed for the next generation of African innovation.";

  const ctaProjects = lang === "fr" ? "Voir mes projets" : "View projects";
  const ctaContact = lang === "fr" ? "Me contacter" : "Get in touch";
  const availableText = lang === "fr" ? "Disponible pour missions freelance" : "Available for freelance projects";
  const scrollText = lang === "fr" ? "Défiler" : "Scroll";

  const stats = [
    { value: "5+", label: lang === "fr" ? "Projets" : "Projects" },
    { value: "1", label: lang === "fr" ? "Livré" : "Delivered" },
    { value: "3 sem.", label: lang === "fr" ? "Délai moyen" : "Avg. time" },
  ];

  return (
    <PageTransition>
      <section className="relative min-h-[calc(100vh-56px)] flex flex-col overflow-hidden">
        <ParticleCanvas />

        {/* Ambient glows */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] ambient-orb bg-primary" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] ambient-orb bg-secondary" style={{ opacity: 0.08 }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-bg" />

        {/* Main hero */}
        <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-20">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Left column */}
              <div>
                {/* Available badge */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="flex items-center gap-2 mb-8"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
                  <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                    {availableText}
                  </span>
                </motion.div>

                {/* Name */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-display text-[clamp(3.5rem,9vw,7.5rem)] font-extrabold leading-none tracking-tighter text-foreground mb-6"
                >
                  ROSAIRE
                  <br />
                  <span className="gradient-text-gold">KAKPO</span>
                </motion.h1>

                {/* Typing role */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="font-mono text-base md:text-lg text-primary/90 mb-5 h-7"
                >
                  <TypingRole roles={roles} />
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-10"
                >
                  {description}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex flex-wrap gap-4 mb-16"
                >
                  <Link href="/projects">
                    <motion.div
                      data-testid="cta-projects"
                      className="group flex items-center gap-2.5 px-6 py-3.5 bg-primary text-primary-foreground font-display font-bold rounded-xl shadow-[0_0_30px_rgba(255,110,0,0.3)] hover:shadow-[0_0_50px_rgba(255,110,0,0.5)] transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
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
                  transition={{ delay: 0.65, duration: 0.5 }}
                  className="flex items-center gap-8 pt-6 border-t border-border/40"
                >
                  {stats.map((stat, i) => (
                    <div key={i}>
                      <div className="font-display font-extrabold text-2xl text-foreground">{stat.value}</div>
                      <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right column – Abstract visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="hidden lg:flex items-center justify-center"
              >
                <div className="relative w-80 h-80">
                  {/* Outer hex ring */}
                  <div className="absolute inset-0 rounded-full border border-primary/10 animate-[spin_30s_linear_infinite]" />
                  <div className="absolute inset-6 rounded-full border border-secondary/10 animate-[spin_20s_linear_infinite_reverse]" />
                  <div className="absolute inset-12 rounded-full border border-primary/15 animate-[spin_15s_linear_infinite]" />

                  {/* Center card */}
                  <div className="absolute inset-16 rounded-2xl border border-border/60 bg-card backdrop-blur-xl flex flex-col items-center justify-center gap-3 shadow-2xl">
                    <div className="font-display font-extrabold text-3xl gradient-text-gold">RK</div>
                    <div className="font-mono text-[10px] text-muted-foreground tracking-widest text-center">
                      BÉNIN
                      <br />
                      AFRICA
                    </div>
                    <div className="w-8 h-px bg-primary/40" />
                    <div className="font-mono text-[9px] text-primary/60">v2.0</div>
                  </div>

                  {/* Orbiting dots */}
                  {[0, 60, 120, 180, 240, 300].map((deg) => (
                    <div
                      key={deg}
                      className="absolute w-2 h-2 rounded-full bg-primary/50"
                      style={{
                        top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 128}px - 4px)`,
                        left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 128}px - 4px)`,
                      }}
                    />
                  ))}
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
          transition={{ delay: 1, duration: 0.6 }}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">{scrollText}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground animate-bounce" />
        </motion.div>
      </section>
    </PageTransition>
  );
}
