// AJOUT — Section Galerie photos "En coulisses"
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { useTranslation } from "@/context/TranslationContext";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface GalleryPhoto {
  src: string;           // chemin depuis /public/assets/photos/
  captionFr: string;
  captionEn: string;
  placeholderColor: string; // couleur affichée si image manquante
}

// ─── Photos data ─────────────────────────────────────────────────────────────

// AJOUT — Données des photos (remplacer src par les vraies images)
const photos: GalleryPhoto[] = [
  {
    src: "/assets/photos/photo1.jpg",
    captionFr: "Arduino Days 2026 — Sèmè City",
    captionEn: "Arduino Days 2026 — Sèmè City",
    placeholderColor: "#FF6B0015",
  },
  {
    src: "/assets/photos/photo2.jpg",
    captionFr: "MIABE Hackathon 2026 — Équipe BJ-03",
    captionEn: "MIABE Hackathon 2026 — Team BJ-03",
    placeholderColor: "#00D4FF15",
  },
  {
    src: "/assets/photos/photo3.jpg",
    captionFr: "Présentation du projet TontineChain",
    captionEn: "TontineChain project presentation",
    placeholderColor: "#A78BFA15",
  },
  {
    src: "/assets/photos/photo4.jpg",
    captionFr: "Cérémonie de remise des prix — MIABE",
    captionEn: "Awards ceremony — MIABE",
    placeholderColor: "#F5C84215",
  },
  {
    src: "/assets/photos/photo5.jpg",
    captionFr: "Session de développement · Cotonou",
    captionEn: "Development session · Cotonou",
    placeholderColor: "#34D39915",
  },
  {
    src: "/assets/photos/photo6.jpg",
    captionFr: "InnerBuild Challenge — Build in Public",
    captionEn: "InnerBuild Challenge — Build in Public",
    placeholderColor: "#FB923C15",
  },
];

// ─── Lightbox ────────────────────────────────────────────────────────────────

// AJOUT — Lightbox plein écran avec navigation prev/next + Escape
interface LightboxProps {
  photos: GalleryPhoto[];
  initialIndex: number;
  lang: "fr" | "en";
  onClose: () => void;
}

