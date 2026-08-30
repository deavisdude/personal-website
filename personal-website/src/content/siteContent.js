/**
 * Approved, public-safe content for the personal website.
 *
 * This module is intentionally data-only. Presentation code should consume the
 * named exports or the default `siteContent` object.
 *
 * @typedef {Object} LinkEvidence
 * @property {string} id
 * @property {string} url
 * @property {'official'|'repository'|'download'|'demo'|'historical'|'social'|'video'} type
 * @property {string} label
 * @property {string} source
 * @property {'verified'|'redirected'|'unavailable'|'unverified'|'blocked'} status
 * @property {string} checkedAt
 * @property {string} fallbackLabel
 * @property {string} [verificationNote]
 *
 * @typedef {Object} MediaAsset
 * @property {string} id
 * @property {string} src
 * @property {string} alt
 * @property {string} [caption]
 * @property {string} rightsNote
 * @property {string} fallback
 *
 * @typedef {Object} DateEvidence
 * @property {'event'|'profile'|'repository'|'current'|'planning'} type
 * @property {string} source
 * @property {string} detail
 *
 * @typedef {Object} ProfileImage
 * @property {string} src
 * @property {string} alt
 * @property {string} [fallback]
 */

const linkedInProfileLink = {
  id: "davis-linkedin",
  url: "https://www.linkedin.com/in/davisodom",
  type: "social",
  label: "LinkedIn profile",
  source: "Davis-approved public LinkedIn profile",
  status: "unverified",
  checkedAt: "2026-08-01",
  fallbackLabel:
    "Public LinkedIn profile; current profile content may change.",
  verificationNote:
    "Davis approved inclusion of this public profile URL; exact rendered-control and redirect verification remains part of T034.",
};

export const profile = {
  name: "Davis Odom",
  roleLabel: "Senior Software Engineer",
  thesis:
    "I’m a software engineer from Georgia who builds tools, games, simulations and anything else that inspires me.",
  locationLabel: "Georgia, USA",
  careerContext:
    "Current software-engineering and developer-tools context at The Home Depot.",
  /** @type {ProfileImage} */
  profileImage: {
    src: "/assets/davis-odom-profile.jpg",
    alt: "Davis Odom smiling in a white shirt and orange apron.",
    fallback: "Davis Odom profile photo unavailable.",
  },
  interests: [
    { label: "Place", text: "Georgia" },
    { label: "University", text: "University of Georgia" },
    { label: "Sports context", text: "Atlanta Braves" },
    {
      label: "Builder / creative work",
      text: "Tools, games, simulations, and creative experiments",
    },
  ],
  personalNote:
    "I enjoy building useful tools and playful creative experiments.",
  socialLinks: [linkedInProfileLink],
  resumeLink: null,
};

export const experienceItems = [
  {
    organization: "The Home Depot",
    role: profile.roleLabel,
    dateLabel: "Current",
    summary:
      "Current software-engineering and developer-tools context at The Home Depot.",
  },
];

