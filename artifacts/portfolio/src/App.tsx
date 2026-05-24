import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { TranslationProvider } from "@/context/TranslationContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";

import { HomePage }        from "@/pages/HomePage";
import { ProjectsPage }    from "@/pages/ProjectsPage";
import { SkillsPage }      from "@/pages/SkillsPage";
import { ExperiencePage }  from "@/pages/ExperiencePage";
import { ContactPage }     from "@/pages/ContactPage";
import { HirePage }        from "@/pages/HirePage";
import { ExplorePage }     from "@/pages/ExplorePage";
import { AiModePage }      from "@/pages/AiModePage";
// AJOUT — Nouvelles pages
import { HackathonsPage }  from "@/pages/HackathonsPage";
import { GalleryPage }     from "@/pages/GalleryPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/"             component={HomePage}       />
      <Route path="/projects"     component={ProjectsPage}   />
      <Route path="/skills"       component={SkillsPage}     />
      <Route path="/experience"   component={ExperiencePage} />
      <Route path="/contact"      component={ContactPage}    />
      <Route path="/hire"         component={HirePage}       />
      <Route path="/explore"      component={ExplorePage}    />
      <Route path="/ai-mode"      component={AiModePage}     />
      {/* AJOUT — Routes nouvelles sections */}
      <Route path="/hackathons"   component={HackathonsPage} />
      <Route path="/gallery"      component={GalleryPage}    />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TranslationProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Layout>
                <Router />
              </Layout>
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </TranslationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