function Lightbox({ photos, initialIndex, lang, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const prev = useCallback(() => setCurrent(c => (c - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setCurrent(c => (c + 1) % photos.length), [photos.length]);

  // AJOUT — Navigation clavier (Escape, flèches)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  const photo = photos[current];
  const caption = lang === "fr" ? photo.captionFr : photo.captionEn;
  const hasError = imgErrors[current];

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 z-20 font-mono text-xs text-white/50">
        {current + 1} / {photos.length}
      </div>

      {/* Image area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative z-10 flex items-center justify-center"
          onClick={e => e.stopPropagation()}
          style={{ maxWidth: "min(90vw, 900px)", maxHeight: "75vh" }}
        >
          {!hasError ? (
            <img
              src={photo.src}
              alt={caption}
              onError={() => setImgErrors(prev => ({ ...prev, [current]: true }))}
              className="max-w-full max-h-[75vh] rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.9)] object-contain"
            />
          ) : (
            /* AJOUT — Placeholder lightbox si image manquante */
            <div
              className="rounded-2xl flex flex-col items-center justify-center gap-4 text-white/30"
              style={{ width: 480, height: 360, background: photo.placeholderColor, border: "1px dashed rgba(255,255,255,0.1)" }}
            >
              <span className="text-5xl">🖼</span>
              <div className="text-center font-mono text-xs px-8">
                <div className="mb-1 opacity-60">{photo.src.split("/").pop()}</div>
                <div className="text-[10px] opacity-40">
                  {lang === "fr" ? "Déposez dans public/assets/photos/" : "Drop in public/assets/photos/"}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Caption */}
      <motion.p
        key={`cap-${current}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 mt-5 font-mono text-sm text-white/60 text-center px-4"
      >
        {caption}
      </motion.p>

      {/* Prev / Next buttons */}
      <button
        onClick={e => { e.stopPropagation(); prev(); }}
        className="absolute left-3 sm:left-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={e => { e.stopPropagation(); next(); }}
        className="absolute right-3 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Thumbnails row */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2 px-4">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); setCurrent(i); }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === current ? "bg-primary scale-125" : "bg-white/30 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Gallery item ────────────────────────────────────────────────────────────

// AJOUT — Carte photo individuelle avec hover overlay
interface GalleryItemProps {
  photo: GalleryPhoto;
  index: number;
  lang: "fr" | "en";
  onClick: (index: number) => void;
}

function GalleryItem({ photo, index, lang, onClick }: GalleryItemProps) {
  const [imgError, setImgError] = useState(false);
  const caption = lang === "fr" ? photo.captionFr : photo.captionEn;

  return (
    <motion.div
      className="gallery-item group relative overflow-hidden rounded-2xl border border-border/40 cursor-pointer bg-card"
      style={{ aspectRatio: "4/3" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 + 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -3 }}
      onClick={() => onClick(index)}
    >
      {!imgError ? (
        <>
          {/* Photo */}
          <img
            src={photo.src}
            alt={caption}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {/* Overlay */}
          <div className="gallery-overlay absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300 flex flex-col items-start justify-end p-4">
            <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between w-full gap-2">
              <span className="font-mono text-xs text-white/90 leading-snug flex-1">{caption}</span>
              <ZoomIn className="w-4 h-4 text-white/70 shrink-0" />
            </div>
          </div>
        </>
      ) : (
        /* AJOUT — Placeholder si l'image n'est pas encore déposée */
        <div
          className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground/40"
          style={{ background: photo.placeholderColor }}
          data-caption={caption}
        >
          <span className="text-4xl">🖼</span>
          <div className="text-center font-mono text-[10px] px-4">
            <div className="mb-0.5 opacity-60">{photo.src.split("/").pop()}</div>
            <div className="text-[9px] opacity-40">public/assets/photos/</div>
          </div>
          {/* Overlay still appears on hover for placeholders */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-4">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs text-white/70 leading-snug">
              {caption}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

// AJOUT — Page galerie photos principale
export function GalleryPage() {
  const { lang } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const title   = lang === "fr" ? "En coulisses" : "Behind the Scenes";
  const label   = lang === "fr" ? "Galerie" : "Gallery";
  const subtitle = lang === "fr"
    ? "Les moments, les événements, les rencontres qui forgent le parcours. Cliquez sur une photo pour l'agrandir."
    : "The moments, events, and encounters that shape the journey. Click a photo to zoom in.";

  const addText = lang === "fr"
    ? "Pour ajouter vos photos : déposez les fichiers photo1.jpg … photo6.jpg dans"
    : "To add your photos: drop files photo1.jpg … photo6.jpg into";

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-56px)] px-4 sm:px-6 md:px-12 lg:px-20 pt-6 md:pt-16 pb-4">
        <div className="max-w-7xl mx-auto">

          {/* Header — AJOUT en-tête */}
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

          {/* Gallery grid — AJOUT grille 3/2/1 cols */}
          <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo, i) => (
              <GalleryItem
                key={photo.src}
                photo={photo}
                index={i}
                lang={lang}
                onClick={setLightboxIndex}
              />
            ))}
          </div>

          {/* Instructions — AJOUT aide dépôt images */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 p-4 rounded-xl border border-dashed border-border/40 bg-muted/10"
          >
            <p className="font-mono text-[11px] text-muted-foreground/60 leading-relaxed">
              <span className="text-primary/60">// </span>
              {addText}{" "}
              <span className="text-primary/80">public/assets/photos/</span>
              {lang === "fr"
                ? " — les images apparaîtront automatiquement."
                : " — images will appear automatically."}
            </p>
          </motion.div>

        </div>
      </div>

      {/* Lightbox — AJOUT modale plein écran */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            initialIndex={lightboxIndex}
            lang={lang}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
