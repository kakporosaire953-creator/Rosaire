import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { useTranslation } from "@/context/TranslationContext";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Terminal } from "lucide-react";

export function ProjectsPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<"all" | "completed" | "ongoing">("all");
  
  const projects = t("projects.items");

  const filteredProjects = projects.filter((p: any) => 
    filter === "all" ? true : p.status === filter
  );

  return (
    <PageTransition>
      <div className="py-12 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2 uppercase font-mono">
              {t("projects.title")}
            </h1>
            <div className="h-1 w-24 bg-primary rounded-full" />
          </div>

          <div className="flex bg-card/50 p-1 rounded-full border border-border backdrop-blur-md">
            {(["all", "completed", "ongoing"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === f 
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(234,107,0,0.5)]" 
                    : "text-muted-foreground hover:text-foreground hover:bg-card"
                }`}
              >
                {t(`projects.filter.${f}`)}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project: any, i: number) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                key={project.id}
                className="group relative flex flex-col justify-between p-6 bg-card border border-card-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,107,0,0.15)]"
              >
                {/* Holographic background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-background rounded-xl border border-border">
                      <Terminal className="w-6 h-6 text-primary" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
                      project.status === 'completed' 
                        ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                        : 'bg-secondary/10 text-secondary border-secondary/20'
                    }`}>
                      {project.status === 'completed' ? '🟢 ' : '🔵 '}{project.statusText}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                <div className="relative z-10 mt-auto">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech: string) => (
                      <span key={tech} className="px-2 py-1 bg-background rounded-md text-xs border border-border text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                        <ExternalLink className="w-4 h-4" /> Live
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 bg-card text-foreground border border-card-border rounded-lg font-medium hover:bg-muted transition-colors">
                        <Github className="w-4 h-4" /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </PageTransition>
  );
}
