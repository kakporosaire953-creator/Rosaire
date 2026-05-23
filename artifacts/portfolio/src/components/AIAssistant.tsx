import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/context/TranslationContext";
import { useLocation } from "wouter";

interface ChatMessage {
  id: number;
  from: "user" | "ai";
  text: string;
  actions?: { label: string; href: string }[];
  typing?: boolean;
}

const knowledgeFr = {
  greeting: {
    text: "Bonjour ! Je suis l'IA de Rosaire. Je peux vous parler de ses projets, compétences, services ou parcours. Que voulez-vous savoir ?",
    actions: [
      { label: "Voir les projets", href: "/projects" },
      { label: "Ses services", href: "/hire" },
    ],
  },
  projects: {
    text: "Rosaire a 5 projets :\n\n• **Apple Confidence** — E-commerce smartphones Bénin (livré ✓)\n• **SkillBridge** — Plateforme d'échange de compétences\n• **Campusly** — PWA pour étudiants UAC avec IA\n• **Gbéto** — Marketplace premium (FedaPay, MTN MoMo)\n• **E-Architect SARL** — Site vitrine architecture",
    actions: [{ label: "Explorer les projets", href: "/projects" }],
  },
  skills: {
    text: "Stack technique de Rosaire :\n\n⚡ Frontend — React, Next.js, Tailwind CSS, Framer Motion\n🎨 Design — Figma, UX Design, Copywriting\n🔧 Backend — Firebase, Supabase, API REST, Git\n💳 Afrique — FedaPay, MTN MoMo, Moov Money",
    actions: [{ label: "Matrice complète", href: "/skills" }],
  },
  contact: {
    text: "Pour contacter Rosaire :\n\n📍 Cotonou, Bénin\n💻 GitHub : kakporosaire953-creator\n🐦 Twitter : @RosaireKAKPO\n✅ Disponible pour missions freelance",
    actions: [{ label: "Envoyer un message", href: "/contact" }],
  },
  hire: {
    text: "Services proposés :\n\n• Développement Frontend\n• E-commerce & Marketplace Africa\n• Intégrations IA\n• UX Design & Audit\n• Consulting Digital Africain\n\nDélai moyen : 3 semaines.",
    actions: [{ label: "Voir les services", href: "/hire" }],
  },
  experience: {
    text: "Parcours de Rosaire :\n\n🎓 Formation Full-Stack — Les Cours Sonou, Cotonou\n🏆 Certifié MIABE Hackathon\n⚡ Arduino Days 2026 — Sèmè City Open Park\n🌍 Spécialisation African Digital Innovation",
    actions: [{ label: "Voir le parcours", href: "/experience" }],
  },
  about: {
    text: "Rosaire KAKPO est un développeur frontend de Cotonou, Bénin. Il crée des expériences digitales futuristes et des écosystèmes e-commerce premium pensés pour l'innovation africaine.\n\n\"Construire des produits qui servent l'Afrique.\"",
    actions: [{ label: "En savoir plus", href: "/" }],
  },
  default: {
    text: "Je peux vous renseigner sur les **projets**, **compétences**, **services**, **parcours** ou **contact** de Rosaire. Posez votre question !",
    actions: [],
  },
};

const knowledgeEn = {
  greeting: {
    text: "Hello! I'm Rosaire's AI. I can tell you about his projects, skills, services or journey. What would you like to know?",
    actions: [
      { label: "View projects", href: "/projects" },
      { label: "His services", href: "/hire" },
    ],
  },
  projects: {
    text: "Rosaire has 5 projects:\n\n• **Apple Confidence** — Benin smartphone e-commerce (delivered ✓)\n• **SkillBridge** — Skill exchange platform\n• **Campusly** — AI-powered PWA for UAC students\n• **Gbéto** — Premium marketplace (FedaPay, MTN MoMo)\n• **E-Architect SARL** — Architecture firm showcase",
    actions: [{ label: "Explore projects", href: "/projects" }],
  },
  skills: {
    text: "Rosaire's tech stack:\n\n⚡ Frontend — React, Next.js, Tailwind CSS, Framer Motion\n🎨 Design — Figma, UX Design, Copywriting\n🔧 Backend — Firebase, Supabase, REST API, Git\n💳 Africa — FedaPay, MTN MoMo, Moov Money",
    actions: [{ label: "Full skill matrix", href: "/skills" }],
  },
  contact: {
    text: "How to reach Rosaire:\n\n📍 Cotonou, Benin\n💻 GitHub: kakporosaire953-creator\n🐦 Twitter: @RosaireKAKPO\n✅ Open to freelance projects",
    actions: [{ label: "Send a message", href: "/contact" }],
  },
  hire: {
    text: "Services offered:\n\n• Frontend Development\n• E-commerce & Marketplace Africa\n• AI Integrations\n• UX Design & Audit\n• African Digital Consulting\n\nAvg. delivery: 3 weeks.",
    actions: [{ label: "View services", href: "/hire" }],
  },
  experience: {
    text: "Rosaire's journey:\n\n🎓 Full-Stack Training — Les Cours Sonou, Cotonou\n🏆 MIABE Hackathon certified\n⚡ Arduino Days 2026 — Sèmè City Open Park\n🌍 African Digital Innovation specialization",
    actions: [{ label: "View timeline", href: "/experience" }],
  },
  about: {
    text: "Rosaire KAKPO is a frontend developer from Cotonou, Benin. He creates futuristic digital experiences and premium e-commerce ecosystems designed for African innovation.\n\n\"Build products that serve Africa.\"",
    actions: [{ label: "Learn more", href: "/" }],
  },
  default: {
    text: "I can answer questions about Rosaire's **projects**, **skills**, **services**, **experience**, or **contact**. Ask away!",
    actions: [],
  },
};

