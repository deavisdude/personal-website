# Accessibility QA Evidence

**Feature:** Davis Odom Personal Website Redesign

**Task:** T038 — keyboard, heading, focus, skip-path, reduced-motion, contrast, and narrow-viewport review

**Recorded:** 2026-08-01 19:50 EDT

**Overall status:** `BLOCKED` — all executed checks pass; the live `prefers-reduced-motion: reduce` journey could not be enabled through the available browser control.

## Evidence boundary

This record separates direct source/automated evidence from real rendered-browser evidence. The application root was `/Users/davisodom/Workspace/personal-website/personal-website`, reviewed from base commit `cbe83590acc7ae64db8674bc464defdd221dbd40`. At the start of the run, `personal-website/specs/001-personal-website-redesign/qa/visual.md` had an existing dirty change; by the final check, `qa/privacy.md`, `src/content/siteContent.js`, and an untracked `qa/release.md` were also dirty. Those paths were not touched by T038 and were preserved. No source file or `tasks.md` was edited for T038.

The requested accessibility checks were run against the Vite local preview at `http://127.0.0.1:5173/`. The browser-control API does not expose a browser version; the real key-input run used the connected Chrome extension browser, recorded as `Chrome (version not exposed by control API)`.

## Commands and automated/source evidence

Run from the application root:

```bash
npm test
npm run build
npm run dev -- --host 127.0.0.1
```

| Evidence | Result | Observation |
| --- | --- | --- |
| `npm test` | `PASS` | 5 test files, 11 tests passed. Existing tests cover rendered heading roles, anchored navigation, mobile-menu labeling, Escape focus return, and text-first project fallbacks. |
| `npm run build` | `PASS` | Vite 6.4.3 emitted `dist/index.html`, CSS, and JS successfully. |
| Source inspection | `PASS` | `src/components/SiteShell.jsx:362-469` implements the skip target, named landmarks, sections, and focusable main; `src/components/MobileNavigation.jsx:72-161` implements Escape, labels, `aria-expanded`, `aria-controls`, and native `hidden`; `src/index.css:225-301` and `src/App.css:141-147` implement visible focus and reduced-motion rules; `src/App.css:887-952` implements responsive/mobile rules. |
| Browser console | `PASS` | Chrome recorded no error or warning messages during the run. |

## Browser matrix and procedure

| Browser surface | Viewport | Preference | Evidence |
| --- | --- | --- | --- |
| Codex In-app Browser | 1280×720 default | Default motion | Real DOM/accessibility snapshot matched the semantic page structure. Its key-dispatch path did not advance focus from the document body, so it is not used as keyboard-traversal evidence. |
| Connected Chrome extension browser | 1920×935 default | Default motion | Full rendered keyboard traversal and desktop activation run. |
| Connected Chrome extension browser | 320×800 explicit viewport override | Default motion | Mobile menu, focus-return, overflow, and narrow-layout run. |

The Chrome procedure was: reload the local URL; use `Tab`/`Enter`/`Escape` through the rendered controls; inspect the active element, URL/hash, ARIA state, computed focus styles, DOM landmarks/headings, and scroll widths; then repeat at 320×800. The explicit viewport override was reset after the run.

## T038 results

