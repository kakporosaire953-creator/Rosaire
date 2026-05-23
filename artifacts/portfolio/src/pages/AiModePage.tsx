import { useState, useRef, useEffect } from "react";
import { PageTransition } from "@/components/PageTransition";
import { useTranslation } from "@/context/TranslationContext";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export function AiModePage() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ type: 'user' | 'system', text: string }[]>([
    { type: 'system', text: 'RK_OS v1.0.4 loaded.' },
    { type: 'system', text: 'Type "help" for a list of available commands.' }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'user' as const, text: `> ${input}` }];
    
    setInput("");

    // Simulate thinking delay
    setTimeout(() => {
      let response = "";
      switch (cmd) {
        case "help":
          response = `Available commands:
  help      - Show this menu
  projects  - View holographic universe
  skills    - View skill matrix
  contact   - Open communication center
  hire      - View premium services
  explore   - Access experimental lab
  home      - Return to main interface
  clear     - Clear terminal`;
          break;
        case "projects":
        case "/projects":
          response = "Initiating jump to Projects Universe...";
          setTimeout(() => setLocation("/projects"), 1000);
          break;
        case "skills":
        case "/skills":
          response = "Accessing Skill Matrix...";
          setTimeout(() => setLocation("/skills"), 1000);
          break;
        case "contact":
        case "/contact":
          response = "Opening secure communication channel...";
          setTimeout(() => setLocation("/contact"), 1000);
          break;
        case "hire":
        case "/hire":
          response = "Loading premium service modules...";
          setTimeout(() => setLocation("/hire"), 1000);
          break;
        case "explore":
        case "/explore":
          response = "Unlocking experimental lab...";
          setTimeout(() => setLocation("/explore"), 1000);
          break;
        case "home":
        case "/home":
        case "/":
          response = "Returning to base reality...";
          setTimeout(() => setLocation("/"), 1000);
          break;
        case "clear":
          setHistory([]);
          return;
        default:
          response = `Command not recognized: ${cmd}. Type "help" for available commands.`;
      }
      setHistory(h => [...h, { type: 'system', text: response }]);
    }, 400);

    setHistory(newHistory);
  };

  return (
    <PageTransition>
      <div className="py-12 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary mb-2 uppercase font-mono glitch-wrapper">
            <span className="glitch" data-text={t("ai.title")}>{t("ai.title")}</span>
          </h1>
          <div className="h-1 w-24 bg-primary rounded-full" />
        </motion.div>

        <div className="h-[65vh] bg-[#050505] border border-primary/30 rounded-2xl p-6 font-mono text-sm md:text-base text-primary/90 shadow-[0_0_40px_rgba(234,107,0,0.15)] flex flex-col overflow-hidden relative">
          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px]" />
          
          <div className="flex-1 overflow-y-auto space-y-3 pb-4 custom-scrollbar relative z-10">
            {history.map((line, i) => (
              <div key={i} className={line.type === 'system' ? 'text-primary/70 whitespace-pre-wrap' : 'text-white'}>
                {line.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleCommand} className="relative z-10 pt-4 border-t border-primary/20 flex items-center gap-2">
            <span className="text-secondary font-bold">root@RK_OS:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-primary/30"
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
