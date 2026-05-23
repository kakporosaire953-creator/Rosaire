import { PageTransition } from "@/components/PageTransition";
import { useTranslation } from "@/context/TranslationContext";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function ExplorePage() {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 2 + 0.5;
        this.color = Math.random() > 0.5 ? '#EA6B00' : '#2563EB'; // Primary or Secondary
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;

        // Interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          const force = (100 - dist) / 100;
          this.vx -= (dx / dist) * force * 0.5;
          this.vy -= (dy / dist) * force * 0.5;
        }

        // Friction
        this.vx *= 0.99;
        this.vy *= 0.99;
        
        // Base movement return
        if(Math.abs(this.vx) < 0.2) this.vx += (Math.random() - 0.5) * 0.1;
        if(Math.abs(this.vy) < 0.2) this.vy += (Math.random() - 0.5) * 0.1;
      }

      draw() {
        if(!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const particleCount = (canvas.width * canvas.height) / 10000;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(234, 107, 0, ${0.2 - dist/500})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener("mouseleave", () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <PageTransition>
      <div className="py-12 min-h-[80vh] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2 uppercase font-mono">
            {t("explore.title")}
          </h1>
          <p className="text-muted-foreground font-mono text-sm">{t("explore.desc")}</p>
        </motion.div>

        <div className="flex-1 w-full bg-card rounded-3xl border border-card-border overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.2)]">
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full block cursor-crosshair"
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/20" />
        </div>
      </div>
    </PageTransition>
  );
}
