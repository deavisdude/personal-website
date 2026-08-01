import React, { useEffect } from "react";
import { inject as injectAnalytics } from "@vercel/analytics";
import "./App.css";

import SiteShell from "./components/SiteShell";
import IdentityRail from "./components/IdentityRail";
import ExperienceSection, {
  AboutSection,
} from "./components/ExperienceSection";
import siteContent from "./content/siteContent";

const P1_NAVIGATION = [
  { sectionId: "about", label: "About" },
  { sectionId: "experience", label: "Experience" },
];

function AnalyticsBootstrap() {
  useEffect(() => {
    injectAnalytics({ framework: "react", debug: false });
  }, []);

  return null;
}

function App() {
  const content = siteContent ?? {};
  const profile = content.profile ?? {};
  const experience = Array.isArray(content.experience) ? content.experience : [];

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
  ];

  return (
    <>
      <div className="App">
        <SiteShell
          brand={profile.name || "Davis Odom"}
          navigation={P1_NAVIGATION}
          rail={<IdentityRail profile={profile} />}
          sections={sections}
        />
      </div>
      <AnalyticsBootstrap />
    </>
  );
}

export default App;
