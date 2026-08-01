# Research: Davis Odom Personal Website Redesign

**Date**: 2026-08-01
**Status**: Complete for the content and information-architecture planning pass
**Feature**: [spec.md](./spec.md)

## Research method

This pass used the local application, the user-provided profile PDF, public
LinkedIn and GitHub material, the previous public website repository, selected
repository history, and a rendered/source inspection of the user's preferred
reference site. Public sources establish provenance and link context; they do
not authorize publishing every fact found there.

## Decision 1: Use one unified personal narrative

**Decision**: Present professional software engineering, developer-tool work,
game-jam work, simulations, useful tools, and Georgia-rooted interests as
different expressions of one person.

**Rationale**: Davis explicitly wants the site to represent all sides of him,
and the primary visitor needs a coherent identity before seeing a project list.
Separating engineering and games into competing brands would make the archive
feel disconnected and would overstate the importance of student-era work.

**Alternatives considered**:

- Two separate professional and game portfolios: rejected because it fragments
  the identity and duplicates navigation.
- A repository index: rejected because it gives equal weight to forks, stale
  experiments, private work, and current identity.

## Decision 2: Use a current-first, single-page portfolio hierarchy

**Decision**: Plan a single long-form experience with an identity/navigation rail
on large screens, a compact mobile equivalent, current identity and experience
first, selected work next, and a clearly labeled archive after that.

**Rationale**: The old site led with a student-era grid and contact flow. The
preferred reference site demonstrates that a persistent identity rail and
current-first timeline let a visitor understand the person before exploring
details. A single page also matches the low-maintenance requirement.

**Alternatives considered**:

- A multi-page resume site: deferred as unnecessary until the archive grows
  enough to justify additional routes.
- A dashboard or interactive timeline: rejected because it adds maintenance and
  competes with readable narrative.

## Decision 3: Treat historical work as an evidence-labeled archive

**Decision**: Include Support, Flux, Battle of the Masses, UPBETOD, and the BBQ
App as curated archive entries, with date evidence, role, attribution, status,
and destination type. Keep current or unpublished Restaurant Tracker and
Football Idle Game high-level and source-private.

**Rationale**: Davis wants the requested projects represented but does not want
abandoned work presented as production-ready or private source exposed. A typed
status lets a visitor understand what is still available without hiding the
history.

**Alternatives considered**:

- Retire all student-era projects: rejected because the game-jam work is part of
  the story and can be framed honestly.
- Promise to repair or host every old build: rejected because legacy builds and
  unavailable domains do not provide sufficient evidence of a safe modern demo.

## Decision 4: Separate link availability from playability

**Decision**: Use labels such as `Download only`, `Repository`, `Historical
link`, `Archive entry`, and `Play in browser` only after current-browser,
start-to-finish evidence. Store a verification date for externally verified
destinations.

**Rationale**: A successful HTTP response, a repository, an itch.io download, or
an old Unity file does not prove that a visitor can play a game in a modern
browser. This distinction is required for visitor trust and prevents the old
site's dead-link problem from returning.

**Alternatives considered**:

- Treat any available URL as playable: rejected because it creates a false
  promise.
- Remove all external links: rejected because official jam pages, repositories,
  and historical evidence are valuable when labeled accurately.

## Decision 5: Use public-safe content boundaries

**Decision**: Name The Home Depot only as current career context, use broad
developer-tools and engineering language, allow metro Atlanta/Georgia and
approved sports interests, and exclude phone, personal email, exact location,
family details, and confidential employer material.

**Rationale**: These are Davis's explicit publication boundaries. The site is an
expression of him, not an employer case study or contact funnel.

**Alternatives considered**:

- Publish a full resume and detailed employer project list: rejected until Davis
  approves a safe public copy and project wording.
- Add a contact form or personal email: rejected because no call to action is
  required and it would expose information Davis reserved.

## Decision 6: Design for text-first maintenance on a modern disposable shell

**Decision**: Replace the old Create React App source rather than preserving its
starter components. Represent profile, experience, projects, link evidence,
status, and media as explicit content records in a modern web stack. Make media
optional and keep the page useful when screenshots, downloads, or external sites
are unavailable.

**Rationale**: Davis expects infrequent updates and does not currently have a
large asset library. Data-driven content reduces update effort and prevents
layout logic from becoming a second content-management system. The old source
does not provide useful implementation constraints for the desired redesign.

