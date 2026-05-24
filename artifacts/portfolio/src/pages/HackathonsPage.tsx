// AJOUT — Section Hackathons & Certifications
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { useTranslation } from "@/context/TranslationContext";
import { ExternalLink, X, ZoomIn } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface HackCard {
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  link?: string;
  certImg?: string;        // chemin depuis /public/assets/certs/
  certAlt?: string;
  icon: string;
}

// ─── Data (bilingue) ─────────────────────────────────────────────────────────

// AJOUT — Données Hackathon MIABE
const cardsFr: HackCard[] = [
  {
    badge: "Hackathon",
    badgeColor: "#FF6B00",
    title: "MIABE Hackathon 2026 — Édition Blockchain",
    subtitle: "Projet TontineChain · Équipe BJ-03 · 7e place / 8 équipes",
    desc: "Conception et développement d'une plateforme de tontines sécurisées sur la blockchain. Thème : Blockchain pour le développement durable en Afrique.",
    tags: ["Blockchain", "Smart Contracts", "Web3", "Bénin"],
    link: "https://tontine-chain-pied.vercel.app",
    icon: "🏆",
  },
  {
    badge: "Certification",
    badgeColor: "#34D399",
    title: "InnerBuild Challenge — Saison 1",
    subtitle: "🥉 3e place · Build in Public · 7 jours",
    desc: "Challenge de construction publique sur 7 jours. Documentation quotidienne du processus de développement. 3e place au classement général.",
    tags: ["Build in Public", "Challenge", "Communauté"],
    certImg: "/assets/certs/innerbuild-cert.jpg",
    certAlt: "Certificat InnerBuild Challenge Saison 1",
    icon: "🎖",
  },
  {
    badge: "Formation",
    badgeColor: "#60A5FA",
    title: "Formation MIABE Hackathon 2026",
    subtitle: "Certification officielle · Blockchain & Innovation",
    desc: "Formation intensive dispensée dans le cadre du MIABE Hackathon 2026, couvrant les fondamentaux blockchain, le développement de smart contracts et l'innovation technologique pour le développement durable en Afrique.",
    tags: ["Blockchain", "Formation", "Smart Contracts", "MIABE"],
    certImg: "/assets/certs/miabe-formation.jpg",
    certAlt: "Certificat de formation MIABE Hackathon 2026",
    icon: "📜",
  },
];

// AJOUT — Version anglaise
const cardsEn: HackCard[] = [
  {
    badge: "Hackathon",
    badgeColor: "#FF6B00",
    title: "MIABE Hackathon 2026 — Blockchain Edition",
    subtitle: "TontineChain Project · Team BJ-03 · 7th place / 8 teams",
    desc: "Design and development of a secure blockchain-based tontine platform. Theme: Blockchain for Sustainable Development in Africa.",
    tags: ["Blockchain", "Smart Contracts", "Web3", "Benin"],
    link: "https://tontine-chain-pied.vercel.app",
    icon: "🏆",
  },
  {
    badge: "Certification",
    badgeColor: "#34D399",
    title: "InnerBuild Challenge — Season 1",
    subtitle: "🥉 3rd place · Build in Public · 7 days",
    desc: "7-day public building challenge. Daily documentation of the development process. 3rd place in the general leaderboard.",
    tags: ["Build in Public", "Challenge", "Community"],
    certImg: "/assets/certs/innerbuild-cert.jpg",
    certAlt: "InnerBuild Challenge Season 1 Certificate",
    icon: "🎖",
  },
  {
    badge: "Training",
    badgeColor: "#60A5FA",
    title: "MIABE Hackathon 2026 Training",
    subtitle: "Official Certification · Blockchain & Innovation",
    desc: "Intensive training delivered as part of the MIABE Hackathon 2026, covering blockchain fundamentals, smart contract development, and tech innovation for sustainable development in Africa.",
    tags: ["Blockchain", "Training", "Smart Contracts", "MIABE"],
    certImg: "/assets/certs/miabe-formation.jpg",
    certAlt: "MIABE Hackathon 2026 Training Certificate",
    icon: "📜",
  },
];

// ─── Certificate lightbox ────────────────────────────────────────────────────

// AJOUT — Lightbox pour les certificats
function CertLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <motion.img
          src={src}
          alt={alt}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="relative z-10 max-w-full max-h-[85vh] rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.8)] object-contain"
          onClick={e => e.stopPropagation()}
        />
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Single card ─────────────────────────────────────────────────────────────

