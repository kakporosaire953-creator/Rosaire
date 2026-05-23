import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { useTranslation } from "@/context/TranslationContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  r: number;
  hue: number;
}

export function ExplorePage() {
  const { lang } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000, down: false });
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const [mode, setMode] = useState<"flow" | "explode" | "orbit">("flow");
  const modeRef = useRef(mode);

  useEffect(() => { modeRef.current = mode; }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;

      if (modeRef.current === "flow") {
        for (let i = 0; i < 3; i++) {
          particles.current.push({
            x: mouse.current.x + (Math.random() - 0.5) * 20,
            y: mouse.current.y + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3 - 1,
            life: 1,
            maxLife: 80 + Math.random() * 40,
            r: Math.random() * 4 + 1,
            hue: 20 + Math.random() * 40,
          });
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      if (modeRef.current === "explode") {
        for (let i = 0; i < 40; i++) {
          const angle = (Math.PI * 2 * i) / 40;
          const speed = 2 + Math.random() * 5;
          particles.current.push({
            x: cx, y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1, maxLife: 60 + Math.random() * 40,
            r: Math.random() * 5 + 2,
            hue: Math.random() * 60 + 10,
          });
        }
      } else if (modeRef.current === "orbit") {
        for (let i = 0; i < 20; i++) {
          const angle = (Math.PI * 2 * i) / 20;
          particles.current.push({
            x: cx + Math.cos(angle) * 40,
            y: cy + Math.sin(angle) * 40,
            vx: -Math.sin(angle) * 2,
            vy: Math.cos(angle) * 2,
            life: 1, maxLife: 120,
            r: Math.random() * 3 + 1,
            hue: 190 + Math.random() * 30,
          });
        }
      }
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("click", onClick);

    const draw = () => {
      ctx.fillStyle = document.documentElement.classList.contains("dark")
        ? "rgba(10,10,10,0.15)"
        : "rgba(248,248,248,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.life = Math.max(0, p.life - 1 / p.maxLife);

        if (modeRef.current === "orbit") {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > 0) {
            p.vx += (-dy / d) * 0.15;
            p.vy += (dx / d) * 0.15;
            p.vx *= 0.98;
            p.vy *= 0.98;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 95%, 60%, ${p.life})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${p.hue}, 95%, 60%, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        return p.life > 0.01 && p.x > -50 && p.x < canvas.width + 50 && p.y > -50 && p.y < canvas.height + 50;
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  const title = lang === "fr" ? "Laboratoire" : "Lab";
  const subtitle = lang === "fr"
    ? "Un espace expérimental. Déplacez votre curseur, cliquez, explorez."
    : "An experimental space. Move your cursor, click, explore.";

  const modes: { key: typeof mode; labelFr: string; labelEn: string; hint: string }[] = [
    { key: "flow", labelFr: "Flux", labelEn: "Flow", hint: lang === "fr" ? "Glissez la souris" : "Slide mouse" },
    { key: "explode", labelFr: "Explosion", labelEn: "Explode", hint: lang === "fr" ? "Cliquez" : "Click" },
    { key: "orbit", labelFr: "Orbite", labelEn: "Orbit", hint: lang === "fr" ? "Cliquez + bougez" : "Click + move" },
  ];

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-56px)] px-6 md:px-12 lg:px-20 py-12 flex flex-col">
        <div className="max-w-7xl mx-auto w-full flex flex-col flex-1">

          {/* Header */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xs text-primary tracking-widest uppercase mb-3"
            >
              — {lang === "fr" ? "Expérimental" : "Experimental"}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display font-extrabold text-[clamp(2rem,5vw,4rem)] tracking-tighter text-foreground leading-none mb-3"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-sm"
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Mode selector */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-2 mb-5"
          >
            {modes.map(m => (
              <button
                key={m.key}
                data-testid={`mode-${m.key}`}
                onClick={() => setMode(m.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs transition-all duration-200 ${
                  mode === m.key
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(255,110,0,0.3)]"
                    : "border border-border/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang === "fr" ? m.labelFr : m.labelEn}
                <span className="opacity-60">— {m.hint}</span>
              </button>
            ))}
          </motion.div>

          {/* Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 relative border border-border/40 rounded-2xl overflow-hidden bg-background/40 min-h-[400px]"
            style={{ cursor: "crosshair" }}
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
            />
            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-muted-foreground/30 tracking-widest">
              {particles.current.length} {lang === "fr" ? "particules" : "particles"}
            </div>
            <div className="absolute top-4 left-4 font-mono text-[10px] text-muted-foreground/30 tracking-widest uppercase">
              RK_LAB — {mode.toUpperCase()}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
