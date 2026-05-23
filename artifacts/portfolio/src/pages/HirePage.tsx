import { motion } from "framer-motion";
import { Link } from "wouter";
import { PageTransition } from "@/components/PageTransition";
import { useTranslation } from "@/context/TranslationContext";
import { ArrowUpRight } from "lucide-react";

const servicesFr = [
  {
    num: "01",
    title: "Développement Frontend",
    desc: "Sites web, dashboards, interfaces IA ultra-performantes. Code propre, animations cinématiques, mobile-first.",
    tags: ["React", "Next.js", "Framer Motion"],
    color: "#FF6B00",
  },
  {
    num: "02",
    title: "Développement E-commerce",
    desc: "Boutiques en ligne optimisées pour le marché africain. Intégration des solutions de paiement mobile (FedaPay, MTN MoMo, Moov Money).",
    tags: ["Next.js", "FedaPay", "Supabase"],
    color: "#F5C842",
  },
  {
    num: "03",
    title: "Création Marketplace",
    desc: "Plateformes multi-vendeurs robustes. Gestion des vendeurs, paiements, commandes et dashboards analytics.",
    tags: ["React", "Firebase", "MTN MoMo"],
    color: "#00D4FF",
  },
  {
    num: "04",
    title: "Intégrations IA",
    desc: "Chatbots intelligents, interfaces IA, automatisations sur-mesure. L'intelligence au service de votre produit.",
    tags: ["OpenAI API", "React", "Edge Functions"],
    color: "#A78BFA",
  },
  {
    num: "05",
    title: "UX Design",
    desc: "Wireframes, prototypes Figma, audits UX. Des interfaces pensées pour convertir et fidéliser.",
    tags: ["Figma", "Prototypage", "Audit UX"],
    color: "#34D399",
  },
  {
    num: "06",
    title: "Consulting Digital Africain",
    desc: "Stratégie produit, choix technique, positionnement. Une expertise orientée vers les réalités du marché africain.",
    tags: ["Stratégie", "Product", "Africa Tech"],
    color: "#FB923C",
  },
];

const servicesEn = [
  {
    num: "01",
    title: "Frontend Development",
    desc: "Ultra-performant websites, dashboards, and AI interfaces. Clean code, cinematic animations, mobile-first.",
    tags: ["React", "Next.js", "Framer Motion"],
    color: "#FF6B00",
  },
  {
    num: "02",
    title: "E-commerce Development",
    desc: "Online stores optimized for the African market. Mobile payment integration (FedaPay, MTN MoMo, Moov Money).",
    tags: ["Next.js", "FedaPay", "Supabase"],
    color: "#F5C842",
  },
  {
    num: "03",
    title: "Marketplace Creation",
    desc: "Robust multi-vendor platforms. Vendor management, payments, orders, and analytics dashboards.",
    tags: ["React", "Firebase", "MTN MoMo"],
    color: "#00D4FF",
  },
  {
    num: "04",
    title: "AI Integrations",
    desc: "Smart chatbots, AI interfaces, custom automations. Intelligence at the service of your product.",
    tags: ["OpenAI API", "React", "Edge Functions"],
    color: "#A78BFA",
  },
  {
    num: "05",
    title: "UX Design",
    desc: "Wireframes, Figma prototypes, UX audits. Interfaces designed to convert and retain.",
    tags: ["Figma", "Prototyping", "UX Audit"],
    color: "#34D399",
  },
  {
    num: "06",
    title: "African Digital Consulting",
    desc: "Product strategy, tech choices, positioning. Expertise oriented toward the realities of the African market.",
    tags: ["Strategy", "Product", "Africa Tech"],
    color: "#FB923C",
  },
];

const workflowFr = ["Échange initial", "Proposition & Devis", "Design & Validation", "Développement", "Tests & Livraison"];
const workflowEn = ["Initial Talk", "Proposal & Quote", "Design & Validation", "Development", "Testing & Delivery"];

export function HirePage() {
  const { lang } = useTranslation();
  const services = lang === "fr" ? servicesFr : servicesEn;
  const workflow = lang === "fr" ? workflowFr : workflowEn;

  const title = lang === "fr" ? "Services" : "Services";
  const subtitle = lang === "fr"
    ? "Des solutions e-commerce et web premium, conçues pour l'Afrique et au-delà. Délai moyen : 3 semaines."
    : "Premium e-commerce and web solutions, built for Africa and beyond. Average delivery: 3 weeks.";
  const quoteText = lang === "fr" ? "Sur devis" : "On quote";
  const ctaText = lang === "fr" ? "Démarrer un projet" : "Start a project";
  const processTitle = lang === "fr" ? "Mon Processus" : "My Process";

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-56px)] px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-14">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xs text-primary tracking-widest uppercase mb-3"
            >
              — {lang === "fr" ? "Travailler ensemble" : "Work together"}
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

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {services.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.15, duration: 0.4 }}
                className="group relative border border-border/50 rounded-2xl p-6 bg-card hover:border-primary/25 transition-all duration-300 hover:shadow-[0_4px_30px_rgba(0,0,0,0.08)] overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-50"
                  style={{ background: s.color }}
                />
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-[10px] text-muted-foreground/40 tabular-nums">{s.num}</span>
                  <span
                    className="font-mono text-[10px] px-2.5 py-1 rounded-full border"
                    style={{ color: s.color, borderColor: s.color + "30", background: s.color + "10" }}
                  >
                    {quoteText}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map(tag => (
                    <span key={tag} className="font-mono text-[10px] px-2 py-1 rounded-md border border-border/50 text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="border border-border/50 rounded-2xl p-8 bg-card mb-8"
          >
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-7">{processTitle}</div>
            <div className="flex flex-wrap gap-0">
              {workflow.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-mono text-[10px] text-primary font-bold">
                      {i + 1}
                    </div>
                    <span className="text-sm text-foreground font-medium">{step}</span>
                  </div>
                  {i < workflow.length - 1 && (
                    <div className="w-8 h-px bg-border/60 mx-2 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="text-center"
          >
            <Link href="/contact">
              <motion.div
                data-testid="btn-start-project"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-base rounded-xl shadow-[0_0_30px_rgba(255,110,0,0.3)] hover:shadow-[0_0_50px_rgba(255,110,0,0.5)] transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {ctaText}
                <ArrowUpRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