function matchIntent(input: string, lang: "fr" | "en") {
  const q = input.toLowerCase();
  const kb = lang === "fr" ? knowledgeFr : knowledgeEn;

  if (/bonjour|salut|hello|hi|hey|ciao|yo/.test(q)) return kb.greeting;
  if (/projet|project|apple|skill.?bridge|campusly|gb[eé]to|architect/.test(q)) return kb.projects;
  if (/skill|comp[eé]tence|stack|react|next|tailwind|firebase|supabase/.test(q)) return kb.skills;
  if (/contact|email|message|whatsapp|github|twitter|social/.test(q)) return kb.contact;
  if (/hire|service|tarif|prix|price|mission|freelance|colla/.test(q)) return kb.hire;
  if (/experience|parcours|formation|hackathon|arduino|sonou/.test(q)) return kb.experience;
  if (/[àa] propos|about|qui|who|rosaire|kakpo/.test(q)) return kb.about;
  return kb.default;
}

let idCounter = 1;

export function AIAssistant() {
  const { lang } = useTranslation();
  const [, setLocation] = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && !initialized) {
      setInitialized(true);
      const kb = lang === "fr" ? knowledgeFr : knowledgeEn;
      setMessages([{
        id: idCounter++,
        from: "ai",
        text: kb.greeting.text,
        actions: kb.greeting.actions,
      }]);
    }
  }, [open, initialized, lang]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setInput("");

    const userMsg: ChatMessage = { id: idCounter++, from: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));

    const response = matchIntent(text, lang);
    setTyping(false);
    setMessages(prev => [...prev, {
      id: idCounter++,
      from: "ai",
      text: response.text,
      actions: response.actions,
    }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleAction = (href: string) => {
    setOpen(false);
    setLocation(href);
  };

  const aiLabel = lang === "fr" ? "Ask Rosaire AI" : "Ask Rosaire AI";
  const placeholder = lang === "fr" ? "Posez une question..." : "Ask anything...";

  // Format text with basic **bold** support
  const formatText = (text: string) => {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/\*\*([^*]+)\*\*/g);
      return (
        <span key={i}>
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j} className="text-primary font-semibold">{part}</strong> : part
          )}
          {i < text.split("\n").length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        data-testid="btn-ai-assistant"
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-24 right-5 z-50 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(255,110,0,0.4)] ai-pulse hover:scale-105 transition-transform"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 300 }}
        title={aiLabel}
      >
        <Sparkles className="w-5 h-5 text-primary-foreground" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-40 right-5 z-50 w-80 md:w-96 flex flex-col rounded-2xl border border-border/60 bg-background/90 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.4)] overflow-hidden"
            style={{ maxHeight: "65vh" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/40 bg-card">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-background" />
              </div>
              <div className="flex-1">
                <div className="font-display font-semibold text-sm text-foreground">Ask Rosaire AI</div>
                <div className="font-mono text-[10px] text-muted-foreground">
                  {lang === "fr" ? "IA contextuelle — Toujours disponible" : "Contextual AI — Always on"}
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card-border transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ minHeight: 0 }}>
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] ${msg.from === "user" ? "order-1" : ""}`}>
                    {msg.from === "ai" && (
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mb-1.5">
                        <Sparkles className="w-3 h-3 text-primary" />
                      </div>
                    )}
                    <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.from === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-card border border-border/40 text-foreground rounded-tl-sm"
                    }`}>
                      {msg.from === "ai" ? formatText(msg.text) : msg.text}
                    </div>
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {msg.actions.map(action => (
                          <button
                            key={action.href}
                            onClick={() => handleAction(action.href)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 font-mono text-[10px] hover:bg-primary/20 transition-colors"
                          >
                            {action.label}
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-card border border-border/40">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary typing-dot-1" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary typing-dot-2" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary typing-dot-3" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick chips */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto border-t border-border/30">
              {(lang === "fr"
                ? ["Projets", "Skills", "Contact", "Services"]
                : ["Projects", "Skills", "Contact", "Services"]
              ).map(chip => (
                <button
                  key={chip}
                  onClick={() => sendMessage(chip)}
                  className="shrink-0 px-3 py-1 rounded-full border border-border/50 font-mono text-[10px] text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-border/40 bg-card">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={placeholder}
                data-testid="input-ai-chat"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-sans"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                data-testid="btn-ai-send"
                className="w-8 h-8 rounded-xl flex items-center justify-center bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
