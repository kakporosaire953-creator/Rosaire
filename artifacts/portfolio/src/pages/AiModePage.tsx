import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { useTranslation } from "@/context/TranslationContext";
import { useLocation } from "wouter";
import { Send } from "lucide-react";

interface Message {
  id: number;
  from: "user" | "system";
  text: string;
  timestamp: string;
}

const now = () => {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
};

const systemInfo = {
  fr: {
    boot: [
      "RK_OS v2.0 — AFRICAN FUTURISM EDITION",
      "Processeur : Créativité Avancée",
      "Mémoire : Expériences Premium",
      "Localisation : Cotonou, Bénin",
      "Statut : ACTIF — En mission",
      "Système prêt. Tapez /help pour les commandes.",
    ],
    help: `Commandes disponibles :
  /projects   → Projets réalisés
  /skills     → Matrice de compétences
  /experience → Parcours & Timeline
  /contact    → Centre de communication
  /hire       → Services & Tarifs
  /explore    → Laboratoire expérimental
  /about      → À propos de Rosaire
  /github     → Profil GitHub
  /linkedin   → Profil LinkedIn
  /resume     → Télécharger le CV
  /clear      → Effacer le terminal`,
    about: `ROSAIRE KAKPO — Développeur Frontend
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Localisation   : Cotonou, Bénin
Spécialisation : E-commerce, IA, UX, African Digital
Stack          : React, Next.js, Tailwind, Firebase
Disponibilité  : Missions freelance ouvertes
Philosophie    : "Créer des produits qui servent l'Afrique."`,
    notfound: (cmd: string) => `Commande inconnue : "${cmd}"\nTapez /help pour voir les commandes disponibles.`,
    projects: "Navigation vers /projects...",
    skills: "Navigation vers /skills...",
    experience: "Navigation vers /experience...",
    contact: "Navigation vers /contact...",
    hire: "Navigation vers /hire...",
    explore: "Navigation vers /explore...",
    github: "Ouverture de GitHub : github.com/kakporosaire953-creator",
    linkedin: "LinkedIn : linkedin.com/in/rosaire-kakpo",
    resume: "Téléchargement du CV en cours...",
    clear: "__CLEAR__",
    placeholder: "Tapez une commande...",
    title: "Terminal OS",
  },
  en: {
    boot: [
      "RK_OS v2.0 — AFRICAN FUTURISM EDITION",
      "Processor : Advanced Creativity",
      "Memory    : Premium Experiences",
      "Location  : Cotonou, Benin",
      "Status    : ACTIVE — On mission",
      "System ready. Type /help for commands.",
    ],
    help: `Available commands:
  /projects   → Projects showcase
  /skills     → Skill matrix
  /experience → Career timeline
  /contact    → Communication center
  /hire       → Services & Pricing
  /explore    → Experimental lab
  /about      → About Rosaire
  /github     → GitHub profile
  /linkedin   → LinkedIn profile
  /resume     → Download resume
  /clear      → Clear terminal`,
    about: `ROSAIRE KAKPO — Frontend Developer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Location       : Cotonou, Benin
Specialization : E-commerce, AI, UX, African Digital
Stack          : React, Next.js, Tailwind, Firebase
Availability   : Open for freelance missions
Philosophy     : "Build products that serve Africa."`,
    notfound: (cmd: string) => `Unknown command: "${cmd}"\nType /help to see available commands.`,
    projects: "Navigating to /projects...",
    skills: "Navigating to /skills...",
    experience: "Navigating to /experience...",
    contact: "Navigating to /contact...",
    hire: "Navigating to /hire...",
    explore: "Navigating to /explore...",
    github: "Opening GitHub: github.com/kakporosaire953-creator",
    linkedin: "LinkedIn: linkedin.com/in/rosaire-kakpo",
    resume: "Downloading resume...",
    clear: "__CLEAR__",
    placeholder: "Type a command...",
    title: "Terminal OS",
  },
};

