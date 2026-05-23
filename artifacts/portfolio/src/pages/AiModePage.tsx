import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useTranslation } from "@/context/TranslationContext";
import { useLocation } from "wouter";
import {
  X, Minus, Maximize2, Terminal, Layers, Cpu, Clock,
  Send, Briefcase, Mail, Github, LayoutGrid, Sparkles
} from "lucide-react";

// ─── OS Window ────────────────────────────────────────────────────────────────

interface OsWindow {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  x: number;
  y: number;
  w: number;
  h: number;
  minimized: boolean;
  zIndex: number;
}

function Window({
  win,
  onClose,
  onMinimize,
  onFocus,
  isActive,
}: {
  win: OsWindow;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
  isActive: boolean;
}) {
  const dragControls = useDragControls();

  if (win.minimized) return null;

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragMomentum={false}
      dragListener={false}
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="absolute rounded-2xl overflow-hidden flex flex-col"
      style={{
        left: win.x, top: win.y,
        width: win.w, height: win.h,
        zIndex: win.zIndex,
        background: "rgba(12,12,12,0.92)",
        border: isActive ? "1px solid rgba(255,110,0,0.35)" : "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        boxShadow: isActive
          ? "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,110,0,0.1)"
          : "0 24px 60px rgba(0,0,0,0.6)",
      }}
      onPointerDown={() => onFocus(win.id)}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b border-white/5 shrink-0 cursor-grab active:cursor-grabbing"
        onPointerDown={e => { e.preventDefault(); dragControls.start(e); }}
      >
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onClose(win.id)}
            className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
          />
          <button
            onClick={() => onMinimize(win.id)}
            className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"
          />
          <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
        </div>
        <div className="flex-1 flex items-center justify-center gap-2">
          <span className="text-white/40">{win.icon}</span>
          <span className="font-mono text-[11px] text-white/50 tracking-wider">{win.title}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {win.content}
      </div>
    </motion.div>
  );
}

// ─── Window Contents ──────────────────────────────────────────────────────────

