import { PageTransition } from "@/components/PageTransition";
import { useTranslation } from "@/context/TranslationContext";
import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase, GraduationCap } from "lucide-react";

export function ExperiencePage() {
  const { t } = useTranslation();
  const items = t("experience.items");

  return (
    <PageTransition>
      <div className="py-12 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2 uppercase font-mono">
            {t("experience.title")}
          </h1>
          <div className="h-1 w-24 bg-primary rounded-full" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          {items.map((item: any, i: number) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start mb-16 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Node */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary -translate-x-1/2 mt-6 shadow-[0_0_10px_rgba(234,107,0,0.8)] z-10">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-50" />
                </div>

                {/* Content */}
                <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <div className="bg-card border border-card-border p-6 rounded-2xl hover:border-primary/50 transition-colors shadow-lg group">
                    <div className={`inline-flex items-center gap-2 mb-3 text-xs font-mono px-3 py-1 rounded-full border ${
                      item.status === 'completed' ? 'text-green-500 border-green-500/20 bg-green-500/10' :
                      item.status === 'ongoing' ? 'text-secondary border-secondary/20 bg-secondary/10' :
                      'text-primary border-primary/20 bg-primary/10'
                    }`}>
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    
                    <div className={`flex flex-col gap-2 text-muted-foreground text-sm ${isEven ? "md:items-end" : ""}`}>
                      <div className="flex items-center gap-2">
                        {item.title.includes("Formation") ? <GraduationCap className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                        {item.entity}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