// AJOUT — Carte individuelle hackathon/certification
function HackCard({ card, index }: { card: HackCard; index: number }) {
  const [certOpen, setCertOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 + 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="group relative flex flex-col border border-border/50 rounded-2xl overflow-hidden bg-card hover:border-primary/20 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.15)]"
      >
        {/* Top colored bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-70 transition-opacity group-hover:opacity-100"
          style={{ background: card.badgeColor }}
        />

        {/* Subtle glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none rounded-2xl"
          style={{ background: card.badgeColor }}
        />

        <div className="flex flex-col flex-1 p-6">
          {/* Badge + icon */}
          <div className="flex items-center justify-between mb-5">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] tracking-wider uppercase font-semibold"
              style={{ background: `${card.badgeColor}18`, color: card.badgeColor, border: `1px solid ${card.badgeColor}35` }}
            >
              {card.badge}
            </span>
            <span className="text-2xl">{card.icon}</span>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-base sm:text-lg text-foreground leading-snug mb-2">
            {card.title}
          </h3>

          {/* Subtitle */}
          <p className="font-mono text-xs text-muted-foreground mb-4 leading-relaxed">
            {card.subtitle}
          </p>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
            {card.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {card.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md font-mono text-[10px] text-muted-foreground border border-border/60 bg-muted/30"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Certificate image — AJOUT certificat cliquable */}
          {card.certImg && !imgError && (
            <button
              onClick={() => setCertOpen(true)}
              className="group/cert relative w-full rounded-xl overflow-hidden border border-border/40 mb-4 hover:border-primary/30 transition-colors"
              style={{ aspectRatio: "4/3" }}
              title="Voir le certificat"
            >
              <img
                src={card.certImg}
                alt={card.certAlt}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-transform duration-300 group-hover/cert:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/cert:bg-black/30 transition-colors flex items-center justify-center">
                <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover/cert:opacity-100 transition-opacity" />
              </div>
              <span className="absolute bottom-2 right-2 font-mono text-[9px] text-white/60 bg-black/40 px-2 py-0.5 rounded">
                certificate-img
              </span>
            </button>
          )}

          {/* Placeholder when no image yet or error — AJOUT placeholder certificat */}
          {card.certImg && imgError && (
            <div
              className="w-full rounded-xl border border-dashed border-border/40 flex flex-col items-center justify-center gap-2 mb-4 text-muted-foreground/40"
              style={{ aspectRatio: "4/3" }}
            >
              <span className="text-3xl">🖼</span>
              <span className="font-mono text-[10px] text-center px-4">
                {card.certImg.split("/").pop()}<br />
                <span className="text-[9px] opacity-60">Déposez le fichier ici</span>
              </span>
            </div>
          )}

          {/* Link */}
          {card.link && (
            <a
              href={card.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs group/link w-fit"
              style={{ color: card.badgeColor }}
            >
              Voir le projet
              <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>
      </motion.div>

      {/* Cert lightbox */}
      {certOpen && card.certImg && !imgError && (
        <CertLightbox
          src={card.certImg}
          alt={card.certAlt ?? "Certificat"}
          onClose={() => setCertOpen(false)}
        />
      )}
    </>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

// AJOUT — Page principale Hackathons & Certifications
export function HackathonsPage() {
  const { lang } = useTranslation();
  const cards = lang === "fr" ? cardsFr : cardsEn;

  const title  = lang === "fr" ? "Hackathons & Certifications" : "Hackathons & Certifications";
  const label  = lang === "fr" ? "Réalisations" : "Achievements";
  const subtitle = lang === "fr"
    ? "Compétitions, défis publics et formations certifiantes — chaque expérience forge les compétences."
    : "Competitions, public challenges, and certified training — each experience forges the skills.";

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-56px)] px-4 sm:px-6 md:px-12 lg:px-20 pt-6 md:pt-16 pb-4">
        <div className="max-w-7xl mx-auto">

          {/* Header — AJOUT en-tête de page */}
          <div className="mb-10 md:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xs text-primary tracking-widest uppercase mb-3"
            >
              — {label}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display font-extrabold text-[clamp(2rem,6vw,5rem)] tracking-tighter text-foreground leading-none mb-4"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-base max-w-2xl leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Cards grid — AJOUT grille 3 cols / 2 tablette / 1 mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {cards.map((card, i) => (
              <HackCard key={card.title} card={card} index={i} />
            ))}
          </div>

          {/* Instructions dépôt images — AJOUT aide utilisateur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 p-4 rounded-xl border border-dashed border-border/40 bg-muted/10"
          >
            <p className="font-mono text-[11px] text-muted-foreground/60 leading-relaxed">
              <span className="text-primary/60">// </span>
              {lang === "fr"
                ? "Pour ajouter vos certificats : déposez les fichiers dans "
                : "To add your certificates: drop files in "}
              <span className="text-primary/80">public/assets/certs/</span>
              {lang === "fr"
                ? " avec les noms : innerbuild-cert.jpg · miabe-formation.jpg"
                : " with names: innerbuild-cert.jpg · miabe-formation.jpg"}
            </p>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
}
