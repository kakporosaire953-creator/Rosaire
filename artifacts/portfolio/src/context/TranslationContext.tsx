import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "fr" | "en";

interface TranslationContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => any;
}

const translations = {
  fr: {
    // Nav
    "nav.home": "Accueil",
    "nav.projects": "Projets",
    "nav.skills": "Compétences",
    "nav.experience": "Parcours",
    "nav.contact": "Contact",
    "nav.hire": "Services",
    "nav.explore": "Labo",
    "nav.ai": "Terminal OS",
    
    // Home
    "home.subtitle": "Développeur Frontend • Créateur d'Expériences IA • Architecte E-commerce pour l'Afrique",
    "home.description": "Je crée des expériences digitales futuristes et des écosystèmes e-commerce premium pensés pour la nouvelle génération d'innovation africaine.",
    "home.cta.projects": "Découvrir mes projets",
    "home.cta.contact": "Me contacter",
    "home.stats.projects": "Projets",
    "home.stats.delivered": "Livré",
    "home.stats.delay": "Délai Moyen",
    "home.stats.weeks": "sem.",
    
    // Terminal
    "terminal.init": "Initialisation du système...",
    "terminal.ready": "Système Prêt.",

    // Projects
    "projects.title": "Univers Holographique",
    "projects.filter.all": "Tous",
    "projects.filter.completed": "Livrés",
    "projects.filter.ongoing": "En cours",
    "projects.items": [
      {
        id: "apple-confidence",
        title: "Apple Confidence",
        status: "completed",
        statusText: "COMPLETED",
        desc: "E-commerce smartphones Bénin. 20+ smartphones (iPhone, Samsung, Tecno, Redmi), système de filtres, responsive mobile-first. Livré en 3 semaines.",
        stack: ["Next.js", "React", "Tailwind"],
        live: "https://v0-apple-confidence.vercel.app/",
        github: "https://github.com/kakporosaire953-creator/apple-confidence"
      },
      {
        id: "skillbridge",
        title: "SkillBridge",
        status: "ongoing",
        statusText: "EN COURS",
        desc: "Plateforme sociale d'échange de compétences. Matching intelligent, messagerie temps réel Firebase, profils portfolios.",
        stack: ["React", "Firebase", "Tailwind"],
        github: "https://github.com/kakporosaire953-creator/skillbridge"
      },
      {
        id: "campusly",
        title: "Campusly",
        status: "ongoing",
        statusText: "EN COURS",
        desc: "PWA dédiée aux étudiants UAC. Anciennes épreuves, assistant IA, auth par matricule, mode hors-ligne.",
        stack: ["Next.js", "PWA", "Firebase", "IA"],
        github: "https://github.com/kakporosaire953-creator/campusly"
      },
      {
        id: "gbeto",
        title: "Gbéto",
        status: "ongoing",
        statusText: "EN COURS",
        desc: "Marketplace premium béninois. FedaPay (MTN MoMo + Moov Money), dashboard vendeur, group buying, live shopping.",
        stack: ["React", "FedaPay", "Supabase"],
        github: "https://github.com/kakporosaire953-creator/gbeto"
      },
      {
        id: "e-architect",
        title: "E-Architect SARL",
        status: "ongoing",
        statusText: "EN COURS",
        desc: "Site vitrine cabinet d'architecture. Galerie filtrée, formulaire devis, témoignages.",
        stack: ["HTML/CSS", "JavaScript"],
        github: "https://github.com/kakporosaire953-creator/e-architect"
      }
    ],

    // Skills
    "skills.title": "Matrice de Compétences",
    "skills.categories": [
      {
        title: "Frontend",
        items: [
          { name: "HTML5", level: "Expert", percent: 95 },
          { name: "CSS3/Tailwind", level: "Expert", percent: 95 },
          { name: "JavaScript ES6+", level: "Avancé", percent: 85 },
          { name: "React.js", level: "Avancé", percent: 85 },
          { name: "Next.js", level: "Avancé", percent: 80 },
          { name: "Responsive Design", level: "Avancé", percent: 90 }
        ]
      },
      {
        title: "Design & UX",
        items: [
          { name: "UX Design", level: "Avancé", percent: 80 },
          { name: "Figma", level: "Avancé", percent: 85 },
          { name: "Copywriting Web", level: "Expert", percent: 90 },
          { name: "Photoshop", level: "Apprenti", percent: 40 },
          { name: "Design Graphique", level: "Apprenti", percent: 45 }
        ]
      },
      {
        title: "Backend & Outils",
        items: [
          { name: "Firebase", level: "Expert", percent: 90 },
          { name: "Supabase", level: "Expert", percent: 90 },
          { name: "Git/GitHub", level: "Expert", percent: 90 },
          { name: "API REST", level: "Avancé", percent: 85 },
          { name: "SEO", level: "Avancé", percent: 80 },
          { name: "Vercel/Netlify", level: "Expert", percent: 95 },
          { name: "FedaPay", level: "Expert", percent: 95 }
        ]
      }
    ],

    // Experience
    "experience.title": "Chronologie Cinématique",
    "experience.items": [
      {
        title: "Formation Full-Stack",
        entity: "Institut Universitaire Les Cours Sonou",
        location: "Cotonou, Bénin",
        date: "En cours",
        status: "ongoing"
      },
      {
        title: "Spécialisation African Digital Innovation & E-commerce",
        entity: "Autodidacte",
        location: "Bénin / Afrique de l'Ouest",
        date: "En cours",
        status: "ongoing"
      },
      {
        title: "Certification de formation en développement et innovation",
        entity: "MIABE Hackathon",
        location: "Bénin",
        date: "Accompli",
        status: "completed"
      },
      {
        title: "Participation au challenge",
        entity: "Arduino Days 2026",
        location: "Sèmè City Open Park, Bénin",
        date: "Mai 2026",
        status: "upcoming"
      }
    ],

    // Contact
    "contact.title": "Centre de Communication",
    "contact.form.name": "Nom de code",
    "contact.form.email": "Fréquence de transmission (Email)",
    "contact.form.message": "Données cryptées (Message)",
    "contact.form.submit": "Transmettre",
    "contact.form.success": "Transmission réussie. Je vous recontacterai sous peu.",
    "contact.info.location": "Cotonou, Bénin 🌍",
    "contact.info.availability": "Ouvert aux missions freelance",

    // Hire
    "hire.title": "Services Premium",
    "hire.services": [
      { title: "Développement Frontend", desc: "Sites web, dashboards, interfaces IA ultra-performantes et immersives." },
      { title: "Développement E-commerce", desc: "Boutiques, marketplaces, intégration de paiement mobile adapté à l'Afrique." },
      { title: "Création Marketplace", desc: "Multi-vendeurs, FedaPay, MTN MoMo, architecture robuste." },
      { title: "Intégrations IA", desc: "Chatbots, interfaces intelligentes, automatisations sur-mesure." },
      { title: "UX Design", desc: "Wireframes, prototypes Figma, audits UX pour conversion maximale." },
      { title: "Consulting Digital", desc: "Stratégie, stack technique, produit adapté au marché africain." }
    ],
    "hire.quote": "Sur devis",

    // Explore
    "explore.title": "Laboratoire Expérimental",
    "explore.desc": "Interaction avec le système de particules. Déplacez votre curseur.",

    // AI
    "ai.title": "Terminal OS",
  },
  en: {
    // Nav
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.experience": "Timeline",
    "nav.contact": "Contact",
    "nav.hire": "Services",
    "nav.explore": "Lab",
    "nav.ai": "Terminal OS",

    // Home
    "home.subtitle": "Frontend Developer • AI Experience Creator • E-commerce Architect for Africa",
    "home.description": "I craft futuristic digital experiences and premium e-commerce ecosystems designed for the next generation of African innovation.",
    "home.cta.projects": "Discover my projects",
    "home.cta.contact": "Contact me",
    "home.stats.projects": "Projects",
    "home.stats.delivered": "Delivered",
    "home.stats.delay": "Avg Delay",
    "home.stats.weeks": "wks.",
    
    // Terminal
    "terminal.init": "System initializing...",
    "terminal.ready": "System Ready.",

    // Projects
    "projects.title": "Holographic Universe",
    "projects.filter.all": "All",
    "projects.filter.completed": "Completed",
    "projects.filter.ongoing": "Ongoing",
    "projects.items": [
      {
        id: "apple-confidence",
        title: "Apple Confidence",
        status: "completed",
        statusText: "COMPLETED",
        desc: "Smartphone E-commerce in Benin. 20+ smartphones, filter system, mobile-first responsive. Delivered in 3 weeks.",
        stack: ["Next.js", "React", "Tailwind"],
        live: "https://v0-apple-confidence.vercel.app/",
        github: "https://github.com/kakporosaire953-creator/apple-confidence"
      },
      {
        id: "skillbridge",
        title: "SkillBridge",
        status: "ongoing",
        statusText: "ONGOING",
        desc: "Social platform for skill exchange. Smart matching, Firebase realtime messaging, portfolio profiles.",
        stack: ["React", "Firebase", "Tailwind"],
        github: "https://github.com/kakporosaire953-creator/skillbridge"
      },
      {
        id: "campusly",
        title: "Campusly",
        status: "ongoing",
        statusText: "ONGOING",
        desc: "PWA dedicated to UAC students. Past exams, AI assistant, student ID auth, offline mode.",
        stack: ["Next.js", "PWA", "Firebase", "AI"],
        github: "https://github.com/kakporosaire953-creator/campusly"
      },
      {
        id: "gbeto",
        title: "Gbéto",
        status: "ongoing",
        statusText: "ONGOING",
        desc: "Premium Beninese marketplace. FedaPay (MTN MoMo + Moov Money), vendor dashboard, group buying, live shopping.",
        stack: ["React", "FedaPay", "Supabase"],
        github: "https://github.com/kakporosaire953-creator/gbeto"
      },
      {
        id: "e-architect",
        title: "E-Architect SARL",
        status: "ongoing",
        statusText: "ONGOING",
        desc: "Architecture firm showcase site. Filtered gallery, quote form, testimonials.",
        stack: ["HTML/CSS", "JavaScript"],
        github: "https://github.com/kakporosaire953-creator/e-architect"
      }
    ],

    // Skills
    "skills.title": "Skill Matrix",
    "skills.categories": [
      {
        title: "Frontend",
        items: [
          { name: "HTML5", level: "Expert", percent: 95 },
          { name: "CSS3/Tailwind", level: "Expert", percent: 95 },
          { name: "JavaScript ES6+", level: "Advanced", percent: 85 },
          { name: "React.js", level: "Advanced", percent: 85 },
          { name: "Next.js", level: "Advanced", percent: 80 },
          { name: "Responsive Design", level: "Advanced", percent: 90 }
        ]
      },
      {
        title: "Design & UX",
        items: [
          { name: "UX Design", level: "Advanced", percent: 80 },
          { name: "Figma", level: "Advanced", percent: 85 },
          { name: "Web Copywriting", level: "Expert", percent: 90 },
          { name: "Photoshop", level: "Apprentice", percent: 40 },
          { name: "Graphic Design", level: "Apprentice", percent: 45 }
        ]
      },
      {
        title: "Backend & Tools",
        items: [
          { name: "Firebase", level: "Expert", percent: 90 },
          { name: "Supabase", level: "Expert", percent: 90 },
          { name: "Git/GitHub", level: "Expert", percent: 90 },
          { name: "REST API", level: "Advanced", percent: 85 },
          { name: "SEO", level: "Advanced", percent: 80 },
          { name: "Vercel/Netlify", level: "Expert", percent: 95 },
          { name: "FedaPay", level: "Expert", percent: 95 }
        ]
      }
    ],

    // Experience
    "experience.title": "Cinematic Timeline",
    "experience.items": [
      {
        title: "Full-Stack Training",
        entity: "Institut Universitaire Les Cours Sonou",
        location: "Cotonou, Benin",
        date: "Ongoing",
        status: "ongoing"
      },
      {
        title: "African Digital Innovation & E-commerce Specialization",
        entity: "Self-taught",
        location: "Benin / West Africa",
        date: "Ongoing",
        status: "ongoing"
      },
      {
        title: "Development and Innovation Training Certification",
        entity: "MIABE Hackathon",
        location: "Benin",
        date: "Completed",
        status: "completed"
      },
      {
        title: "Challenge Participation",
        entity: "Arduino Days 2026",
        location: "Sèmè City Open Park, Benin",
        date: "May 2026",
        status: "upcoming"
      }
    ],

    // Contact
    "contact.title": "Communication Center",
    "contact.form.name": "Codename",
    "contact.form.email": "Transmission Frequency (Email)",
    "contact.form.message": "Encrypted Data (Message)",
    "contact.form.submit": "Transmit",
    "contact.form.success": "Transmission successful. I will contact you shortly.",
    "contact.info.location": "Cotonou, Benin 🌍",
    "contact.info.availability": "Open to freelance projects",

    // Hire
    "hire.title": "Premium Services",
    "hire.services": [
      { title: "Frontend Development", desc: "High-performance and immersive websites, dashboards, and AI interfaces." },
      { title: "E-commerce Development", desc: "Stores, marketplaces, mobile payment integration adapted for Africa." },
      { title: "Marketplace Creation", desc: "Multi-vendor, FedaPay, MTN MoMo, robust architecture." },
      { title: "AI Integrations", desc: "Chatbots, smart interfaces, custom automations." },
      { title: "UX Design", desc: "Wireframes, Figma prototypes, UX audits for maximum conversion." },
      { title: "Digital Consulting", desc: "Strategy, tech stack, product adapted to the African market." }
    ],
    "hire.quote": "On quote",

    // Explore
    "explore.title": "Experimental Lab",
    "explore.desc": "Interact with the particle system. Move your cursor.",

    // AI
    "ai.title": "Terminal OS",
  }
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("portfolio-lang");
    if (saved === "fr" || saved === "en") return saved;
    return navigator.language.startsWith("fr") ? "fr" : "en";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-lang", lang);
  }, [lang]);

  const t = (key: string): any => {
    const keys = key.split(".");
    let current: any = translations[lang];
    for (const k of keys) {
      if (current === undefined) break;
      current = current[k];
    }
    return current || key;
  };

  return (
    <TranslationContext.Provider value={{ lang, setLang, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
