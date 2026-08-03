# Content Approval Record

**Feature**: [spec.md](./spec.md)
**Last reviewed**: 2026-08-01
**Status**: Approved copy and attribution boundaries are implemented; Phase 6
local evidence is recorded, with explicit deployment, playability, media,
preference, and final-review blockers retained below

This record separates what is currently approved by the user from what must be
confirmed before publication. It is the source of truth for content tasks and
must be updated before implementation consumes any open item.

## Approved direction

- Site priority: represent Davis, document work, then support selective
  engineering opportunities.
- Primary visitor: hiring manager reviewing a resume; secondary visitor: anyone
  curious about Davis.
- First-impression goal: a talented software engineer from Georgia, USA.
- Current career context: The Home Depot may be named at a general level, with
  developer-tools/engineering focus and no team or confidential project detail.
- Public-safe exclusions: phone, personal email, exact location, sensitive family
  details, and confidential employer information.
- Unified narrative: professional engineering, game/world-building, tools, and
  approved Georgia-rooted interests belong in one site.
- Archive candidates: Support, Flux, Battle of the Masses, UPBETOD, and BBQ App.
- WIP candidates: Restaurant Tracker and Football Idle Game, high-level only and
  source-private.
- Tone: polished, serious, warm, and conversational.
- Maintenance posture: occasional project updates; no blog or forced CTA.
- Implementation direction: replace the old repository source with a modern
  web stack chosen to support the approved visual direction.
- Deployment direction: Vercel deployment with GitHub Actions build/workflow
  automation, following the restaurant-app operational model where applicable.
- Device direction: current and previous major Chrome, Edge, Firefox, and Safari
  releases on desktop/laptop, plus current iPhone and Android browsers; older
  or obsolete browsers receive progressive degradation rather than a guarantee.
- Visual direction: dark foundation with Atlanta-red accents, using sports
  influence as atmosphere rather than copying team marks or proprietary assets.
- Visual implementation direction: use best design judgment for exact
  typography, spacing, breakpoints, motion, and dark/Atlanta-red token values;
  final visual QA remains required for readability, contrast, and responsive
  behavior.
- Asset direction: text-first launch is acceptable; missing photos/screenshots
  are non-blocking and must be flagged during development for later handoff.
- Analytics direction: enable `@vercel/analytics` for page views only. No custom
  events, authentication, forms, or visitor-owned data service are in scope;
  no additional app-level privacy settings are required for the read-only
  experience.
- Public social direction: Davis approved inclusion of his public LinkedIn
  profile link. No resume destination is required until a public-safe URL is
  supplied or approved.
- Attribution direction: no additional collaborator names, collaborator roles,
  or organizer relationships are available. Do not infer or publish them.
- Historical-source direction: the public old-site repository and artifacts,
  public source repositories, supplied YouTube videos, the legacy Dropbox
  destination, and the UPBETOD Trello board may be cataloged as historical or
  source evidence. They must not be presented as current playable builds
  without separate rendered, start-to-finish browser evidence.

## Open approvals before implementation

| Item | Status | Required evidence/decision |
| --- | --- | --- |
| Role label and opening thesis | APPROVED / ITERATIVE | Use `Senior Software Engineer`; the thesis below is the approved launch draft and may be refined |
| Restaurant Tracker | NON-BLOCKING | Screenshot/description may be supplied later; use text-first placeholder treatment |
| Football Idle Game | NON-BLOCKING | Screenshot/description may be supplied later; use text-first placeholder treatment |
| BBQ App | APPROVED | Davis is the sole creator; TAG internship partnership and Atlanta BBQ Club origin are approved for public-safe wording |
| Support / Flux / Battle / UPBETOD roles | APPROVED WITH EXPLICIT DEFERRAL | Davis's roles and supported team/event context are approved; no collaborator or organizer names/relationships are available, so none will be inferred or published |
| Historical and official links | PUBLICATION POLICY APPROVED / AUDIT RECORDED | Visitor-facing keep/remove policy and T034 rendered-destination evidence are recorded below and in `link-audit.md`; named external limitations remain explicit |
| Resume | APPROVED / INTERIM | Current LinkedIn-export PDF may be published; replace with polished resume later |
| Technical and visual brief | APPROVED WITH IMPLEMENTATION GUIDANCE | Vite/React, Vercel, GitHub Actions, reasonable evergreen browser support, dark/red direction, assets, page-view analytics, and read-only privacy scope are approved; rendered visual and deployment checks remain |

