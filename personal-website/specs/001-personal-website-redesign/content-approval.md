# Content Approval Record

**Feature**: [spec.md](./spec.md)
**Last reviewed**: 2026-08-01
**Status**: Planning baseline; implementation direction mostly approved

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

## Open approvals before implementation

| Item | Status | Required evidence/decision |
| --- | --- | --- |
| Role label and opening thesis | APPROVED / ITERATIVE | Use `Senior Software Engineer`; the thesis below is the approved launch draft and may be refined |
| Restaurant Tracker | NON-BLOCKING | Screenshot/description may be supplied later; use text-first placeholder treatment |
| Football Idle Game | NON-BLOCKING | Screenshot/description may be supplied later; use text-first placeholder treatment |
| BBQ App | BLOCKED | Public-safe dates, role, Atlanta BBQ Club relationship, and contract wording |
| Support / Flux / Battle / UPBETOD roles | BLOCKED | Solo/team role, collaborator/organizer attribution, and source mapping |
| Historical and official links | BLOCKED | Final keep/remove decision after current link checks |
| Resume | APPROVED / INTERIM | Current LinkedIn-export PDF may be published; replace with polished resume later |
| Technical and visual brief | PARTIAL | Vite/React, Vercel, GitHub Actions, device direction, dark/red direction, assets, and the analytics package are selected; visual tokens and final analytics/privacy settings remain |

## T003: BBQ App evidence and pending approval

- **Known date evidence**: A public profile record places the BBQ App in June
  2014-April 2015. This is profile/work-range evidence, not a claim about an
  app launch date or continuous maintenance.
- **Atlanta BBQ Club relationship**: The profile context describes a
  relationship with Atlanta BBQ Club. No public app source is assumed.
- **Davis's role**: `BLOCKED/PENDING DAVIS APPROVAL` — confirm the exact role,
  contribution, and ownership wording that may be published.
- **Contract-safe wording**: `BLOCKED/PENDING DAVIS APPROVAL` — confirm the
  exact public description, whether Atlanta BBQ Club may be named, and any
  contract boundary that must be preserved. Do not infer an employer, client,
  business, legal, or contact detail.
- **Proposed wording (not approved or published)**: “BBQ App — Public profile
  record, June 2014-April 2015. The profile also describes an Atlanta BBQ Club
  relationship. Davis's role and the final contract-safe public wording are
  pending his approval.”

## T004: Archive project provenance and attribution

The date sources below retain their type. Repository activity is public code
history only; it is not silently converted into an event date, maintenance
interval, or playability claim.

| Project | Event/profile/repository date sources | Davis role and collaborators | Attribution decision and publication treatment |
| --- | --- | --- | --- |
| Support | Event: GGDA announcement in June 2014. Repository: public build commits in July 2014 and README update 2016-05-13. | `BLOCKED/PENDING DAVIS APPROVAL` — exact Davis role, solo/team status, and collaborator names are not established in the current record. | `BLOCKED/PENDING DAVIS APPROVAL` — confirm credits and organizer attribution before publication. Planning treatment remains archive/download-only unless a modern browser build is independently verified; no play claim. |
| Flux | Event/project context: described as a 2013 HHS/CDC game-jam project. Profile: older record dated 2014. Repository: no repository date is established in the current record. | `BLOCKED/PENDING DAVIS APPROVAL` — confirm Davis's role and whether HHS/CDC describes an organizer, collaborator, or other relationship; do not infer named teammates. | `BLOCKED/PENDING DAVIS APPROVAL` — confirm collaborator and organizer credits. Planning treatment remains historical archive context; the old web-build URL is unavailable and is not a live demo. |
| Battle of the Masses | Event reference: Global Game Jam reference dated 2016. Profile: public record January-March 2016. Repository: no repository date is established in the current record. | `BLOCKED/PENDING DAVIS APPROVAL` — exact Davis role, ownership level, and collaborators are not established. | `BLOCKED/PENDING DAVIS APPROVAL` — confirm team and event attribution; do not imply solo authorship. Planning treatment remains historical-link/archive pending final link check; no play claim. |
| UPBETOD | Event/profile: no event or profile date is established in the current record. Repository: public activity in June 2015 and README update 2016-05-13. | `BLOCKED/PENDING DAVIS APPROVAL` — exact Davis role, ownership level, and collaborators are not established. | `BLOCKED/PENDING DAVIS APPROVAL` — confirm repository provenance and any collaborator credits. Planning treatment remains repository/archive only; repository activity does not establish an event date or playability. |

**Exact missing T004 approval**: For each project, Davis must confirm his role
and level of ownership, the names and roles of collaborators, whether each
named organization is an organizer or collaborator, and the final attribution
text. Until those confirmations are supplied, proposed role or attribution
wording is non-published pending text only.

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
