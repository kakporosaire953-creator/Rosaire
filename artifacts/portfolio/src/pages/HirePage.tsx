import { PageTransition } from "@/components/PageTransition";
import { useTranslation } from "@/context/TranslationContext";
import { motion } from "framer-motion";
import { Zap, Shield, Rocket, Cpu, Palette, LineChart } from "lucide-react";
import { Link } from "wouter";

export function HirePage() {
  const { t } = useTranslation();
  const services = t("hire.services");

  const icons = [
    <Zap className="w-6 h-6 text-primary" />,
    <Shield className="w-6 h-6 text-secondary" />,
    <Rocket className="w-6 h-6 text-primary" />,
    <Cpu className="w-6 h-6 text-secondary" />,
    <Palette className="w-6 h-6 text-primary" />,
    <LineChart className="w-6 h-6 text-secondary" />
  ];

  return (
    <PageTransition>
      <div className="py-12 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4 uppercase font-mono">
            {t("hire.title")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Architectures robustes, designs immersifs et intégrations IA sur-mesure pour propulser votre entreprise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service: any, i: number) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              key={i}
              className="bg-card border border-card-border p-8 rounded-3xl relative overflow-hidden group hover:border-primary/50 hover:shadow-[0_0_30px_rgba(234,107,0,0.1)] transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl -mr-10 -mt-10" />
              
              <div className="mb-6 inline-flex p-4 rounded-2xl bg-background border border-border shadow-inner relative z-10">
                {icons[i]}
              </div>
              
              <h3 className="text-xl font-bold mb-3 relative z-10">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 relative z-10">
                {service.desc}
              </p>

              <div className="inline-block mt-auto font-mono text-xs font-bold px-3 py-1 bg-muted rounded-full text-foreground relative z-10">
                {t("hire.quote")}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(234,107,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(234,107,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Prêt à dominer le marché numérique africain ?</h2>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(234,107,0,0.5)] transition-all uppercase tracking-wider font-mono text-sm">
              Initier le contact
            </Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