### 2026-08-01 release and attribution decision update

- The public LinkedIn destination is approved for the identity rail:
  `https://www.linkedin.com/in/davisodom`. It is recorded as a social link in
  `src/content/siteContent.js`; T034 recorded the exact rendered controls and
  final destination behavior, with named provider limitations where applicable.
- No collaborator names, collaborator roles, or organizer relationships were
  supplied in the available records. The site will publish only Davis's
  approved role, supported team-size/event context, and source-backed project
  facts. It will not guess named attribution.
- The release uses page-view analytics only through `@vercel/analytics`; no
  custom events or visitor-owned data are added, and no additional app-level
  privacy settings are needed for the read-only experience.

## T003: BBQ App evidence and approved wording

- **Known date evidence**: A public profile record places the BBQ App in June
  2014-April 2015. This is profile/work-range evidence, not a claim about an
  app launch date or continuous maintenance.
- **Atlanta BBQ Club relationship**: This was a TAG student internship
  partnership. While interning at the TAG Atlanta office, Davis attended an
  event at Atlanta Tech Village; the Atlanta BBQ Club hired him on the spot
  through the TAG program to build the app.
- **Davis's role and ownership**: `APPROVED` — Davis was the sole creator.
- **Contract-safe wording**: `APPROVED` — the relationship and origin above
  may be named at this level. Do not add private contact information,
  unapproved dates, employer details, legal terms, or claims about ongoing
  maintenance.
- **Approved wording**: “BBQ App — Sole-created app built through a TAG
  student internship partnership with the Atlanta BBQ Club. While interning at
  the TAG Atlanta office, Davis attended an event at Atlanta Tech Village; the
  club hired him through the TAG program to build the app.”
- **Date boundary**: The public profile record's June 2014-April 2015 range
  remains work-range evidence, not a claim about the app's launch date or
  continuous maintenance.
- **Source boundary**: The old-site index contains an unlinked `Top 100 BBQ`
  card, but no public app source is assumed. Do not copy the old site's phone
  number or email address into the current site.

## T004: Archive project provenance and attribution

The date sources below retain their type. Repository activity is public code
history only; it is not silently converted into an event date, maintenance
interval, or playability claim.

| Project | Event/profile/repository date sources | Davis role and known team context | Attribution decision and publication treatment |
| --- | --- | --- | --- |
| Support | Old-site manifest: two-day Southern Polytechnic State University Summer Game Jam project; public repository and legacy Web Player artifact. | `APPROVED` — Davis was an SE. The old-site manifest says the team had seven developers; collaborator names were not supplied. | Davis's role and seven-person team context may be published. Named collaborator and organizer attribution is explicitly deferred because no names or relationships were supplied; keep archive/download-only treatment unless a modern browser build is independently verified. |
| Flux | Old-site manifest: made at the 2013 HHS Game Jam at Southern Polytechnic State University in Atlanta; one of five winning submissions. Public `CDCJam-14` source repository and legacy Web Player artifact; legacy Dropbox download is recorded in `link-audit.md`. | `APPROVED` — Davis was an SE. No collaborator names were supplied. | Event and winning-submission facts may be attributed to the source record. Named collaborator/organizer attribution is explicitly deferred; historical/download treatment only, with no play claim. |
| Battle of the Masses | Old-site index links the Global Game Jam entry; supplied historical YouTube video and public Global Game Jam reference are source candidates. | `APPROVED` — Davis was Design and Lead Programmer. No collaborator names were supplied. | Role may be published. Team, collaborator, and final event attribution beyond the supported Global Game Jam reference are explicitly deferred; historical-video/reference treatment only, with no play claim. |
| UPBETOD | Public `UPBETOD` repository, public Trello board, and supplied historical YouTube video. The repository README describes a Unity local-multiplayer, controller-based space shooter made for a game jam under time constraints. | `APPROVED` — Davis was an SE. No collaborator names were supplied. | Role and source descriptions may be published. Collaborator and organizer attribution is explicitly deferred; repository/Trello/video evidence only, with no play claim. |

