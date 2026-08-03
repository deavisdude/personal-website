# Visual Evidence

**Feature:** Davis Odom Personal Website Redesign
**Task:** T037 desktop, tablet, and mobile visual review
**Recorded:** 2026-08-01
**Build:** `cbe8359` on `codex/redesign`
**Overall status:** `BLOCKED` — the local rendered review passed; supplied-media-on and production-target prerequisites remain unavailable.

## Evidence boundary

This review used the rendered local site in the Codex In-app Browser. Browser
engine version was not exposed by the connected browser surface. The local
preview URL was `http://127.0.0.1:4173/`; the work-section checks used
`http://127.0.0.1:4173/#work` after opening the rendered navigation control.
Screenshots were inspected during the browser session; no screenshot artifact
was added because this task is limited to this QA file.

Commands:

```text
npm run build
npm run dev -- --host 127.0.0.1 --port 4173
```

`npm run build` passed with Vite 6.4.3 and produced the production bundle. The
preview was reachable after the local port-start permission was approved.

## Rendered viewport matrix

All width checks reported `document.documentElement.scrollWidth ===
document.documentElement.clientWidth`; no horizontal page overflow was
observed.

| Viewport | URL / action | Rendered observation | Result |
| --- | --- | --- | --- |
| Desktop `1440×900` | `/` | Desktop navigation, sticky identity rail, About, and the current Home Depot experience card are visible in a clear first-screen hierarchy. Computed document width was `1440`, body background was dark, and no console warning/error was captured. | `PASS` |
| Desktop `1440×900` | Open `Work` from primary navigation | Work section became the active `SECTION#work` target at `scrollY=750`; selected-work cards rendered in two columns at approximately `364px` each. Text-first fallbacks were readable and not clipped. | `PASS` |
| Tablet `768×1024` | `/` | Desktop navigation was replaced by the `Menu` control; identity content stacked above About and Experience. Selected-work cards retained a two-column layout (`343px` each) without clipping. Document width was `768`. | `PASS` |
| Tablet `768×1024` | Open `Menu`, then `Work` | The mobile panel fit within the viewport; Work became active at `scrollY=1061`. The two WIP cards and their dashed fallback blocks remained readable side by side. | `PASS` |
| Mobile `390×844` | `/` | The `Menu` control remained inside the `16px` side gutter. Davis, role, thesis, current context, and About remained readable with intentional wrapping. Document width was `390`. | `PASS` |
| Mobile `390×844` | Open `Menu`, then `Work` | Work became active at `scrollY=1157`; cards collapsed to one column (`358px` wide, `16px` side inset). Fallback copy wrapped without clipping. | `PASS` |
| Narrow minimum `320×800` | `/` | Body and document widths were both `320`; the menu button fit (`left=240.6`, `right=304`), the `h1` fit (`left=16`, `right=246.8`), and the sampled long-text elements had no internal overflow. | `PASS` |

## Review results

| Check | Result | Evidence |
| --- | --- | --- |
| Opening hierarchy | `PASS` | At `1440×900`, the Georgia eyebrow, Davis Odom identity, role, thesis, current employer context, About, and Experience read in the intended order. At `390×844`, the same hierarchy survives responsive wrapping. |
| Current-first narrative | `PASS` | The rendered order is About → Experience → Work; current unpublished WIP cards are separated from the Archive & historical context group. |
| Responsive layout and overflow | `PASS` | `1440×900`, `768×1024`, `390×844`, and `320×800` all matched client and scroll widths. Tablet selected work used two columns; mobile used one column. |
| Focus and controls | `PASS` | At `390×844`, the unique rendered `Open menu` button changed to `aria-expanded="true"`; the panel measured `288px` wide (`left=86`, `right=374`) and its links were visible. The screenshot showed a high-contrast focus ring around the active menu control. Anchor navigation produced a similarly prominent focus ring around the active Work section without obscuring content. |
| Readability and dark/red contrast | `PASS` | Live computed theme values were `#0b0d10` background, `#f5f7fa` text, `#c2cad5` muted text, `#ff9da2` accent text, and `#ffd1d4` focus. Runtime contrast calculations against the body background were `18.13:1` text, `11.77:1` muted, `9.82:1` accent, and `14.20:1` focus. This is a rendered spot check, not a substitute for the separate accessibility audit. |
| Missing-media/text fallback | `PASS` for media-disabled state | The rendered page contained `0` images and `7` `.project-card__media-fallback` blocks. WIP and archive cards retained titles, metadata, summaries, status, and destination context. No broken image container appeared. |
| Supplied-media/image-enabled state | `BLOCKED` | No approved screenshot/media assets are supplied, and the site exposes no media-on toggle. The browser could not provide a truthful media-enabled render. |
| Image-load error fallback | `BLOCKED` for live browser proof | The component has an `onError` fallback branch, but there was no approved public image to load and fail in the browser. The source check below is not visual proof. |
| Reduced-motion visual pass | `BLOCKED` | The connected browser surface did not expose a `prefers-reduced-motion` emulation control. The CSS rule was inspected as a source check only. |
| Production/deployed parity | `BLOCKED` | No production or preview deployment URL was available for exact-target comparison; this record covers the local Vite preview only. |

No observed visual defect was assigned `FAIL` in this run.

## Source/CSS checks (clearly not rendered proof)

- `src/content/siteContent.js:302` exports `mediaAssets = []`; every current
  project record has an empty media list. `src/assets/projects/` contains only
  `.gitkeep`, so the media-enabled prerequisite is genuinely unavailable.
- `src/components/ProjectCard.jsx:132-145` filters to public media with alt
  text, and `:316-332` renders either an image list or a text fallback. The
  browser evidence above only proves the empty-media branch.
- `src/index.css:5-24` defines the dark/red tokens; `:104-120` applies the
  no-horizontal-overflow rules; `:225-265` defines visible focus and skip-link
  treatment; `:284-299` defines reduced-motion behavior. These checks support
  the rendered observations but do not replace browser validation.

## Check status summary

| ID | Result | Note |
| --- | --- | --- |
| VIS-01 Opening hierarchy | `PASS` | Local rendered desktop/tablet/mobile evidence above. |
| VIS-02 Current-first narrative | `PASS` | Local DOM and rendered section order verified. |
| VIS-03 Responsive layout | `PASS` | Four exact viewport checks, including `320px` overflow minimum. |
| VIS-04 Media on/off | `PARTIAL` | Media-disabled fallback `PASS`; media-enabled supplied asset state `BLOCKED`. |
| VIS-05 Theme/readability | `PASS` | Rendered screenshots, computed colors, and console `warn/error` log check were clean. |
| VIS-06 Originality and restraint | `BLOCKED` | No independent reference/comparison artifact was part of this visual run. |
| VIS-07 Reduced motion | `BLOCKED` | Browser emulation prerequisite unavailable; CSS source check recorded only. |
| VIS-08 Exact target | `BLOCKED` | No deployed/preview target was supplied. |

The local result is suitable as rendered evidence for the passing rows. Keep
T037 open for a real media-enabled run if approved assets become available and
for a production-target comparison when a stable deployment URL exists.
