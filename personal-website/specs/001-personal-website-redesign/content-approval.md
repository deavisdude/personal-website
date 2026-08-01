# Content Approval Record

**Feature**: [spec.md](./spec.md)
**Last reviewed**: 2026-08-01
**Status**: Content facts and historical-source inventory updated from Davis's
2026-08-01 approval; rendered-link, playability, and release checks remain open

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
- Device direction: broad traditional desktop/laptop browser support plus a
  mobile-friendly experience for current iPhone and Android browsers.
- Visual direction: dark foundation with Atlanta-red accents, using sports
  influence as atmosphere rather than copying team marks or proprietary assets.
- Asset direction: text-first launch is acceptable; missing photos/screenshots
  are non-blocking and must be flagged during development for later handoff.
- Analytics direction: lightweight analytics are desired; Phase 1 selects
  `@vercel/analytics`, while event scope and exact privacy configuration remain
  a release-review decision.
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
| Support / Flux / Battle / UPBETOD roles | PARTIAL / ROLE APPROVED | Davis's roles are approved; collaborator names and final organizer/attribution wording remain unresolved where not supplied |
| Historical and official links | PARTIAL / CANDIDATES RECORDED | Supplied source candidates and read-only checks are recorded; final rendered-link audit and keep/remove decisions remain open |
| Resume | APPROVED / INTERIM | Current LinkedIn-export PDF may be published; replace with polished resume later |
| Technical and visual brief | PARTIAL | Vite/React, Vercel, GitHub Actions, device direction, dark/red direction, assets, and the analytics package are selected; visual tokens and final analytics/privacy settings remain |

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
| Support | Old-site manifest: two-day Southern Polytechnic State University Summer Game Jam project; public repository and legacy Web Player artifact. | `APPROVED` — Davis was an SE. The old-site manifest says the team had seven developers; collaborator names were not supplied. | Davis's role and seven-person team context may be published. Named collaborator and organizer wording remains `PENDING ATTRIBUTION REVIEW`; keep archive/download-only treatment unless a modern browser build is independently verified. |
| Flux | Old-site manifest: made at the 2013 HHS Game Jam at Southern Polytechnic State University in Atlanta; one of five winning submissions. Public `CDCJam-14` source repository and legacy Web Player artifact; legacy Dropbox download is recorded in `link-audit.md`. | `APPROVED` — Davis was an SE. No collaborator names were supplied. | Event and winning-submission facts may be attributed to the old-site manifest. Named collaborator/organizer wording remains `PENDING ATTRIBUTION REVIEW`; historical/download treatment only, with no play claim. |
| Battle of the Masses | Old-site index links the Global Game Jam entry; supplied historical YouTube video and public Global Game Jam reference are source candidates. | `APPROVED` — Davis was Design and Lead Programmer. No collaborator names were supplied. | Role may be published. Team, collaborator, and final event-attribution wording remain `PENDING ATTRIBUTION REVIEW`; historical-video/reference treatment only, with no play claim. |
| UPBETOD | Public `UPBETOD` repository, public Trello board, and supplied historical YouTube video. The repository README describes a Unity local-multiplayer, controller-based space shooter made for a game jam under time constraints. | `APPROVED` — Davis was an SE. No collaborator names were supplied. | Role and source descriptions may be published. Collaborator and final event-attribution wording remain `PENDING ATTRIBUTION REVIEW`; repository/Trello/video evidence only, with no play claim. |

**Exact remaining T004 approval**: Davis's roles above are approved. For each
team project, collaborator names and roles, whether a named organization should
be described as an organizer or collaborator, and final attribution text remain
open when they were not supplied. Do not infer solo authorship, collaborator
names, or organizational relationships from repository ownership or source
links.

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
