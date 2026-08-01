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
- Analytics direction: lightweight analytics are desired; the provider and
  exact privacy configuration remain a small implementation decision.

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
| Technical and visual brief | PARTIAL | Vercel, GitHub Actions, device direction, dark/red direction, assets, and analytics are decided; exact framework/tokens remain |

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
