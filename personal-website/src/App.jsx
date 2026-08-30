import React, { useEffect } from "react";
import { inject as injectAnalytics } from "@vercel/analytics";
import "./App.css";

import SiteShell from "./components/SiteShell";
import IdentityRail from "./components/IdentityRail";
import ExperienceSection, {
  AboutSection,
} from "./components/ExperienceSection";
import ProjectArchive from "./components/ProjectArchive";
import Footer from "./components/Footer";
import siteContent from "./content/siteContent";

const PRIMARY_NAVIGATION = [
  { sectionId: "about", label: "About" },
  { sectionId: "experience", label: "Experience" },
  { sectionId: "work", label: "Work" },
];

function AnalyticsBootstrap() {
  useEffect(() => {
    injectAnalytics({ framework: "react", debug: false });
  }, []);

  return null;
}

function App() {
  useEffect(() => {
    const updatePointerGlow = ({ clientX, clientY }) => {
      document.documentElement.style.setProperty("--pointer-x", `${clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${clientY}px`);
    };

    window.addEventListener("mousemove", updatePointerGlow, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updatePointerGlow);
      document.documentElement.style.removeProperty("--pointer-x");
      document.documentElement.style.removeProperty("--pointer-y");
    };
  }, []);

  const content = siteContent ?? {};
  const profile = content.profile ?? {};
  const experience = Array.isArray(content.experience) ? content.experience : [];
  const projects = Array.isArray(content.projects) ? content.projects : [];

  const sections = [
    {
      id: "about",
      label: "About",
      heading: "About",
      content: <AboutSection profile={profile} />,
    },
    {
      id: "experience",
      label: "Experience",
      heading: "Experience",
      content: (
        <ExperienceSection experience={experience} />
      ),
    },
    {
      id: "work",
      label: "Work",
      heading: "Work",
      content: <ProjectArchive projects={projects} />,
    },
  ];

  return (
    <>
      <div className="App">
        <SiteShell
          brand={profile.name || "Davis Odom"}
          navigation={PRIMARY_NAVIGATION}
          rail={<IdentityRail profile={profile} />}
          sections={sections}
          footerContent={<Footer profile={profile} />}
        />
      </div>
      <AnalyticsBootstrap />
    </>
  );
}

export default App;
