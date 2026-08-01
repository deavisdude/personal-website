# Implementation Plan: Davis Odom Personal Website Redesign

**Branch**: `codex/redesign` | **Date**: 2026-08-01 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-personal-website-redesign/spec.md`

## Summary

Create a content-driven personal website that introduces Davis as a Georgia
software engineer, documents current-safe experience and selected projects, and
frames older games and the BBQ App as an honest archive. The old Create React App
source is disposable; the implementation will use a modern design-capable web
stack, deploy on Vercel, and use GitHub Actions for build/workflow automation.
The site will preserve text-first fallbacks, typed project/link evidence,
public-safe content boundaries, lightweight analytics, and an accessible
responsive hierarchy.

## Technical Context

**Language/Version**: Modern TypeScript-capable web stack; exact framework and
version remain open until the visual interaction model is selected. The existing
React 16/CRA source will not be preserved.

**Primary Dependencies**: Modern framework, styling system, and lightweight
analytics provider to be selected; the current `react-scripts` and Material UI
dependencies are not constraints.

**Storage**: N/A. Profile and project content are public static content records;
no visitor-submitted or persistent user data is required.

**Testing**: Existing project test runner where useful, plus browser-based
responsive, keyboard, reduced-motion, link, provenance, privacy, and production
smoke validation documented in [quickstart.md](./quickstart.md).

**Target Platform**: Vercel-hosted public web experience for broad laptop and
desktop browser support plus current iPhone and Android browsers; exact browser
matrix is finalized during implementation QA.

**Project Type**: Single static/client-rendered personal web application.

**Performance Goals**: The identity and current-context content MUST be present
in the initial page experience; the page MUST remain usable when optional media
or third-party destinations are unavailable; analytics MUST remain lightweight
and no unapproved data service is introduced.

**Constraints**: Public-safe privacy boundaries, no private source exposure, no
fabricated claims, explicit link/playability status, optional media, keyboard and
responsive accessibility, and a low-maintenance update model.

**Scale/Scope**: One primary long-form page, three priority user stories, one
current-first experience narrative, two high-level WIP entries, five requested
archive entries, and a small explicit content catalog.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Visitor-First Clarity**: PASS. P1 and FR-001 through FR-006 require a
  30-second identity and current-first hierarchy.
- **II. Evidence With Provenance**: PASS. FR-008 through FR-017 and the research
  matrix distinguish role, date, status, source, and availability.
- **III. Public-Safe Privacy Boundaries**: PASS. FR-005, FR-007, FR-012, FR-013,
  FR-016, and FR-021 prohibit the identified disclosure classes.
- **IV. Inclusive, Resilient Experience**: PASS. FR-003, FR-004, FR-018,
  FR-019, SC-005, and SC-006 cover responsive, keyboard, motion, and fallback
  behavior.
- **V. Low-Maintenance Content System**: PASS. FR-022 and FR-023 keep the scope
  content-driven and exclude an unnecessary blog, funnel, or heavy integration.

**Gate result**: PASS for research and design planning. Implementation remains
gated on exact framework/token selection and the content approvals tracked in
`tasks.md`; this is a product-input gate, not a constitution violation.

## Project Structure

### Documentation (this feature)

```text
specs/001-personal-website-redesign/
├── spec.md                 # Feature requirements and user stories
├── research.md             # Phase 0 evidence and decisions
├── data-model.md           # Phase 1 content entities and invariants
├── quickstart.md           # Phase 1 validation/run guide
├── content-approval.md     # Phase 0 user-approved copy/provenance record
├── brief.md                # User-provided technical/visual implementation input
├── contracts/
│   └── content-entry.md    # Public content and link contract
├── checklists/
│   └── requirements.md     # Specification quality checklist
└── tasks.md                # Phase 2 actionable implementation tasks
```

### Source Code (repository root)

```text
src/
├── App.js                  # Page composition and route-independent shell
├── App.css                 # Page layout and component styling
├── index.css               # Global tokens, focus, and motion defaults
├── content/
│   ├── siteContent.js      # Approved profile, experience, and project data
│   └── projectLinks.js     # Typed link evidence and status helpers
├── components/
│   ├── SiteShell.js        # Landmarks, skip path, and responsive shell
│   ├── IdentityRail.js     # Opening identity and desktop navigation
│   ├── MobileNavigation.js # Narrow-screen navigation
│   ├── ExperienceSection.js
│   ├── ProjectCard.js
│   ├── ProjectArchive.js
│   └── Footer.js
└── assets/
    └── projects/           # Optional approved screenshots with alt text

public/
└── index.html               # Metadata, title, and public document settings
```

**Structure Decision**: Use the existing single React app as the smallest
coherent implementation surface. Keep approved content in `src/content/`, keep
layout components separate from project data, and treat `public/` as document
metadata/static fallback space. The final technical brief may revise this tree
before T009 begins; any revision must preserve the content contract and
traceability.

## Complexity Tracking

No constitution violations require justification. The proposed content catalog
and typed link evidence are required to satisfy provenance and maintenance rules,
not additional architectural layers.

## Phase 0: Content and source lock

Resolve the user-owned inputs that cannot be safely invented: final role label
and thesis, WIP descriptions/screenshots, BBQ App contract-safe wording,
project roles/attribution, and link/source approval. Record them in
`content-approval.md` before implementation tasks consume them.

## Phase 1: Foundation and content implementation

After the technical/visual brief, build the responsive shell and content-driven
catalog. Implement P1 identity/current experience first, then P2 project/archive
evidence, then P3 semi-personal context and resilient browsing. Preserve the
content contract even if the visual design changes.

## Phase 2: Validation and release readiness

Run production build, responsive and keyboard review, reduced-motion review,
link/status/provenance audit, playability audit, privacy/employer-safety search,
metadata review, and final Davis approval. Deployment is not a plan-complete
state until every required area is explicitly `PASS`, or an external prerequisite
is recorded as `BLOCKED`.

## Verification strategy

- **Content**: Compare published copy with `content-approval.md`; reject
  unapproved role, date, attribution, employer, or WIP detail.
- **Links**: Record destination type, status, source, redirect behavior, and
  verification date for every published external link.
- **Gameplay**: Start any candidate game from the actual UI, validate load,
  controls, core loop, completion/exit, and error behavior in the supported
  browser matrix. A repository or download alone never earns a play control.
- **Accessibility**: Traverse with keyboard, verify skip path/headings/focus,
  check narrow widths, and exercise reduced-motion behavior.
- **Privacy**: Search source content and the production build for disallowed
  personal, family, exact-location, employer-confidential, private-source, and
  placeholder content.
- **Release**: Run the commands and scenarios in `quickstart.md`, record output
  in the feature's QA notes, and keep unresolved external state explicitly
  labeled.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Current employment details are sensitive | Keep wording at approved role/domain/technology level; require content review |
| Old game links are dead or legacy | Use typed historical/download/repository labels and text-first fallbacks |
| Forks or team projects are misrepresented | Require role, collaborator, organizer, and provenance confirmation |
| Screenshots are unavailable | Make media optional and design useful text-first cards |
| Site becomes stale | Keep content data-driven and avoid a blog or fragile integrations |
| Reference site is copied too literally | Borrow hierarchy only; create original tokens, content, and interactions |
| WIP details change | Keep descriptions high-level and source-private |

## Definition of done

The redesign is ready for release when the acceptance criteria in `spec.md` pass,
the final content is approved by Davis, project claims have provenance, every
play control has current-browser evidence, and responsive/accessibility/privacy/
link QA is recorded. Until then, the feature remains planned or explicitly
blocked on a named prerequisite.
