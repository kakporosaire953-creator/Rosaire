import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { useTranslation } from "@/context/TranslationContext";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "apple-confidence",
    num: "01",
    title: "Apple Confidence",
    status: "completed",
    statusFr: "Livré",
    statusEn: "Delivered",
    tagFr: "E-commerce • Mobile",
    tagEn: "E-commerce • Mobile",
    descFr: "E-commerce de smartphones et accessoires au Bénin. 20+ modèles (iPhone, Samsung, Tecno, Redmi), système de filtres avancé, interface responsive mobile-first. Livré en 3 semaines.",
    descEn: "Smartphone e-commerce in Benin. 20+ models (iPhone, Samsung, Tecno, Redmi), advanced filter system, mobile-first responsive UI. Delivered in 3 weeks.",
    metrics: [{ value: "3 sem.", label: "Livraison" }, { value: "20+", label: "Produits" }],
    stack: ["Next.js", "React", "Tailwind CSS"],
    live: "https://v0-apple-confidence.vercel.app/",
    github: "https://github.com/kakporosaire953-creator/apple-confidence",
    category: ["ecommerce", "nextjs"],
    accentColor: "#FF6B00",
  },
  {
    id: "skillbridge",
    num: "02",
    title: "SkillBridge",
    status: "ongoing",
    statusFr: "En cours",
    statusEn: "In progress",
    tagFr: "Plateforme • Social",
    tagEn: "Platform • Social",
    descFr: "Plateforme sociale d'échange de compétences connectant apprenants et mentors. Matching intelligent, messagerie temps réel Firebase, profils portfolios.",
    descEn: "Social platform connecting learners and mentors. Smart matching, Firebase realtime messaging, portfolio profiles.",
    metrics: [],
    stack: ["React", "Firebase", "Tailwind CSS"],
    github: "https://github.com/kakporosaire953-creator/skillbridge",
    category: ["react"],
    accentColor: "#00D4FF",
  },
  {
    id: "campusly",
    num: "03",
    title: "Campusly",
    status: "ongoing",
    statusFr: "En cours",
    statusEn: "In progress",
    tagFr: "PWA • IA • Éducation",
    tagEn: "PWA • AI • Education",
    descFr: "PWA dédiée aux étudiants de l'UAC. Accès aux anciennes épreuves, assistant IA, authentification par matricule, mode hors-ligne.",
    descEn: "PWA dedicated to UAC students. Past exams archive, AI assistant, student ID auth, offline mode.",
    metrics: [],
    stack: ["Next.js", "PWA", "Firebase", "AI"],
    github: "https://github.com/kakporosaire953-creator/campusly",
    category: ["nextjs"],
    accentColor: "#A78BFA",
  },
  {
    id: "gbeto",
    num: "04",
    title: "Gbéto",
    status: "ongoing",
    statusFr: "En cours",
    statusEn: "In progress",
    tagFr: "Marketplace • Paiement Mobile",
    tagEn: "Marketplace • Mobile Pay",
    descFr: "Marketplace premium béninois. FedaPay (MTN MoMo + Moov Money), dashboard vendeur complet, group buying, live shopping en temps réel.",
    descEn: "Premium Beninese marketplace. FedaPay (MTN MoMo + Moov Money), full vendor dashboard, group buying, realtime live shopping.",
    metrics: [],
    stack: ["React", "FedaPay", "Supabase"],
    github: "https://github.com/kakporosaire953-creator/gbeto",
    category: ["react", "ecommerce"],
    accentColor: "#F5C842",
  },
  {
    id: "e-architect",
    num: "05",
    title: "E-Architect SARL",
    status: "ongoing",
    statusFr: "En cours",
    statusEn: "In progress",
    tagFr: "Site Vitrine • Architecture",
    tagEn: "Showcase • Architecture",
    descFr: "Site vitrine élégant pour cabinet d'architecture. Galerie de projets avec filtres par catégorie, formulaire de devis, témoignages clients.",
    descEn: "Elegant showcase site for an architecture firm. Category-filtered project gallery, quote form, client testimonials.",
    metrics: [],
    stack: ["HTML/CSS", "JavaScript"],
    github: "https://github.com/kakporosaire953-creator/e-architect",
    category: ["web"],
    accentColor: "#34D399",
  },
];

type Filter = "all" | "ecommerce" | "react" | "nextjs";

