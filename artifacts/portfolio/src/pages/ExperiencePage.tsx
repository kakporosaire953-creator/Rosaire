import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { useTranslation } from "@/context/TranslationContext";

const timelineFr = [
  {
    year: "2026",
    period: "Mai 2026",
    title: "Arduino Days 2026",
    entity: "Sèmè City Open Park",
    location: "Cotonou, Bénin",
    desc: "Participation au challenge national Arduino Days à Sèmè City — exploration de l'IoT, de la robotique et des innovations hardwares appliquées à l'Afrique.",
    status: "completed",
    type: "event",
    icon: "◎",
  },
  {
    year: "2025 – …",
    period: "En cours",
    title: "Spécialisation E-commerce & African Digital",
    entity: "Autodidacte",
    location: "Bénin / Afrique de l'Ouest",
    desc: "Spécialisation autonome dans la création de marketplaces et d'écosystèmes e-commerce adaptés au marché africain — intégration FedaPay, MTN MoMo, expériences UX mobiles.",
    status: "ongoing",
    type: "self",
    icon: "◈",
  },
  {
    year: "2024",
    period: "Accompli",
    title: "MIABE Hackathon",
    entity: "Certification officielle",
    location: "Bénin",
    desc: "Certification de formation en développement et innovation numérique lors du hackathon MIABE — compétition nationale de design de solutions tech.",
    status: "completed",
    type: "award",
    icon: "★",
  },
  {
    year: "2023 – …",
    period: "Formation en cours",
    title: "Formation Full-Stack",
    entity: "Institut Universitaire Les Cours Sonou",
    location: "Cotonou, Bénin",
    desc: "Formation intensive en développement web full-stack — architecture logicielle, bases de données, interfaces modernes, et product design.",
    status: "ongoing",
    type: "education",
    icon: "⌑",
  },
];

const timelineEn = [
  {
    year: "2026",
    period: "May 2026",
    title: "Arduino Days 2026",
    entity: "Sèmè City Open Park",
    location: "Cotonou, Benin",
    desc: "Participation in the national Arduino Days challenge at Sèmè City — exploring IoT, robotics, and hardware innovations applied to Africa.",
    status: "completed",
    type: "event",
    icon: "◎",
  },
  {
    year: "2025 – …",
    period: "Ongoing",
    title: "E-commerce & African Digital Specialization",
    entity: "Self-taught",
    location: "Benin / West Africa",
    desc: "Independent specialization in building marketplaces and e-commerce ecosystems adapted to the African market — FedaPay, MTN MoMo integration, mobile UX experiences.",
    status: "ongoing",
    type: "self",
    icon: "◈",
  },
  {
    year: "2024",
    period: "Completed",
    title: "MIABE Hackathon",
    entity: "Official Certification",
    location: "Benin",
    desc: "Certified in development and digital innovation at the MIABE Hackathon — national competition for tech solution design.",
    status: "completed",
    type: "award",
    icon: "★",
  },
  {
    year: "2023 – …",
    period: "Ongoing",
    title: "Full-Stack Training",
    entity: "Institut Universitaire Les Cours Sonou",
    location: "Cotonou, Benin",
    desc: "Intensive full-stack web development training — software architecture, databases, modern interfaces, and product design.",
    status: "ongoing",
    type: "education",
    icon: "⌑",
  },
];

const colorMap: Record<string, string> = {
  event: "#00D4FF",
  self: "#FF6B00",
  award: "#F5C842",
  education: "#A78BFA",
};

export function ExperiencePage() {
  const { lang } = useTranslation();
  const timeline = lang === "fr" ? timelineFr : timelineEn;
  const title = lang === "fr" ? "Parcours" : "Journey";
  const subtitle = lang === "fr"
    ? "Un chemin tracé avec intention, depuis Cotonou vers les frontières de l'innovation africaine."
    : "A path carved with intention, from Cotonou to the frontiers of African innovation.";

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-56px)] px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xs text-primary tracking-widest uppercase mb-3"
            >
              — {lang === "fr" ? "Chronologie" : "Timeline"}
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
              className="text-muted-foreground text-base max-w-lg leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border/40" />

            <div className="space-y-10">
              {timeline.map((item, i) => {
                const color = colorMap[item.type];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex gap-8"
                  >
                    {/* Node */}
                    <div className="relative flex-shrink-0 flex flex-col items-center">
                      <div
                        className="w-10 h-10 rounded-xl border flex items-center justify-center text-base font-bold z-10 bg-card"
                        style={{
                          borderColor: color + "40",
                          color,
                          boxShadow: `0 0 20px ${color}20`,
                        }}
                      >
                        {item.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className="flex-1 border border-border/50 rounded-2xl p-6 bg-card hover:border-primary/20 transition-all duration-300 group mb-2"
                      style={{ borderLeft: `3px solid ${color}30` }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-0.5">
                            {item.title}
                          </h3>
                          <p className="font-medium text-sm text-foreground/60">{item.entity}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-xs" style={{ color }}>{item.period}</div>
                          <div className="font-mono text-[10px] text-muted-foreground mt-0.5">{item.location}</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>

                      <div className="mt-4 flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: item.status === "ongoing" ? "#22C55E" : color }}
                        />
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                          {item.status === "ongoing"
                            ? (lang === "fr" ? "En cours" : "Ongoing")
                            : (lang === "fr" ? "Accompli" : "Completed")}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
