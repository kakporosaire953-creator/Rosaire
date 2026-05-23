import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { useTranslation } from "@/context/TranslationContext";
import { Github, MapPin, CheckCircle2, ArrowUpRight, Send } from "lucide-react";

export function ContactPage() {
  const { lang } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1400);
  };

  const fr = {
    title: "Contact",
    subtitle: "Un projet en tête ? Une collaboration à envisager ? Je réponds vite.",
    namePlaceholder: "Votre nom",
    emailPlaceholder: "votre@email.com",
    messagePlaceholder: "Décrivez votre projet ou votre demande...",
    submit: "Envoyer le message",
    sending: "Envoi en cours...",
    success: "Message envoyé. Je vous recontacte sous 24h.",
    location: "Cotonou, Bénin",
    available: "Disponible pour missions freelance",
    whatsapp: "WhatsApp — Réponse rapide",
    github: "GitHub",
    twitter: "Twitter / X",
  };

  const en = {
    title: "Contact",
    subtitle: "A project in mind? A collaboration to explore? I respond quickly.",
    namePlaceholder: "Your name",
    emailPlaceholder: "your@email.com",
    messagePlaceholder: "Describe your project or request...",
    submit: "Send message",
    sending: "Sending...",
    success: "Message sent. I'll get back to you within 24h.",
    location: "Cotonou, Benin",
    available: "Available for freelance projects",
    whatsapp: "WhatsApp — Fast response",
    github: "GitHub",
    twitter: "Twitter / X",
  };

  const t = lang === "fr" ? fr : en;

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
              — {lang === "fr" ? "Communication" : "Communication"}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display font-extrabold text-[clamp(2.5rem,6vw,5rem)] tracking-tighter text-foreground leading-none mb-4"
            >
              {t.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-base max-w-xl"
            >
              {t.subtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Left: Info cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-2 space-y-4"
            >
              {/* Status card */}
              <div className="border border-border/50 rounded-2xl p-6 bg-card">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
                  <span className="font-mono text-xs text-emerald-500 uppercase tracking-wider">{t.available}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 shrink-0" />
                  {t.location}
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/22900000000"
                target="_blank"
                rel="noreferrer"
                data-testid="link-whatsapp"
                className="group flex items-center justify-between border border-border/50 hover:border-emerald-500/40 hover:bg-emerald-500/5 rounded-2xl p-5 bg-card transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <span className="text-emerald-500 text-base">◎</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm text-foreground">{t.whatsapp}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">+229 ···</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/kakporosaire953-creator"
                target="_blank"
                rel="noreferrer"
                data-testid="link-github"
                className="group flex items-center justify-between border border-border/50 hover:border-primary/40 hover:bg-primary/5 rounded-2xl p-5 bg-card transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Github className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-foreground">{t.github}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">kakporosaire953-creator</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Twitter */}
              <a
                href="https://twitter.com/RosaireKAKPO"
                target="_blank"
                rel="noreferrer"
                data-testid="link-twitter"
                className="group flex items-center justify-between border border-border/50 hover:border-secondary/40 hover:bg-secondary/5 rounded-2xl p-5 bg-card transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <span className="text-secondary text-sm font-bold">𝕏</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm text-foreground">{t.twitter}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">@RosaireKAKPO</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3 border border-border/50 rounded-2xl p-8 bg-card"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full min-h-[300px] text-center gap-6"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-xl text-foreground mb-2">{t.success}</div>
                      <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                        {lang === "fr" ? "Transmission réussie" : "Transmission successful"}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
                          {lang === "fr" ? "Nom" : "Name"}
                        </label>
                        <input
                          type="text"
                          required
                          data-testid="input-name"
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder={t.namePlaceholder}
                          className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background text-foreground placeholder:text-muted-foreground text-sm font-medium focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          data-testid="input-email"
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          placeholder={t.emailPlaceholder}
                          className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background text-foreground placeholder:text-muted-foreground text-sm font-medium focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
                        Message
                      </label>
                      <textarea
                        required
                        rows={6}
                        data-testid="input-message"
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        placeholder={t.messagePlaceholder}
                        className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background text-foreground placeholder:text-muted-foreground text-sm font-medium focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      data-testid="btn-submit-contact"
                      disabled={sending}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm shadow-[0_0_20px_rgba(255,110,0,0.25)] hover:shadow-[0_0_30px_rgba(255,110,0,0.4)] disabled:opacity-70 transition-all duration-300"
                    >
                      {sending ? (
                        <span className="font-mono text-xs">{t.sending}</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {t.submit}
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