const linkEvidenceRecords = [
  linkedInProfileLink,
  {
    id: "old-site-source-archive",
    url: "https://github.com/deavisdude/My-Site",
    type: "historical",
    label: "Old-site source archive",
    source: "Davis-supplied public old-site repository",
    status: "unverified",
    checkedAt: "2026-08-01",
    fallbackLabel:
      "Historical old-site source archive; not a current project experience.",
    verificationNote:
      "The public My-Site repository was supplied as the source archive for the legacy pages and artifacts below; it is retained for visitor-useful provenance only.",
  },
  {
    id: "support-repository",
    url: "https://github.com/deavisdude/Support",
    type: "repository",
    label: "Support public repository",
    source: "Davis-supplied public source repository",
    status: "unverified",
    checkedAt: "2026-08-01",
    fallbackLabel:
      "Public source repository; current browser play is unverified.",
    verificationNote:
      "The public GitHub repository URL was supplied as source evidence; repository source does not establish a current build or start-to-finish gameplay.",
  },
  {
    id: "support-old-site-page",
    url: "https://github.com/deavisdude/My-Site/blob/master/Support%20Web.html",
    type: "historical",
    label: "Support legacy Unity Web Player page",
    source: "Davis-supplied old-site repository artifact",
    status: "unverified",
    checkedAt: "2026-08-01",
    fallbackLabel:
      "Legacy Unity Web Player page; historical evidence only.",
    verificationNote:
      "The public My-Site path is a legacy Unity Web Player HTML page; it is retained as historical evidence, not a current browser-play result.",
  },
  {
    id: "support-old-site-download",
    url: "https://github.com/deavisdude/My-Site/blob/master/Support%20Web.unity3d",
    type: "download",
    label: "Support legacy Unity Web Player download",
    source: "Davis-supplied old-site repository artifact",
    status: "unverified",
    checkedAt: "2026-08-01",
    fallbackLabel:
      "Legacy Unity Web Player download; not browser-playable.",
    verificationNote:
      "The public My-Site path is a legacy .unity3d Unity Web Player artifact/download; no current browser compatibility or gameplay check was performed.",
  },
  {
    id: "support-award-announcement",
    url: "https://www.ggda.org/news/support-wins-summer-game-jam-at-spsu",
    type: "historical",
    label: "Support GGDA announcement",
    source: "Existing public research record",
    status: "unverified",
    checkedAt: "2026-08-01",
    fallbackLabel:
      "Historical event reference; not a playable build.",
    verificationNote:
      "The public GGDA announcement URL was retained as historical event evidence; no current project experience was validated in this record.",
  },
  {
    id: "support-download",
    url: "https://skateborden.itch.io/support",
    type: "download",
    label: "Support download page",
    source: "Existing public research record",
    status: "unverified",
    checkedAt: "2026-08-01",
    fallbackLabel:
      "Download page only; current browser play is unverified.",
    verificationNote:
      "The public itch.io URL was retained as download evidence; a download page is not current start-to-finish browser gameplay validation.",
  },
  {
    id: "flux-repository",
    url: "https://github.com/deavisdude/CDCJam-14",
    type: "repository",
    label: "Flux public repository",
    source: "Davis-supplied public source repository",
    status: "unverified",
    checkedAt: "2026-08-01",
    fallbackLabel:
      "Public source repository; current browser play is unverified.",
    verificationNote:
      "The public CDCJam-14 GitHub repository was supplied as Flux source evidence; repository source does not establish a current build or start-to-finish gameplay.",
  },
  {
    id: "flux-old-site-page",
    url: "https://github.com/deavisdude/My-Site/blob/master/Flux/Build.html",
    type: "historical",
    label: "Flux legacy Unity Web Player page",
    source: "Davis-supplied old-site repository artifact",
    status: "unverified",
    checkedAt: "2026-08-01",
    fallbackLabel:
      "Legacy Unity Web Player page; historical evidence only.",
    verificationNote:
      "The public My-Site path is a legacy Flux Unity Web Player HTML page; it is retained as historical evidence, not a current browser-play result.",
  },
  {
    id: "flux-old-site-download",
    url: "https://github.com/deavisdude/My-Site/blob/master/Flux/Build.unity3d",
    type: "download",
    label: "Flux legacy Unity Web Player download",
    source: "Davis-supplied old-site repository artifact",
    status: "unverified",
    checkedAt: "2026-08-01",
    fallbackLabel:
      "Legacy Unity Web Player download; not browser-playable.",
    verificationNote:
      "The public My-Site path is a legacy Flux .unity3d Unity Web Player artifact/download; no current browser compatibility or gameplay check was performed.",
  },
  {
    id: "flux-dropbox-download",
    url: "https://www.dropbox.com/sh/gzk67bjp474t3cr/AADmDEu5jzIMQZWZSnAh-hY9a?dl=0",
    type: "download",
    label: "Flux legacy Dropbox download",
    source: "Davis-supplied Flux legacy page",
    status: "unverified",
    checkedAt: "2026-08-01",
    fallbackLabel:
      "Legacy build download; current browser play is unverified.",
    verificationNote:
      "The public Flux legacy page exposes this Dropbox download as the preferred approximately 43 MB download; no current download or gameplay validation was performed.",
  },
  {
    id: "flux-history",
    url: "https://www.ggda.org/news/ggda-2014-in-review",
    type: "historical",
    label: "Flux historical GGDA review",
    source: "Existing public research record",
    status: "unverified",
    checkedAt: "2026-08-01",
    fallbackLabel:
      "Historical event reference; not a playable build.",
    verificationNote:
      "The public GGDA review URL was retained as historical event evidence; the older web-build paths are legacy artifacts and are not represented as live demos.",
  },
  {
    id: "battle-of-the-masses-video",
    url: "https://www.youtube.com/watch?v=indjhyEG1g4",
    type: "video",
    label: "Battle of the Masses video",
    source: "Davis-supplied YouTube video and oEmbed evidence",
    status: "unverified",
    checkedAt: "2026-08-01",
    fallbackLabel:
      "Video reference only; current start-to-finish gameplay is unverified.",
    verificationNote:
      "YouTube oEmbed resolved to the supplied title “Battle of the Masses”; no current gameplay validation was performed, so this remains an unverified non-play reference.",
  },
  {
    id: "battle-of-the-masses-reference",
    url: "https://globalgamejam.org/2016/games/battle-masses",
    type: "historical",
    label: "Battle of the Masses Global Game Jam reference",
    source: "Existing public research record",
    status: "unverified",
    checkedAt: "2026-08-01",
    fallbackLabel:
      "Historical Global Game Jam reference; current playability is unverified.",
    verificationNote:
      "The public Global Game Jam reference was retained as historical project evidence; current project health and gameplay were not validated.",
  },
  {
    id: "upbetod-repository",
    url: "https://github.com/deavisdude/UPBETOD",
    type: "repository",
    label: "UPBETOD public repository",
    source: "Davis-supplied public Unity source repository",
    status: "unverified",
    checkedAt: "2026-08-01",
    fallbackLabel:
      "Public Unity source repository; current browser play is unverified.",
    verificationNote:
      "The public Unity repository URL was supplied/observed as UPBETOD source evidence; repository activity does not establish a current playable build or event date.",
  },
  {
    id: "upbetod-video",
    url: "https://www.youtube.com/watch?v=Ssr0FPcskLQ",
    type: "video",
    label: "UPBETOD video",
    source: "Davis-supplied YouTube video and oEmbed evidence",
    status: "unverified",
    checkedAt: "2026-08-01",
    fallbackLabel:
      "Video reference only; current start-to-finish gameplay is unverified.",
    verificationNote:
      "YouTube oEmbed resolved to the supplied title “(UPBETOD) Über Pwn Battle Extraordinaire-tastrophe of Doom”; no current gameplay validation was performed, so this remains an unverified non-play reference.",
  },
  {
    id: "upbetod-project-board",
    url: "https://trello.com/b/TocWvDKP/upbetod",
    type: "historical",
    label: "UPBETOD project board",
    source: "Davis-supplied public Trello board",
    status: "unverified",
    checkedAt: "2026-08-01",
    fallbackLabel:
      "Historical project board; planning/source context only.",
    verificationNote:
      "The public Trello board URL was supplied as UPBETOD history; it is retained because it provides visitor-useful project context, not a playable build.",
  },
];