**Alternatives considered**:

- A CMS or blog: rejected as unnecessary operational overhead.
- Media-first project cards: rejected because several valid entries currently
  have no approved screenshots.

## Decision 7: Use Vercel delivery with GitHub Actions automation

**Decision**: Deploy the site to Vercel and use GitHub Actions for build and
quality workflow automation, following the restaurant-app deployment model where
that model applies cleanly.

**Rationale**: Davis explicitly prefers this operational direction and it suits a
modern static/content-driven public site. The workflow can validate content,
build output, links, and accessibility before deployment.

**Alternatives considered**:

- Preserve the old hosting model: rejected because the source and delivery
  approach are both outdated.
- Add a custom server or database: rejected because the site has no visitor-owned
  data and should remain low-maintenance.

## Source and identity findings

### Local and historical site baseline

- The current checkout is an untouched Create React App shell. `src/App.js`
  shows the default starter screen; `package.json` identifies React 16.13.1,
  `react-scripts` 3.4.1, and Material UI 4.11.0.
- The prior public [My-Site repository](https://github.com/deavisdude/My-Site)
  uses a dark header/navigation, About/Portfolio/Contact sections, hover cards,
  a resume link, and archived game build files. Its content frames Davis as a
  student and is historical reference only.

### Reference-site findings

The rendered [Brittany Chiang site](https://brittanychiang.com/) was inspected
for structure and source shape. The useful patterns are a persistent identity
rail, anchored navigation, a concise opening thesis, a current-first experience
timeline, curated projects, archive framing, semantic headings, skip navigation,
and responsive behavior. The redesign MUST create its own copy, visual tokens,
branding, and code rather than copy the reference.

### Project evidence and link policy

| Project | Date evidence | Public evidence | Planning treatment |
| --- | --- | --- | --- |
| Support | Public build commits in July 2014; public README update 2016-05-13; GGDA announcement in June 2014 | [Support repository](https://github.com/deavisdude/Support), [GGDA award announcement](https://www.ggda.org/news/support-wins-summer-game-jam-at-spsu), and [itch.io download page](https://skateborden.itch.io/support) | Archive entry; download-only unless a modern browser build is independently verified |
| Flux | Described as a 2013 HHS/CDC game-jam project; older profile record dated 2014 | [GGDA 2014 review](https://www.ggda.org/news/ggda-2014-in-review); old web-build URL is unavailable | Archive entry with historical context; do not present the dead URL as live |
| Battle of the Masses | Public profile record January-March 2016 | [Global Game Jam reference](https://globalgamejam.org/2016/games/battle-masses), current health not established | Archive entry; historical-link status until final link check |
| UPBETOD | Public repository activity in June 2015 and README update 2016-05-13 | [UPBETOD repository](https://github.com/deavisdude/UPBETOD) | Repository/archive entry; no play claim without build evidence |
| BBQ App | Public profile record June 2014-April 2015 | Atlanta BBQ Club relationship is described in the profile context; no public app source is assumed | Archive/professional entry only after contract-safe wording and attribution approval |
| Restaurant Tracker | Current unpublished work | No source URL approved; user may provide screenshot and high-level description | WIP entry; private source and changing details excluded |
| Football Idle Game | Current unpublished work | No source URL approved; user may provide screenshot and high-level description | WIP entry; private source and changing details excluded |

Repository activity dates are evidence of public code history, not a claim that a
project was actively maintained throughout the interval. Forks and repositories
without a confirmed personal narrative are excluded by default.

## Resolved planning unknowns

- **Exact visual system**: intentionally deferred to the next user-provided
  visual brief; the plan records information architecture and non-negotiable
  quality constraints only.
- **Exact implementation/deployment stack**: the existing CRA shell is the
  current baseline, while the next technical brief may amend the proposed source
  structure before implementation.
- **Playable builds**: no build is treated as browser-verified in this pass;
  link and gameplay checks remain release tasks.
- **BBQ App wording**: the exact public contract-safe wording remains a user
  approval task, so the plan forbids guessing.

## Research conclusion

The redesign can proceed to content-model and validation planning without
inventing achievements, private employer details, or live game availability.
Implementation is intentionally gated on Davis's technical/visual brief and the
remaining content approvals listed in [tasks.md](./tasks.md).
