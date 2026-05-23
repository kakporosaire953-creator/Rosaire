import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulsePhase: number;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const scrollY = useRef(0);
  const [location] = useLocation();
  const locationRef = useRef(location);
  const ripples = useRef<{ x: number; y: number; r: number; maxR: number; alpha: number }[]>([]);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const clickRef = useRef<{ x: number; y: number; t: number } | null>(null);

  useEffect(() => {
    // Ripple on route change
    ripples.current.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      r: 0,
      maxR: Math.max(window.innerWidth, window.innerHeight) * 0.8,
      alpha: 0.5,
    });
    locationRef.current = location;
  }, [location]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      const count = Math.floor((window.innerWidth * window.innerHeight) / 14000);
      nodesRef.current = Array.from({ length: Math.min(count, 80) }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.8 + 0.8,
        pulsePhase: Math.random() * Math.PI * 2,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onScroll = () => { scrollY.current = window.scrollY; };
    const onClick = (e: MouseEvent) => {
      clickRef.current = { x: e.clientX, y: e.clientY, t: Date.now() };
      ripples.current.push({ x: e.clientX, y: e.clientY, r: 0, maxR: 200, alpha: 0.6 });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("click", onClick);

    let frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains("dark");
      const baseNodeAlpha = isDark ? 0.5 : 0.3;
      const baseLineAlpha = isDark ? 0.12 : 0.08;
      const primaryR = isDark ? 255 : 220;
      const primaryG = isDark ? 110 : 80;
      const primaryB = 20;

      const nodes = nodesRef.current;
      const t = frame * 0.01;

      // Update nodes
      for (const n of nodes) {
        // Scroll influence
        n.y -= scrollY.current * 0.0003;

        n.x += n.vx;
        n.y += n.vy;

        // Wrap around
        if (n.x < -20) n.x = canvas.width + 20;
        if (n.x > canvas.width + 20) n.x = -20;
        if (n.y < -20) n.y = canvas.height + 20;
        if (n.y > canvas.height + 20) n.y = -20;

        // Mouse repulsion/attraction
        const dx = n.x - mouse.current.x;
        const dy = n.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150;
          n.vx += (dx / dist) * force * 0.04;
          n.vy += (dy / dist) * force * 0.04;
        }

        // Damping
        n.vx *= 0.99;
        n.vy *= 0.99;
        // Restore original speed
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > 0.6) { n.vx *= 0.95; n.vy *= 0.95; }
        if (speed < 0.05) { n.vx += (Math.random() - 0.5) * 0.02; n.vy += (Math.random() - 0.5) * 0.02; }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;
          if (d < maxDist) {
            const alpha = baseLineAlpha * (1 - d / maxDist);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${primaryR},${primaryG},${primaryB},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }

        // Draw node
        const pulse = Math.sin(t * 2 + nodes[i].pulsePhase) * 0.3 + 0.7;
        const alpha = baseNodeAlpha * pulse;
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryR},${primaryG},${primaryB},${alpha})`;
        ctx.fill();
      }

      // Draw mouse glow connection
      for (const n of nodes) {
        const dx = n.x - mouse.current.x;
        const dy = n.y - mouse.current.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 180) {
          ctx.beginPath();
          const g = ctx.createLinearGradient(mouse.current.x, mouse.current.y, n.x, n.y);
          g.addColorStop(0, `rgba(${primaryR},${primaryG},${primaryB},0.25)`);
          g.addColorStop(1, `rgba(${primaryR},${primaryG},${primaryB},0)`);
          ctx.strokeStyle = g;
          ctx.lineWidth = 1;
          ctx.moveTo(mouse.current.x, mouse.current.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }

      // Draw ripples
      ripples.current = ripples.current.filter(rp => {
        rp.r += 4;
        rp.alpha *= 0.96;
        if (rp.alpha < 0.01 || rp.r > rp.maxR) return false;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${primaryR},${primaryG},${primaryB},${rp.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        return true;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.85 }}
    />
  );
}