export function ProjectsPage() {
  const { lang } = useTranslation();
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filters: { key: Filter; labelFr: string; labelEn: string }[] = [
    { key: "all", labelFr: "Tous", labelEn: "All" },
    { key: "ecommerce", labelFr: "E-commerce", labelEn: "E-commerce" },
    { key: "react", labelFr: "React", labelEn: "React" },
    { key: "nextjs", labelFr: "Next.js", labelEn: "Next.js" },
  ];

  const filtered = projects.filter(p =>
    filter === "all" ? true : p.category.includes(filter)
  );

  const titleText = lang === "fr" ? "Univers de Projets" : "Project Universe";
  const subtitleText = lang === "fr"
    ? "Chaque ligne de code, une intention. Chaque projet, une solution réelle."
    : "Every line of code, an intention. Every project, a real solution.";

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-56px)] px-4 sm:px-6 md:px-12 lg:px-20 pt-6 md:pt-16 pb-4">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-10 md:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xs text-primary tracking-widest uppercase mb-3"
            >
              — {lang === "fr" ? "Portfolio" : "Portfolio"}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display font-extrabold text-[clamp(2.5rem,6vw,5rem)] tracking-tighter text-foreground leading-none mb-4"
            >
              {titleText}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-base max-w-xl"
            >
              {subtitleText}
            </motion.p>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {filters.map(f => (
              <button
                key={f.key}
                data-testid={`filter-${f.key}`}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2 rounded-lg font-mono text-xs tracking-wider transition-all duration-200 ${
                  filter === f.key
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,110,0,0.3)]"
                    : "border border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                {lang === "fr" ? f.labelFr : f.labelEn}
              </button>
            ))}
          </motion.div>

          {/* Projects list */}
          <motion.div layout className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => {
                const isExpanded = expanded === project.id;
                const desc = lang === "fr" ? project.descFr : project.descEn;
                const status = lang === "fr" ? project.statusFr : project.statusEn;
                const tag = lang === "fr" ? project.tagFr : project.tagEn;

                return (
                  <motion.article
                    layout
                    key={project.id}
                    data-testid={`project-card-${project.id}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="group relative border border-border/50 hover:border-primary/30 rounded-2xl overflow-hidden bg-card transition-all duration-300 hover:shadow-[0_4px_40px_rgba(255,110,0,0.08)] cursor-pointer"
                    onClick={() => setExpanded(isExpanded ? null : project.id)}
                  >
                    {/* Colored left accent */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: project.accentColor }}
                    />

                    <div className="px-7 py-6">
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex items-start gap-6 flex-1 min-w-0">
                          {/* Number */}
                          <span className="font-mono text-[11px] text-muted-foreground/40 mt-1 shrink-0 tabular-nums">
                            {project.num}
                          </span>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              <h2 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                                {project.title}
                              </h2>
                              <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
                                {tag}
                              </span>
                            </div>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 mt-2">
                                    {desc}
                                  </p>
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {project.stack.map(s => (
                                      <span key={s} className="font-mono text-[10px] px-2.5 py-1 rounded-md border border-border/60 text-muted-foreground">
                                        {s}
                                      </span>
                                    ))}
                                  </div>
                                  {project.metrics.length > 0 && (
                                    <div className="flex gap-6 mb-4">
                                      {project.metrics.map(m => (
                                        <div key={m.label}>
                                          <div className="font-display font-bold text-lg text-primary">{m.value}</div>
                                          <div className="font-mono text-[10px] text-muted-foreground uppercase">{m.label}</div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  <div className="flex items-center gap-3">
                                    {project.live && (
                                      <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={e => e.stopPropagation()}
                                        data-testid={`link-live-${project.id}`}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-mono text-xs font-medium hover:bg-primary/90 transition-colors"
                                      >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        Live
                                      </a>
                                    )}
                                    {project.github && (
                                      <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={e => e.stopPropagation()}
                                        data-testid={`link-github-${project.id}`}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground font-mono text-xs font-medium transition-colors"
                                      >
                                        <Github className="w-3.5 h-3.5" />
                                        GitHub
                                      </a>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                          <span className={`font-mono text-[10px] tracking-wider px-2.5 py-1 rounded-full border ${
                            project.status === "completed"
                              ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/8"
                              : "text-secondary border-secondary/20 bg-secondary/8"
                          }`}>
                            {status}
                          </span>
                          <ArrowUpRight
                            className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-90" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
