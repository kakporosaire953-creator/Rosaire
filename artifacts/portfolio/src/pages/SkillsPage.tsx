import { PageTransition } from "@/components/PageTransition";
import { useTranslation } from "@/context/TranslationContext";
import { motion } from "framer-motion";
import { Code2, MonitorPlay, Database } from "lucide-react";

export function SkillsPage() {
  const { t } = useTranslation();
  const categories = t("skills.categories");

  const icons = [
    <MonitorPlay className="w-8 h-8 text-primary" />,
    <Code2 className="w-8 h-8 text-secondary" />,
    <Database className="w-8 h-8 text-primary" />
  ];

  return (
    <PageTransition>
      <div className="py-12 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2 uppercase font-mono">
            {t("skills.title")}
          </h1>
          <div className="h-1 w-24 bg-primary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat: any, i: number) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              key={cat.title}
              className="bg-card border border-card-border rounded-3xl p-8 hover:border-primary/30 transition-colors relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="p-3 bg-background rounded-2xl border border-border shadow-inner">
                  {icons[i]}
                </div>
                <h2 className="text-2xl font-bold">{cat.title}</h2>
              </div>

              <div className="space-y-6 relative z-10">
                {cat.items.map((skill: any, j: number) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-xs font-mono text-muted-foreground bg-background px-2 py-1 rounded-md border border-border">
                        {skill.level}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border/50">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: j * 0.1 + 0.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