**T004 attribution decision**: Davis's roles above are approved. No additional
collaborator names, collaborator roles, or organizer relationships are
available in the supplied records, and Davis has confirmed they should not be
inferred. Publish the supported role, team-size/event facts, and source-backed
historical context only. Revisit named attribution only if Davis supplies new
evidence; it is not a current content blocker.

## Approved source inventory and artifact boundary

The following sources may support historical context, destination labeling, or
future investigation. They do not authorize a current `Play in browser` claim
and do not mean that the current site renders any of them.

| Source | Approved evidence use | Boundary |
| --- | --- | --- |
| [My-Site repository](https://github.com/deavisdude/My-Site) and [old-site index source](https://github.com/deavisdude/My-Site/blob/master/index.html) | Historical project inventory, including Support, Flux, Battle of the Masses, the unlinked Top 100 BBQ card, and the public UPBETOD Trello link. | Historical source only. Do not copy the old site's phone or email. |
| [Flux manifest](https://github.com/deavisdude/My-Site/blob/master/Flux/Build.html), `Flux/Build.unity3d`, [Support manifest](https://github.com/deavisdude/My-Site/blob/master/Support%20Web.html), and `Support Web.unity3d` | Historical Unity Web Player manifest/download evidence. | Legacy artifacts are historical/download evidence only. The manifests use Unity Web Player 3.x; Support explicitly says the player is no longer supported in Google Chrome. |
| [Support source repository](https://github.com/deavisdude/Support), [CDCJam-14 source repository](https://github.com/deavisdude/CDCJam-14), and [UPBETOD source repository](https://github.com/deavisdude/UPBETOD) | Public source and README provenance. | Repository source is not a playable build or proof that the current site should expose private/current implementation details. |
| [UPBETOD Trello board](https://trello.com/b/TocWvDKP/upbetod) | Historical planning/progress evidence. | Trello is not a playable build and must be labeled as historical/project evidence. |
| [UPBETOD historical video](https://www.youtube.com/watch?v=Ssr0FPcskLQ) and [Battle of the Masses historical video](https://www.youtube.com/watch?v=indjhyEG1g4) | Historical video evidence; supplied titles and `deavisdude` oEmbed authorship are recorded in `link-audit.md`. | These are historical videos, not playable builds. |
| [Legacy Flux Dropbox destination](https://www.dropbox.com/sh/gzk67bjp474t3cr/AADmDEu5jzIMQZWZSnAh-hY9a?dl=0) | Historical/download candidate linked by the Flux manifest. | It redirected on 2026-08-01 to the current Dropbox folder URL recorded in `link-audit.md`; download availability is not browser playability. |

Unity rebuild feasibility is an investigation item. A rebuild from public
source using Unity may be considered if no playable artifact exists in the
repositories, but no rebuild has been started or validated in this record.
No browser playability is established for any archive project.

## Draft role and thesis candidates

These are starting points for Davis to approve or revise; they are not published
claims until selected.

### Selected launch baseline

- **Role label**: `Senior Software Engineer`
- **Opening thesis**: “I’m a software engineer from Georgia who builds tools,
  games, simulations and anything else that inspires me.”
- **Revision policy**: The thesis is approved for implementation and may be
  tightened for rhythm, accessibility, or visual fit without changing its core
  meaning.

### Role-label candidates

1. **Senior Software Engineer** — clearest and strongest for a hiring-manager
   audience if it matches the public employment record.
2. **Senior Software Engineer, Developer Tools** — adds the current domain while
   remaining appropriately general about employer work.
3. **Software Engineer and Builder** — warmer and more personal, but less
   precise as a professional headline.

**Recommended default**: `Senior Software Engineer` as the role label, followed
by a separate thesis that supplies the developer-tools and builder context.

### Opening-thesis candidates

1. **“I’m a software engineer from Georgia who builds tools that help other
   people build—and makes games and experiments to explore the rest.”**
2. **“I like building things that make other things easier: developer tools at
   work, games and experiments on my own.”**
3. **“Software engineer, game maker, and lifelong builder—interested in the space
   between useful systems and playful worlds.”**
4. **“I build developer tools by day and games, simulations, and useful side
   projects whenever curiosity gets the better of me.”**

**Recommended starting point**: Candidate 1. It connects the professional and
personal lanes, communicates a clear builder identity, and leaves room for
current employer-safe wording.

## Publication rule

An open or blocked item MUST be represented as a task or explicit deferral. It
MUST NOT be filled with an inferred achievement, private detail, invented date,
or implied live demo.

## Agent asset policy

Agents MUST continue implementation with text-first fallbacks when a requested
photo, screenshot, or other asset is missing. They MUST record the missing asset
and flag it to Davis in development rather than silently inventing or sourcing a
replacement that has not been approved.

## Phase 6 final release disposition — 2026-08-01

### Approved copy shipped

- The public role remains `Senior Software Engineer`, with the approved Georgia
  thesis and general developer-tools context at The Home Depot.
- The public personal note and Georgia, University of Georgia, Atlanta Braves,
  and builder/creative interests remain at the approved high level.
- The BBQ App wording, sole-creator role, TAG student-internship relationship,
  Atlanta BBQ Club origin, and June 2014–April 2015 work-range boundary remain
  unchanged.
- Support, Flux, Battle of the Masses, and UPBETOD publish only the approved
  Davis roles and source-backed event/project context. No collaborator or
  organizer names were inferred.
- Internal-only review notes were removed from the shipped content module so
  they are not present in the visitor-downloadable production bundle. The
  public-safe boundaries remain documented here and in the QA records.

### Explicit deferrals and release blockers

| Item | Disposition | Release treatment |
| --- | --- | --- |
| Restaurant Tracker and Football Idle Game screenshots/descriptions | `DEFERRED` | Keep text-first, source-private WIP cards with no public destination. |
| Public resume URL | `DEFERRED` | Keep `resumeLink: null`; do not treat LinkedIn as a resume download. |
| Named collaborators/organizers | `DEFERRED` | Publish only approved roles, team/event facts, and source-backed context. |
| Browser-playable builds | `BLOCKED` | No candidate has a current rendered start-to-finish browser record; keep all play controls absent. |
| Supplied media and media-enabled visual pass | `BLOCKED` | No approved screenshot/media assets are available; retain text-first fallbacks. |
| Reduced-motion preference-enabled browser run | `BLOCKED` | The available browser control cannot emulate `prefers-reduced-motion: reduce`; CSS/source behavior is recorded. |
| Exact Vercel preview/production target | `BLOCKED` | Local build, Vercel config, and CI pass; deployment parity cannot be claimed without a target URL. |
| Davis final content/design approval | `BLOCKED` | Objective QA is recorded; Davis must review the final artifact before release. |

### Phase 6 evidence disposition

- T034: `PASS with limitations` — rendered external/project inventory and
  final URL/redirect observations are recorded in `link-audit.md`.
- T035: `BLOCKED` — no rendered candidate browser build exists; the complete
  start-to-finish playability matrix remains intentionally unrun.
- T036: `PASS` — no `Play in browser` control or `browser-verified` project was
  added.
- T037: `BLOCKED` overall — local desktop/tablet/mobile and media-disabled
  review passes; media-enabled, reduced-motion emulation, and deployed-target
  review remain unavailable.
- T038: `BLOCKED` overall — rendered keyboard, heading, focus, skip-path,
  contrast, mobile, and overflow checks pass; reduced-motion emulation remains
  unavailable.
- T039: `PASS` for source and the fresh local production artifact; deployed
  parity remains blocked. The internal-only bundle finding was remediated.
- T040: `BLOCKED` overall — local tests, build, metadata, and identity/work
  quickstart scenarios pass; deployment and preference/playability checks are
  not available.

The site is not represented as deployment-ready until the named blockers are
resolved or explicitly accepted by Davis. No unapproved copy, private source,
unsupported attribution, or live-play implication is used to close them.
