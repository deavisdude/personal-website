# Accessibility Evidence

**Feature:** Davis Odom Personal Website Redesign
**Task:** T013 foundational evidence record; final accessibility execution is T038
**Recorded:** 2026-08-01
**Overall status:** `BLOCKED`

## Evidence boundary

This record defines the checks for the rendered redesign. It does not claim
that the current source, an application build, or a production deployment has
passed them. The semantic shell, CSS tokens, mobile navigation, and final
content are not yet available as a validated user journey in this record.

## Current result

| Area | Status | Evidence or blocker |
| --- | --- | --- |
| Required accessibility criteria | `PASS` at planning level | `spec.md` and `quickstart.md` define landmarks, headings, focus, skip path, reduced motion, narrow viewport, and text-first fallback expectations. |
| Rendered landmarks and heading order | `BLOCKED` | The redesigned page has not been opened for this audit. |
| Keyboard traversal and skip path | `BLOCKED` | No browser session or implemented shell evidence is recorded. |
| Focus visibility and accessible names | `BLOCKED` | No rendered controls have been inspected. |
| 320 CSS-pixel responsive behavior | `PARTIAL` | The approved P1 identity run confirmed a 320×800 viewport with no horizontal overflow and a visible LinkedIn control; the full accessibility journey remains for T038. |
| Reduced-motion behavior | `BLOCKED` | No implementation or preference-enabled browser run has been checked. |
| Optional-media and external-destination fallback | `BLOCKED` | Project components/content are not yet available for a disabled-media journey. |

No `FAIL` is recorded: no rendered accessibility execution was performed.
`BLOCKED` is an explicit missing-prerequisite state, not a pass.

## Exact prerequisites before execution

- T008-T012 (or approved equivalents) provide the content records, link
  statuses, CSS tokens, semantic shell, and document entry to inspect.
- The application can be started from the repository root with the commands
  in `quickstart.md`, and the URL of the exact build under review is recorded.
- Davis/brief approval supplies the final browser and viewport matrix; the
  320 CSS-pixel check remains required unless a larger minimum is explicitly
  approved in `brief.md`.
- A keyboard-capable browser, a screen-reader/accessible-tree inspection path,
  and a way to emulate `prefers-reduced-motion: reduce` are available.
- Optional project media can be disabled or blocked without hiding the title,
  summary, role/status, attribution, and fallback text.

## Repeatable checks

Run the checks against the same build that will be released. Record the URL,
commit/build identifier, browser/version, viewport, preference settings, date,
and evidence artifact for each run.

| ID | Check | Repeatable procedure | Expected evidence | Current result |
| --- | --- | --- | --- | --- |
| A11Y-01 | Landmarks | Open a clean page and inspect the accessibility tree/DOM for one clear page structure, navigation, main content, section headings, and footer. | Landmarks have meaningful roles/names and no duplicate or empty primary regions. | `BLOCKED` |
| A11Y-02 | Skip path | Press `Tab` from the fresh page, activate the skip control, and observe the focused target. | Skip control appears, has an accessible name, and moves focus to the main content. | `BLOCKED` |
| A11Y-03 | Heading order | Traverse or inspect all headings in source order. | Headings describe the information hierarchy without skipped/ambiguous section labels. | `BLOCKED` |
| A11Y-04 | Keyboard controls | Use only `Tab`, `Shift+Tab`, `Enter`, `Space`, and expected arrow keys through navigation, links, menus, and any project controls. | Every interactive control is reachable, has a usable name, and has a visible focus state. | `BLOCKED` |
| A11Y-05 | Responsive layout | Check the approved desktop/tablet/mobile widths, including 320 CSS pixels unless superseded by explicit approval. Inspect for clipped content and horizontal scrolling. | Primary content remains readable and no control is obscured or unreachable. | `BLOCKED` |
| A11Y-06 | Reduced motion | Enable the browser/OS reduced-motion preference, reload, and repeat the primary navigation journey. | Motion is reduced/removed without hiding content or blocking navigation. | `BLOCKED` |
| A11Y-07 | Fallbacks | Block optional images and external destinations, then inspect every project entry. | Text-first context and honest status/fallback labels remain available. | `BLOCKED` |
| A11Y-08 | Contrast/readability | Inspect text, links, focus rings, status labels, and controls in the approved dark/red theme at each key state. | Text and focus indicators remain distinguishable and usable; any tool findings are recorded. | `BLOCKED` |

## Evidence log template

| Date | Build/URL | Browser/version | Viewport/preferences | Checks run | Result | Artifact/notes |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-08-01 | Not available | Not run | Not run | Planning record only | `BLOCKED` | No live/browser evidence claimed. |

## Handoff

Replace the placeholder row with dated observations after the rendered page,
approved browser matrix, and fallback states exist. A failed keyboard path,
hidden focus state, overflow issue, or inaccessible name must be recorded as
`FAIL` with a reproducible path and fixed before release; an unavailable
external prerequisite remains `BLOCKED` with its owner and next action.