const linkEvidenceById = Object.fromEntries(
  linkEvidenceRecords.map((record) => [record.id, record]),
);

const linksFor = (...ids) => ids.map((id) => linkEvidenceById[id]);

export const linkEvidence = linkEvidenceRecords;

export const mediaAssets = [];

export const projectEntries = [
  {
    id: "restaurant-tracker",
    title: "Restaurant Tracker",
    category: "wip",
    dateLabel: "Current (unpublished)",
    dateEvidence: [
      {
        type: "current",
        source: "content-approval.md",
        detail:
          "Current unpublished work; no public date or launch date is approved.",
      },
    ],
    summary:
      "Current unpublished work retained as a high-level text-first record; an approved description and media are not yet available.",
    role: "Pending Davis approval",
    status: "in-progress",
    links: [],
    media: [],
    fallback:
      "Text-first WIP entry; no public destination or approved screenshot is available.",
  },
  {
    id: "football-idle-game",
    title: "Football Idle Game",
    category: "wip",
    dateLabel: "Current (unpublished)",
    dateEvidence: [
      {
        type: "current",
        source: "content-approval.md",
        detail:
          "Current unpublished work; no public date or launch date is approved.",
      },
    ],
    summary:
      "Current unpublished work retained as a high-level text-first record; an approved description and media are not yet available.",
    role: "Pending Davis approval",
    status: "in-progress",
    links: [],
    media: [],
    fallback:
      "Text-first WIP entry; no public destination or approved screenshot is available.",
  },
  {
    id: "support",
    title: "Support",
    category: "game-jam",
    dateLabel: "June–July 2014",
    dateEvidence: [
      {
        type: "event",
        source: "Davis-approved old-site and public event evidence",
        detail:
          "Two-day SPSU Summer Game Jam project with a public June 2014 event record.",
      },
      {
        type: "repository",
        source: "Davis-approved public repository evidence",
        detail:
          "Public build commits in July 2014 and a README update on 2016-05-13; repository activity is not a maintenance claim.",
      },
    ],
    summary:
      "Two-day SPSU Summer Game Jam project built by a team of seven developers, with public source and legacy Unity Web Player/download evidence.",
    role: "Software Engineer",
    attribution: {
      text: "Team project with seven developers; Davis contributed as a Software Engineer.",
      role: "Software Engineer",
      entities: ["SPSU Summer Game Jam", "Support team"],
    },
    status: "download-only",
    links: linksFor(
      "support-repository",
      "support-award-announcement",
      "support-download",
    ),
    media: [],
    fallback:
      "Legacy Unity Web Player/download archive context only; no current browser play is claimed.",
  },
  {
    id: "flux",
    title: "Flux",
    category: "game-jam",
    dateLabel: "2013–2014",
    dateEvidence: [
      {
        type: "event",
        source: "Davis-approved old-site evidence",
        detail:
          "2013 HHS Game Jam at SPSU project and one of five winning submissions.",
      },
      {
        type: "profile",
        source: "Existing public profile evidence",
        detail: "Older public profile record dated 2014.",
      },
    ],
    summary:
      "2013 HHS Game Jam at SPSU project and one of five winning submissions, retained with legacy Unity Web Player page/build and download evidence.",
    role: "Software Engineer",
    attribution: {
      text: "One of five winning submissions in the 2013 HHS Game Jam at SPSU; Davis contributed as a Software Engineer.",
      role: "Software Engineer",
      entities: ["HHS Game Jam", "SPSU"],
    },
    status: "download-only",
    links: linksFor(
      "flux-repository",
      "flux-dropbox-download",
      "flux-history",
    ),
    media: [],
    fallback:
      "Legacy Unity Web Player/download archive context only; no current browser play is claimed.",
  },
  {
    id: "battle-of-the-masses",
    title: "Battle of the Masses",
    category: "game-jam",
    dateLabel: "2016",
    dateEvidence: [
      {
        type: "event",
        source: "Existing public Global Game Jam evidence",
        detail: "Global Game Jam reference dated 2016.",
      },
      {
        type: "profile",
        source: "Existing public profile evidence",
        detail: "Public profile record dated January–March 2016.",
      },
    ],
    summary:
      "Historical Global Game Jam project with a supplied video reference; current gameplay is not validated.",
    role: "Design and Lead Programmer",
    attribution: {
      text: "Historical Global Game Jam project; Davis served as Design and Lead Programmer.",
      role: "Design and Lead Programmer",
      entities: ["Global Game Jam"],
    },
    status: "historical-link",
    links: linksFor(
      "battle-of-the-masses-video",
      "battle-of-the-masses-reference",
    ),
    media: [],
    fallback:
      "Historical Global Game Jam and video references only; no current browser play is claimed.",
  },
  {
    id: "upbetod",
    title: "UPBETOD",
    category: "archive",
    dateLabel: "2015–2016 (repository evidence)",
    dateEvidence: [
      {
        type: "repository",
        source: "Davis-approved public repository evidence",
        detail:
          "Public repository activity in June 2015 and a README update on 2016-05-13; no event date is established.",
      },
    ],
    summary:
      "Unity project with a public source repository and historical video/project-board references; repository evidence does not establish playability.",
    role: "Software Engineer",
    technologies: ["Unity"],
    attribution: {
      text: "Public Unity repository and project-history evidence; no team attribution is claimed.",
      role: "Software Engineer",
    },
    status: "repository-only",
    links: linksFor(
      "upbetod-repository",
      "upbetod-video",
      "upbetod-project-board",
    ),
    media: [],
    fallback:
      "Repository and historical project context only; no current browser play is claimed.",
  },
  {
    id: "bbq-app",
    title: "BBQ App",
    category: "professional-project",
    dateLabel: "June 2014–April 2015",
    dateEvidence: [
      {
        type: "profile",
        source: "Existing planning record; Davis approval (2026-08-01)",
        detail:
          "Public profile record places the project in June 2014–April 2015; this is profile/work-range evidence, not a launch or maintenance claim.",
      },
    ],
    summary:
      "Sole-created app built for Atlanta BBQ Club after Davis connected with the club at an Atlanta Tech Village event while interning at the TAG Atlanta office; the club hired him on the spot through the TAG student internship program to build it.",
    role: "Sole creator",
    attribution: {
      text: "TAG student internship partnership with Atlanta BBQ Club; Davis was the sole creator.",
      role: "Sole creator",
      entities: [
        "Atlanta BBQ Club",
        "Technology Association of Georgia (TAG)",
        "Atlanta Tech Village",
      ],
    },
    status: "archived",
    links: [],
    media: [],
    fallback:
      "Text-first archived context only; no public app URL, source, or screenshot is assumed.",
  },
];

export const siteContent = {
  profile,
  experience: experienceItems,
  projects: projectEntries,
  linkEvidence,
  mediaAssets,
};

export default siteContent;
