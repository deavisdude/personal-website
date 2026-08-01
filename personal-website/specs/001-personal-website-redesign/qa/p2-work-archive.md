# P2 Work and Archive QA

**Feature**: [Personal website redesign](../spec.md)  
**User story**: User Story 2 — Explore selected work with honest context  
**Checked**: 2026-08-01  
**Result**: `PASS` for the Phase 4 implementation and independent journey

## Independent journey

The rendered local page was inspected with optional media absent and every
published destination retaining its content-record status. Each requested
entry exposed a title, summary, role, date, project status, provenance or
attribution context, and an honest fallback. No current unpublished entry
exposed a source URL, private asset, or browser-play promise.

| Project | Group | Required context | Destination treatment | Result |
| --- | --- | --- | --- | --- |
| Restaurant Tracker | Selected work / WIP | Current-unpublished label, high-level summary, in-progress status, source-private note | No destination; text-first fallback | `PASS` |
| Football Idle Game | Selected work / WIP | Current-unpublished label, high-level summary, in-progress status, source-private note | No destination; text-first fallback | `PASS` |
| Support | Archive | June–July 2014, Software Engineer role, seven-person team attribution, SPSU event evidence | Repository, historical announcement, and download labels; all unverified and non-play | `PASS` |
| Flux | Archive | 2013–2014, Software Engineer role, winning-submission attribution, HHS/SPSU evidence | Repository, historical review, and download labels; all unverified and non-play | `PASS` |
| Battle of the Masses | Archive | 2016, Design and Lead Programmer role, Global Game Jam attribution | Video and historical-reference labels; unverified and non-play | `PASS` |
| UPBETOD | Archive | 2015–2016 repository evidence, Software Engineer role, Unity technology | Repository, video, and project-board labels; unverified and non-play | `PASS` |
| BBQ App | Archive | June 2014–April 2015, sole creator role, TAG/Atlanta BBQ Club relationship | No assumed app URL or source; text-first archived fallback | `PASS` |

## Implementation checks

| Check | Evidence | Result |
| --- | --- | --- |
| Structured catalog | `node --input-type=module` audit found 7 entries, all 7 required IDs, and 0 invalid link records | `PASS` |
| Unit/component behavior | `npm test` — 3 suites, 7 tests passed | `PASS` |
| Production build | `npm run build` — Vite build completed successfully | `PASS` |
| Desktop browser render | `http://127.0.0.1:5173/`, 1440px viewport: HTTP 200, no console/page errors or Vite overlay, 7 project cards, 0 play controls, private notes not visible | `PASS` |
| Mobile browser render | 320px viewport: document width 320px, no horizontal overflow, 7 project cards, About/Experience/Work navigation present | `PASS` |
| Keyboard entry | First Tab at 320px focused `Skip to main content` and `#main-content` | `PASS` |
| Work navigation | Activating Work produced `#work` and `aria-current="location"` on Work | `PASS` |
| Optional media | No approved screenshot assets are currently supplied; missing-image behavior and public/private source guard are covered by `ProjectCard` tests | `PASS` for fallback behavior; asset availability remains `BLOCKED` |
| Browser playability | No project is `browser-verified`; no `Play in browser` control is rendered | `BLOCKED` for playable builds, safely fail-closed |

## Repeatable commands

From `personal-website/`:

```sh
npm test
npm run build
node --input-type=module -e "import { projectEntries } from './src/content/siteContent.js'; import { validateLinkEvidence } from './src/content/projectLinks.js'; /* verify 7 required IDs and link errors */"
```

The browser evidence used the Vite server at `127.0.0.1:5173` with the
installed headless Chrome runtime. The full release link audit, candidate-build
playability matrix, and final privacy audit remain Phase 6 work (`T034–T040`).
