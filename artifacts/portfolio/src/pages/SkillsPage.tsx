import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { useTranslation } from "@/context/TranslationContext";

const categories = [
  {
    title: "Frontend",
    icon: "⌨",
    skills: [
      { name: "HTML5", percent: 95 },
      { name: "CSS3 / Tailwind", percent: 95 },
      { name: "JavaScript ES6+", percent: 85 },
      { name: "React.js", percent: 85 },
      { name: "Next.js", percent: 80 },
      { name: "Responsive Design", percent: 90 },
    ],
    color: "#FF6B00",
  },
  {
    title: "Design & UX",
    icon: "◎",
    skills: [
      { name: "UX Design", percent: 80 },
      { name: "Figma", percent: 85 },
      { name: "Copywriting Web", percent: 90 },
      { name: "Photoshop", percent: 40 },
      { name: "Design Graphique", percent: 45 },
    ],
    color: "#00D4FF",
  },
  {
    title: "Backend & Outils",
    icon: "◈",
    skills: [
      { name: "Firebase", percent: 90 },
      { name: "Supabase", percent: 90 },
      { name: "Git / GitHub", percent: 92 },
      { name: "API REST", percent: 85 },
      { name: "SEO", percent: 80 },
      { name: "Vercel / Netlify", percent: 95 },
      { name: "FedaPay", percent: 95 },
    ],
    color: "#A78BFA",
  },
];

function SkillBar({ name, percent, color, delay }: { name: string; percent: number; color: string; delay: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(percent), delay * 1000 + 200);
    return () => clearTimeout(t);
  }, [percent, delay]);

  const levelLabel =
    percent >= 90 ? "Expert" : percent >= 75 ? "Avancé" : percent >= 55 ? "Intermédiaire" : "Apprenti";

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{levelLabel}</span>
          <span className="font-mono text-xs text-muted-foreground tabular-nums">{percent}%</span>
        </div>
      </div>
      <div className="relative h-[3px] bg-border/40 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: color, width: `${width}%`, boxShadow: `0 0 8px ${color}50` }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}

export function SkillsPage() {
  const { lang } = useTranslation();

  const title = lang === "fr" ? "Matrice de Compétences" : "Skill Matrix";
  const subtitle = lang === "fr"
    ? "Un écosystème de savoirs construit au quotidien, orienté vers la création de produits digitaux premium pour l'Afrique."
    : "A knowledge ecosystem built daily, oriented toward creating premium digital products for Africa.";

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-56px)] px-4 sm:px-6 md:px-12 lg:px-20 pt-6 md:pt-16 pb-4">
        <div className="max-w-7xl mx-auto">

          <div className="mb-14">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xs text-primary tracking-widest uppercase mb-3"
            >
              — {lang === "fr" ? "Arsenal Technique" : "Technical Arsenal"}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display font-extrabold text-[clamp(2.5rem,6vw,5rem)] tracking-tighter text-foreground leading-none mb-4"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-base max-w-xl leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {categories.map((cat, ci) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.1 + 0.15, duration: 0.5 }}
                className="relative border border-border/50 rounded-2xl p-7 bg-card overflow-hidden hover:border-primary/20 transition-all duration-300"
              >
                <div
                  className="absolute top-0 left-8 right-8 h-[2px] rounded-full opacity-60"
                  style={{ background: cat.color }}
                />
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-xl" style={{ color: cat.color }}>{cat.icon}</span>
                  <h2 className="font-display font-bold text-lg text-foreground">{cat.title}</h2>
                  <span className="ml-auto font-mono text-[10px] text-muted-foreground/50">
                    {cat.skills.length} {lang === "fr" ? "comp." : "skills"}
                  </span>
                </div>
                <div className="space-y-5">
                  {cat.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      percent={skill.percent}
                      color={cat.color}
                      delay={ci * 0.1 + si * 0.06}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 border border-border/50 rounded-2xl p-7 bg-card"
          >
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-5">
              {lang === "fr" ? "Technologies maîtrisées" : "Technologies used"}
            </div>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Firebase", "Supabase", "Vercel", "Git", "Figma", "FedaPay", "MTN MoMo", "API REST", "PWA", "SEO", "WebGL"].map(tech => (
                <span key={tech} className="px-3 py-1.5 rounded-lg border border-border/60 font-mono text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all duration-200 cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
