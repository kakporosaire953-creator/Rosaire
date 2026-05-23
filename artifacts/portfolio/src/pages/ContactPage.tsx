import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { useTranslation } from "@/context/TranslationContext";
import { motion } from "framer-motion";
import { Github, Twitter, MapPin, CheckCircle2, Send } from "lucide-react";
import { Link } from "wouter";

export function ContactPage() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Fake API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="py-12 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2 uppercase font-mono">
            {t("contact.title")}
          </h1>
          <div className="h-1 w-24 bg-primary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-card border border-card-border rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[300px] flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold font-mono text-green-500">Transmission OK</h3>
                  <p className="text-muted-foreground">{t("contact.form.success")}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      {t("contact.form.name")}
                    </label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono"
                      placeholder="_"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      {t("contact.form.email")}
                    </label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono"
                      placeholder="_"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      {t("contact.form.message")}
                    </label>
                    <textarea 
                      required
                      rows={5}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono resize-none"
                      placeholder="_"
                    />
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 hover:shadow-[0_0_20px_rgba(234,107,0,0.4)]"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Transmitting...</span>
                    ) : (
                      <>
                        {t("contact.form.submit")} <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-card border border-card-border rounded-3xl p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider font-mono">Location</div>
                  <div className="font-bold text-lg">{t("contact.info.location")}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider font-mono">Status</div>
                  <div className="font-bold text-lg">{t("contact.info.availability")}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <a href="https://github.com/kakporosaire953-creator" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center gap-3 bg-card border border-card-border p-6 rounded-3xl hover:bg-muted hover:border-primary/50 transition-all group">
                <Github className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-sm">GitHub</span>
              </a>
              <a href="https://twitter.com/RosaireKAKPO" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center gap-3 bg-card border border-card-border p-6 rounded-3xl hover:bg-muted hover:border-secondary/50 transition-all group">
                <Twitter className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-sm">Twitter/X</span>
              </a>
            </div>

            <Link href="/hire" className="block w-full py-4 text-center rounded-3xl border border-primary/30 bg-primary/5 text-primary font-bold hover:bg-primary/10 transition-all font-mono uppercase tracking-widest">
              {'//'} Initialiser une mission
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