| Area | Status | Real rendered result and evidence |
| --- | --- | --- |
| Landmarks | `PASS` | The desktop accessibility tree exposed one banner/header, `Primary navigation`, `Supporting content`, `Main content`, `Site footer`, and the separately named `Social links` navigation. At 320px the primary nav is hidden and the mobile button is exposed; opening it exposes exactly one `Mobile navigation` landmark. No `aria-labelledby` target was missing and no duplicate DOM IDs were found. |
| Heading hierarchy | `PASS` | The rendered DOM contains exactly one `h1` (`Davis Odom`), followed by `h2` section headings, `h3` content headings, and `h4` destination headings. A bounded DOM check found zero heading-level jumps and zero duplicate IDs. |
| Keyboard traversal | `PASS` | At 1920×935, a fresh `Tab` cycle reached 17 rendered stops in order: skip link; About, Experience, Work; rail LinkedIn; Support’s 3 links; Flux’s 3 links; Battle of the Masses’ 2 links; UPBETOD’s 3 links; footer LinkedIn. The next `Tab` left focus on `body`, and the following `Tab` returned to the skip link. Hidden mobile controls did not enter the desktop order. All stops had a usable text/ARIA name. |
| Skip path | `PASS` | From a fresh page, the first `Tab` focused `Skip to main content`. `Enter` produced `#main-content` and focused `<main id="main-content" tabindex="-1">`. |
| Focus visibility and return | `PASS` | Every real Chrome tab stop reported `outline: solid 3px rgb(255, 209, 212)` with `outline-offset: 4px`. The mobile menu button had the same visible outline. `Escape` closed the menu and returned focus to the `Open menu` button; activating a mobile section link closed the menu and focused the destination section. |
| Mobile menu labeling | `PASS` | At 320×800, the unique button was `Open menu`, `aria-expanded="false"`, `aria-controls="mobile-navigation"`. `Enter` changed it to `Close menu`, `aria-expanded="true"`, exposed the named `Mobile navigation`, and exposed exactly `About`, `Experience`, and `Work` links. `Escape` restored the closed state and button focus. |
| Narrow viewport behavior | `PASS` | At exactly 320×800, the closed and open states both reported `document.documentElement.scrollWidth = document.body.scrollWidth = window.innerWidth = 320`. The open panel measured left 16px, right 304px, width 288px; the title and menu button remained visible. |
| Reduced-motion behavior | `BLOCKED` | Source and rendered CSS evidence passed: the same-origin stylesheet contains `@media (prefers-reduced-motion: reduce)` setting motion variables to `0ms`, `scroll-behavior: auto`, `animation: none`, and `transition: none` (`src/index.css:284-301`). The browser reported `matchMedia('(prefers-reduced-motion: reduce)').matches = false`; this browser-control surface exposed no preference emulation, so the preference-enabled reload and journey remain unverified. |
| Contrast/readability | `PASS` | Computed rendered colors and ratios are recorded below. Every sampled text/state pair exceeded 4.5:1, and the focus color exceeded 3:1 against the dark background. |

No `FAIL` was observed. Optional-media failure injection and external-destination outage testing remain outside T038 and belong to the project/link and visual/playability QA records.

## Contrast evidence

Ratios were calculated from the computed colors of the rendered local preview and the source token backgrounds. The status-badge rows use the rendered 10% alpha background composited over the project-card surface.

| Rendered state | Foreground/background | Ratio | Result |
| --- | --- | ---: | --- |
| Body text | `#f5f7fa` on `#0b0d10` | 18.13:1 | `PASS` |
| Muted card/rail text | `#c2cad5` on `#0b0d10` / `#171c23` | 11.77:1 / 10.35:1 | `PASS` |
| Subtle navigation text | `#a3aebb` on `#0b0d10` | 8.64:1 | `PASS` |
| Accent links | `#ff9da2` on `#0b0d10` / `#171c23` | 9.82:1 / 8.64:1 | `PASS` |
| Active navigation | `#f5f7fa` on accent tint `#35191e` | 14.95:1 | `PASS` |
| Current/warning status labels | `#78d6a8` / `#f2cb78` on rendered alpha badges | 7.91:1 / 8.83:1 | `PASS` |
| Skip/button text | `#f5f7fa` on raised surface `#1e252f` | 14.38:1 | `PASS` |
| Focus indicator | `#ffd1d4` on `#0b0d10` | 14.20:1 | `PASS` |

## Remaining blocker and repeat

Run the same local URL at 1920×935 and 320×800 with a browser/OS setting that makes `matchMedia('(prefers-reduced-motion: reduce)').matches` true. Repeat the skip, primary/mobile navigation, focus-return, and anchored-section journey, then replace the reduced-motion `BLOCKED` row and overall status if the result passes.
