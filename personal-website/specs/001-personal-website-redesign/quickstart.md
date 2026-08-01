# Quickstart and Validation Guide

**Feature**: [Davis Odom Personal Website Redesign](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Validation guide for the implementation phase

## Prerequisites

- Node.js and npm compatible with the approved implementation baseline.
- The selected modern framework and final technical/visual brief recorded in
  `brief.md` before implementation begins.
- Approved content in `content-approval.md`, including WIP descriptions/assets,
  BBQ App wording, roles, attribution, and destination decisions.
- A Vercel project and GitHub Actions credentials/configuration appropriate for
  the approved deployment workflow.

## Start and build the site

From the application root:

```bash
npm install
npm start
```

Open the local URL printed by the development server. For a production-like
check, run:

```bash
npm test
npm run build
```

The exact build/deployment command may be amended with the approved technical
brief, but the final validation must exercise the same artifact that will be
published to Vercel and the same build checks run by GitHub Actions.

## Validation scenarios

### 1. P1 identity and current context

1. Open the page in a clean browser session at a desktop width and a narrow
   mobile width.
2. Confirm the first page experience identifies Davis, software engineering,
   Georgia, the thesis, and the current safe career context.
3. Use the primary navigation to reach About and current-first experience.
4. Record `PASS`, `BLOCKED`, or `FAIL` in the feature QA notes.

**Expected outcome**: A new visitor can identify Davis and his current
professional identity within 30 seconds without a contact funnel.

### 2. P2 work evidence and archive

1. Inspect Support, Flux, Battle of the Masses, UPBETOD, and the BBQ App.
2. Inspect Restaurant Tracker and Football Idle Game.
3. For each item, record title, date, role, status, attribution, destination
   type, and fallback behavior.
4. Confirm private source URLs and unapproved implementation details are absent.

**Expected outcome**: Every requested project is represented or explicitly
deferred, and no visitor can mistake an unverified archive item for a current
production demo.

### 3. Link and playability evidence

1. Open each visible external destination from the actual rendered control.
2. Record final URL, HTTP/redirect behavior, destination type, current status,
   source, and verification date in the link audit.
3. For any candidate browser game, test load, controls, core loop,
   completion/exit path, and failure behavior in the supported browser matrix.

**Expected outcome**: Only a build with current start-to-finish evidence has a
`Play in browser` control; all other links explain their actual status.

### 4. Accessibility and responsive behavior

1. Traverse the full page using only the keyboard.
2. Verify skip path, heading order, link names, visible focus, active navigation,
   and footer access.
3. Check a 320 CSS-pixel viewport, or the larger minimum approved in `brief.md`,
   for horizontal overflow and obscured content.
4. Enable reduced-motion preferences and repeat the primary journey.
5. Disable optional media and confirm each project retains useful text.

**Expected outcome**: All primary content remains understandable and reachable
without a mouse, optional animation, or optional media.

### 5. Privacy and content audit

1. Search source content and the production build for phone, personal email,
   exact location, family detail, confidential employer material, private
   repository URLs, placeholder text, and unsupported claims.
2. Compare rendered copy with `content-approval.md` and the content contract.
3. Confirm any blocked or unavailable external state is labeled rather than
   silently omitted or overstated.

**Expected outcome**: The audit reports zero disallowed disclosure or fabricated
claim instances.

## Evidence to retain

- Production build output and command result.
- Responsive screenshots or visual QA notes at agreed widths.
- Keyboard/reduced-motion QA notes.
- Link and playability audit with verification dates.
- Privacy/content audit result.
- Final Davis approval or explicit blockers.