export function AiModePage() {
  const { lang } = useTranslation();
  const [, setLocation] = useLocation();
  const s = systemInfo[lang];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [booted, setBooted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  const addMsg = (text: string, from: "user" | "system" = "system") => {
    setMessages(prev => [...prev, { id: idRef.current++, from, text, timestamp: now() }]);
  };

  useEffect(() => {
    let i = 0;
    const tick = () => {
      if (i < s.boot.length) {
        const line = s.boot[i];
        addMsg(line, "system");
        i++;
        setTimeout(tick, 280);
      } else {
        setBooted(true);
      }
    };
    setTimeout(tick, 400);
  }, [lang]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    addMsg(raw, "user");

    const navigate = (path: string, resp: string) => {
      addMsg(resp);
      setTimeout(() => setLocation(path), 800);
    };

    switch (cmd) {
      case "/help": addMsg(s.help); break;
      case "/about": addMsg(s.about); break;
      case "/projects": navigate("/projects", s.projects); break;
      case "/skills": navigate("/skills", s.skills); break;
      case "/experience": navigate("/experience", s.experience); break;
      case "/contact": navigate("/contact", s.contact); break;
      case "/hire": navigate("/hire", s.hire); break;
      case "/explore": navigate("/explore", s.explore); break;
      case "/github":
        addMsg(s.github);
        setTimeout(() => window.open("https://github.com/kakporosaire953-creator", "_blank"), 400);
        break;
      case "/linkedin":
        addMsg(s.linkedin);
        break;
      case "/resume":
        addMsg(s.resume);
        break;
      case "/clear":
        setMessages([]);
        break;
      default:
        addMsg(s.notfound(cmd));
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !booted) return;
    handleCommand(input);
    setInput("");
  };

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-56px)] px-6 md:px-12 lg:px-20 py-12 flex flex-col">
        <div className="max-w-4xl mx-auto w-full flex flex-col flex-1">

          {/* Header */}
          <div className="mb-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xs text-primary tracking-widest uppercase mb-3"
            >
              — {lang === "fr" ? "Interface Terminal" : "Terminal Interface"}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display font-extrabold text-[clamp(2rem,5vw,4rem)] tracking-tighter text-foreground leading-none"
            >
              {s.title}
            </motion.h1>
          </div>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 flex flex-col border border-border/50 rounded-2xl overflow-hidden bg-[#080808] dark:bg-[#050505] min-h-[500px]"
          >
            {/* Terminal bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-white/2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-3 font-mono text-[10px] text-white/20 tracking-widest">
                RK_OS — TERMINAL
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-2 font-mono text-sm" style={{ minHeight: 0 }}>
              <AnimatePresence initial={false}>
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: msg.from === "user" ? 8 : -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-3 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.from === "system" && (
                      <span className="text-primary/50 shrink-0 mt-0.5">›</span>
                    )}
                    <div className={msg.from === "user" ? "text-primary/90" : "text-white/60"}>
                      <pre className="whitespace-pre-wrap text-xs leading-relaxed font-mono">{msg.text}</pre>
                    </div>
                    {msg.from === "user" && (
                      <span className="text-white/20 text-[10px] mt-1 shrink-0">{msg.timestamp}</span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {booted && (
                <div className="flex gap-3">
                  <span className="text-primary/50">›</span>
                  <span className="blink text-white/40">_</span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={submit} className="flex items-center gap-3 px-5 py-4 border-t border-white/5">
              <span className="font-mono text-xs text-primary/60 shrink-0">rosaire@rk-os:~$</span>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={booted ? s.placeholder : "..."}
                disabled={!booted}
                data-testid="input-terminal"
                autoComplete="off"
                spellCheck={false}
                className="flex-1 bg-transparent font-mono text-xs text-white/80 placeholder:text-white/20 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!booted || !input.trim()}
                data-testid="btn-terminal-submit"
                className="p-1.5 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 disabled:opacity-30 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>

          {/* Quick commands */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {["/help", "/about", "/projects", "/skills", "/contact", "/hire", "/github", "/clear"].map(cmd => (
              <button
                key={cmd}
                data-testid={`quick-cmd-${cmd.slice(1)}`}
                onClick={() => { setInput(cmd); }}
                className="font-mono text-[10px] px-3 py-1.5 rounded-lg border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200"
              >
                {cmd}
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