function TerminalContent({ lang }: { lang: "fr" | "en" }) {
  const [, setLocation] = useLocation();
  const [lines, setLines] = useState<{ text: string; type: "output" | "input" | "system" }[]>([
    { text: "RK_OS Terminal v2.0", type: "system" },
    { text: lang === "fr" ? "Tapez /help pour les commandes." : "Type /help for commands.", type: "system" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView(); }, [lines]);

  const run = (cmd: string) => {
    const c = cmd.trim().toLowerCase();
    setLines(prev => [...prev, { text: `$ ${cmd}`, type: "input" }]);
    setInput("");

    const out: Record<string, string> = {
      "/help": "/projects /skills /experience /contact /hire /github /about /clear",
      "/about": lang === "fr"
        ? "Rosaire KAKPO — Développeur Frontend, Cotonou Bénin. Spécialiste e-commerce africain."
        : "Rosaire KAKPO — Frontend Developer, Cotonou Benin. African e-commerce specialist.",
      "/github": "Opening → github.com/kakporosaire953-creator",
      "/projects": lang === "fr" ? "Navigation vers /projects..." : "Navigating to /projects...",
      "/skills": lang === "fr" ? "Navigation vers /skills..." : "Navigating to /skills...",
      "/experience": lang === "fr" ? "Navigation vers /experience..." : "Navigating to /experience...",
      "/contact": lang === "fr" ? "Navigation vers /contact..." : "Navigating to /contact...",
      "/hire": lang === "fr" ? "Navigation vers /hire..." : "Navigating to /hire...",
    };

    if (c === "/clear") { setLines([]); return; }
    if (c === "/github") {
      setLines(prev => [...prev, { text: out[c], type: "output" }]);
      setTimeout(() => window.open("https://github.com/kakporosaire953-creator", "_blank"), 400);
      return;
    }
    if (["/projects", "/skills", "/experience", "/contact", "/hire"].includes(c)) {
      setLines(prev => [...prev, { text: out[c], type: "output" }]);
      setTimeout(() => setLocation(c), 800);
      return;
    }
    setLines(prev => [...prev, {
      text: out[c] ?? (lang === "fr" ? `Commande inconnue: ${cmd}` : `Unknown command: ${cmd}`),
      type: "output"
    }]);
  };

  return (
    <div className="h-full flex flex-col bg-transparent font-mono text-xs">
      <div className="flex-1 overflow-y-auto space-y-1 pb-2">
        {lines.map((l, i) => (
          <div key={i} className={
            l.type === "system" ? "text-primary/60"
            : l.type === "input" ? "text-white/80"
            : "text-white/45"
          }>
            {l.type === "system" && <span className="text-primary/40 mr-1">›</span>}
            {l.text}
          </div>
        ))}
        <div className="flex gap-2 text-white/50">
          <span className="text-primary/50">$</span>
          <span className="blink text-white/30">_</span>
        </div>
        <div ref={bottomRef} />
      </div>
      <form onSubmit={e => { e.preventDefault(); if (input.trim()) run(input); }} className="flex items-center gap-2 border-t border-white/5 pt-3">
        <span className="text-primary/50 shrink-0">$</span>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
          placeholder={lang === "fr" ? "commande..." : "command..."}
          className="flex-1 bg-transparent text-white/80 placeholder:text-white/20 focus:outline-none text-xs"
        />
        <button type="submit" className="text-primary/60 hover:text-primary transition-colors">
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
}

function ProjectsContent({ lang }: { lang: "fr" | "en" }) {
  const items = [
    { num: "01", name: "Apple Confidence", tag: "E-commerce", status: "✓", color: "#FF6B00" },
    { num: "02", name: "SkillBridge", tag: lang === "fr" ? "Plateforme" : "Platform", status: "~", color: "#00D4FF" },
    { num: "03", name: "Campusly", tag: "PWA + AI", status: "~", color: "#A78BFA" },
    { num: "04", name: "Gbéto", tag: "Marketplace", status: "~", color: "#F5C842" },
    { num: "05", name: "E-Architect", tag: lang === "fr" ? "Vitrine" : "Showcase", status: "~", color: "#34D399" },
  ];
  return (
    <div className="space-y-2">
      {items.map(p => (
        <div key={p.num} className="flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
          <span className="font-mono text-[10px] text-white/25">{p.num}</span>
          <div className="flex-1">
            <div className="font-display font-semibold text-sm text-white/80">{p.name}</div>
            <div className="font-mono text-[10px]" style={{ color: p.color }}>{p.tag}</div>
          </div>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full" style={{ color: p.color, border: `1px solid ${p.color}30` }}>
            {p.status === "✓" ? (lang === "fr" ? "Livré" : "Done") : (lang === "fr" ? "En cours" : "WIP")}
          </span>
        </div>
      ))}
    </div>
  );
}

function SkillsContent({ lang }: { lang: "fr" | "en" }) {
  const skills = [
    { name: "React / Next.js", p: 85, c: "#FF6B00" },
    { name: "Tailwind CSS", p: 95, c: "#FF6B00" },
    { name: "Firebase / Supabase", p: 90, c: "#00D4FF" },
    { name: "UX Design / Figma", p: 82, c: "#A78BFA" },
    { name: "FedaPay / MTN MoMo", p: 95, c: "#F5C842" },
    { name: "SEO", p: 80, c: "#34D399" },
  ];
  return (
    <div className="space-y-3">
      {skills.map(s => (
        <div key={s.name}>
          <div className="flex justify-between mb-1">
            <span className="font-mono text-[11px] text-white/60">{s.name}</span>
            <span className="font-mono text-[10px]" style={{ color: s.c }}>{s.p}%</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: s.c }}
              initial={{ width: 0 }}
              animate={{ width: `${s.p}%` }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactContent({ lang }: { lang: "fr" | "en" }) {
  return (
    <div className="space-y-3">
      {[
        { icon: "📍", label: lang === "fr" ? "Localisation" : "Location", value: "Cotonou, Bénin" },
        { icon: "💻", label: "GitHub", value: "kakporosaire953-creator" },
        { icon: "🐦", label: "Twitter", value: "@RosaireKAKPO" },
        { icon: "✅", label: lang === "fr" ? "Disponibilité" : "Availability", value: lang === "fr" ? "Freelance ouvert" : "Open to freelance" },
      ].map(item => (
        <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl border border-white/5">
          <span className="text-base">{item.icon}</span>
          <div>
            <div className="font-mono text-[10px] text-white/30 uppercase tracking-wider">{item.label}</div>
            <div className="font-display text-sm text-white/75 font-medium">{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Desktop Icons ─────────────────────────────────────────────────────────────

interface AppDef {
  id: string;
  labelFr: string;
  labelEn: string;
  icon: React.ReactNode;
  color: string;
  defaultX: number;
  defaultY: number;
  w: number;
  h: number;
}

const appDefs: AppDef[] = [
  { id: "terminal", labelFr: "Terminal", labelEn: "Terminal", icon: <Terminal className="w-5 h-5" />, color: "#FF6B00", defaultX: 80, defaultY: 80, w: 440, h: 320 },
  { id: "projects", labelFr: "Projets", labelEn: "Projects", icon: <Layers className="w-5 h-5" />, color: "#00D4FF", defaultX: 180, defaultY: 120, w: 380, h: 360 },
  { id: "skills", labelFr: "Compétences", labelEn: "Skills", icon: <Cpu className="w-5 h-5" />, color: "#A78BFA", defaultX: 280, defaultY: 100, w: 380, h: 340 },
  { id: "contact", labelFr: "Contact", labelEn: "Contact", icon: <Mail className="w-5 h-5" />, color: "#34D399", defaultX: 200, defaultY: 150, w: 340, h: 300 },
];

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function AiModePage() {
  const { lang } = useTranslation();
  const [windows, setWindows] = useState<OsWindow[]>([]);
  const [zTop, setZTop] = useState(10);
  const [notifications, setNotifications] = useState<{ id: number; text: string }[]>([]);
  const [time, setTime] = useState(new Date());
  const notifIdRef = useRef(1);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Boot notification
  useEffect(() => {
    const n = { id: notifIdRef.current++, text: lang === "fr" ? "RK_OS démarré — Bienvenue" : "RK_OS started — Welcome" };
    setNotifications([n]);
    setTimeout(() => setNotifications(prev => prev.filter(x => x.id !== n.id)), 3500);
  }, []);

  const openApp = (def: AppDef) => {
    const exists = windows.find(w => w.id === def.id);
    if (exists) {
      // Bring to front / unminimize
      const newZ = zTop + 1;
      setZTop(newZ);
      setWindows(prev => prev.map(w => w.id === def.id ? { ...w, minimized: false, zIndex: newZ } : w));
      return;
    }

    const newZ = zTop + 1;
    setZTop(newZ);

    const contentMap: Record<string, React.ReactNode> = {
      terminal: <TerminalContent lang={lang} />,
      projects: <ProjectsContent lang={lang} />,
      skills: <SkillsContent lang={lang} />,
      contact: <ContactContent lang={lang} />,
    };

    setWindows(prev => [...prev, {
      id: def.id,
      title: lang === "fr" ? def.labelFr : def.labelEn,
      icon: def.icon,
      content: contentMap[def.id],
      x: def.defaultX + windows.length * 24,
      y: def.defaultY + windows.length * 24,
      w: def.w,
      h: def.h,
      minimized: false,
      zIndex: newZ,
    }]);

    const n = {
      id: notifIdRef.current++,
      text: lang === "fr" ? `${def.labelFr} ouvert` : `${def.labelEn} opened`,
    };
    setNotifications(prev => [...prev, n]);
    setTimeout(() => setNotifications(prev => prev.filter(x => x.id !== n.id)), 2000);
  };

  const closeWindow = (id: string) => setWindows(prev => prev.filter(w => w.id !== id));
  const minimizeWindow = (id: string) => setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w));
  const focusWindow = (id: string) => {
    const newZ = zTop + 1;
    setZTop(newZ);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZ } : w));
  };

  const activeId = windows.filter(w => !w.minimized).reduce((top, w) => w.zIndex > (top?.zIndex ?? 0) ? w : top, null as OsWindow | null)?.id;

  const timeStr = time.toLocaleTimeString(lang === "fr" ? "fr-FR" : "en-US", { hour: "2-digit", minute: "2-digit" });
  const dateStr = time.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <div
      className="relative min-h-[calc(100vh-56px)] overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 30% 50%, rgba(255,80,0,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(0,200,255,0.04) 0%, transparent 50%), #080808",
      }}
    >
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* System bar */}
      <div className="absolute top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 py-2 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-sm text-white/80">
            RK<span className="text-primary">.</span>OS
          </span>
          <span className="text-white/20 text-xs">|</span>
          {appDefs.map(def => (
            <button
              key={def.id}
              onClick={() => openApp(def)}
              className="font-mono text-[11px] text-white/40 hover:text-white/80 transition-colors px-1"
            >
              {lang === "fr" ? def.labelFr : def.labelEn}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-primary/60" />
            <span className="font-mono text-[10px] text-white/40 hidden sm:block">v2.0</span>
          </div>
          <div className="text-right">
            <div className="font-mono text-xs text-white/70">{timeStr}</div>
            <div className="font-mono text-[10px] text-white/30 hidden sm:block">{dateStr}</div>
          </div>
        </div>
      </div>

      {/* Desktop area */}
      <div className="relative" style={{ height: "calc(100vh - 56px - 64px)", marginTop: "40px" }}>

        {/* Desktop icons — top right corner */}
        <div className="absolute top-8 right-8 grid grid-cols-2 gap-4 z-10">
          {appDefs.map(def => (
            <motion.button
              key={def.id}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onDoubleClick={() => openApp(def)}
              onClick={() => openApp(def)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/5 transition-colors group"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${def.color}22, ${def.color}11)`,
                  border: `1px solid ${def.color}30`,
                  color: def.color,
                  boxShadow: `0 4px 20px ${def.color}15`,
                }}
              >
                {def.icon}
              </div>
              <span className="font-mono text-[10px] text-white/50 group-hover:text-white/80 transition-colors text-center leading-tight">
                {lang === "fr" ? def.labelFr : def.labelEn}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Center hint */}
        {windows.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="font-display font-bold text-[80px] md:text-[120px] text-white/4 tracking-tighter leading-none select-none">
              RK.OS
            </div>
            <p className="font-mono text-xs text-white/20 mt-4">
              {lang === "fr" ? "Cliquez sur une icône pour ouvrir" : "Click an icon to open"}
            </p>
          </motion.div>
        )}

        {/* Windows */}
        <AnimatePresence>
          {windows.map(win => (
            <Window
              key={win.id}
              win={win}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onFocus={focusWindow}
              isActive={win.id === activeId}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Dock */}
      <div className="absolute bottom-0 left-0 right-0 z-[100] flex items-end justify-center pb-3">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 22 }}
          className="flex items-center gap-2 p-2 rounded-2xl border border-white/8 bg-black/60 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
        >
          {appDefs.map(def => {
            const win = windows.find(w => w.id === def.id);
            const isOpen = !!win;
            const isMin = win?.minimized;
            return (
              <motion.button
                key={def.id}
                whileHover={{ scale: 1.22, y: -6 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openApp(def)}
                className="relative flex flex-col items-center group"
                title={lang === "fr" ? def.labelFr : def.labelEn}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: isOpen && !isMin
                      ? `linear-gradient(135deg, ${def.color}40, ${def.color}25)`
                      : `linear-gradient(135deg, ${def.color}15, ${def.color}08)`,
                    border: `1px solid ${def.color}${isOpen ? "50" : "20"}`,
                    color: def.color,
                    boxShadow: isOpen && !isMin ? `0 0 20px ${def.color}25` : "none",
                  }}
                >
                  {def.icon}
                </div>
                {isOpen && (
                  <div className="absolute -bottom-1 w-1 h-1 rounded-full" style={{ background: def.color }} />
                )}
                <div className="absolute -top-8 px-2 py-1 rounded-lg bg-foreground/90 text-background text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {lang === "fr" ? def.labelFr : def.labelEn}
                </div>
              </motion.button>
            );
          })}

          <div className="w-px h-8 bg-white/10 mx-1" />

          <motion.button
            whileHover={{ scale: 1.22, y: -6 }}
            className="relative group"
            onClick={() => {
              const any = windows.some(w => !w.minimized);
              if (any) setWindows(prev => prev.map(w => ({ ...w, minimized: true })));
              else setWindows(prev => prev.map(w => ({ ...w, minimized: false })));
            }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 text-white/40 hover:text-white/70 transition-colors bg-white/5">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div className="absolute -top-8 px-2 py-1 rounded-lg bg-foreground/90 text-background text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {lang === "fr" ? "Bureau" : "Desktop"}
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.22, y: -6 }}
            className="relative group"
            onClick={() => openApp(appDefs[0])}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center border border-primary/30 bg-primary/15 text-primary hover:bg-primary/25 transition-colors">
              <Github className="w-5 h-5" />
            </div>
            <div className="absolute -top-8 px-2 py-1 rounded-lg bg-foreground/90 text-background text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              GitHub
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Notifications */}
      <div className="fixed top-16 right-4 z-[200] space-y-2 pointer-events-none">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary/25 bg-black/80 backdrop-blur-xl shadow-xl"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="font-mono text-[11px] text-white/70">{n.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
