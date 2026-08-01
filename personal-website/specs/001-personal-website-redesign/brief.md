# Technical and Visual Brief

**Feature**: [Davis Odom Personal Website Redesign](./spec.md)
**Updated**: 2026-08-01
**Status**: Direction, implementation stack, release defaults, and visual
direction approved; rendered release evidence remains open

## Approved technical direction

- Replace the existing Create React App source; no current application code is
  considered worth preserving.
- Use a modern web stack selected for the approved visual interaction model.
- Deploy the public site on Vercel.
- Use GitHub Actions for build, quality checks, and deployment workflow as
  appropriate, mirroring the restaurant-app operational model.
- Support current evergreen laptop/desktop browsers broadly, plus current
  iPhone and Android browsers. The reasonable support baseline is the current
  and previous major release of Chrome, Edge, Firefox, and Safari, with
  progressive degradation for older browsers rather than an IE/obsolete-browser
  guarantee.
- Keep content static or content-driven unless a later requirement justifies
  persistence or a service.
- Include lightweight page-view analytics through `@vercel/analytics`. No
  custom event stream, authentication, form, or visitor-owned data service is
  in scope. No additional app-level privacy settings are required for this
  read-only experience.

## Phase 1 implementation selection

- **Framework and language**: Vite 6 with React 19, configured as a
  TypeScript-ready client-rendered application. Existing JavaScript files may
  be migrated incrementally as the redesign replaces the disposable CRA shell.
- **Styling system**: Plain CSS with shared custom properties in the planned
  `src/index.css` and `src/App.css`; no additional styling framework is needed
  for the single-page content-driven site.
- **Analytics**: `@vercel/analytics` is enabled in the presentation layer for
  page views only. No custom events, secret, project ID, or visitor-owned data
  service is committed here; final release QA still checks the deployed
  artifact and provider integration.
- **Deployment**: Vercel's static Vite build, emitted to `dist/`, with the
  repository workflow running `npm ci`, `npm test`, and `npm run build`.
- **CI runtime**: GitHub Actions on Node.js 22.x with the committed npm lockfile
  as the cache and installation source.
- **Entry point**: Vite's root `index.html` is the document entry. Its metadata
  remains intentionally minimal until the Phase 2 document-settings task
  approves the final title, description, social metadata, and favicon policy.

## Approved visual direction

- Dark overall theme.
- Red as the primary accent, evoking Atlanta and Georgia sports without copying
  official team marks, logos, or protected artwork.
- The visual system should feel polished, serious, warm, and conversational.
- The professional engineering and game/world-building work should feel like one
  identity rather than two separate portfolios.
- The Brittany Chiang site remains a structural reference for hierarchy and
  focus, not a source for copied code, branding, colors, or content.
- Exact typography, spacing, breakpoints, motion, and dark/Atlanta-red token
  values are an implementation decision within this approved direction; final
  visual QA must still verify readability, contrast, and responsive behavior.

## Asset strategy

- Launch without photos or project screenshots if they are not available.
- Use intentional text-first and gradient/shape fallbacks rather than empty
  broken-media containers.
- When implementation reaches an asset-dependent area, record the missing asset
  and flag Davis; continue all independent work.
- Davis may supply screenshots, photos, or specific project call-outs later.

## Release checks still open

- Final TypeScript migration timing and component-level implementation details.
- Rendered visual review at the approved desktop, tablet, narrow-mobile, and
  320 CSS-pixel checks.
- Final browser smoke checks across the reasonable evergreen support baseline.
- Exact Vercel production/preview target and deployment evidence.

## Content defaults

- Use `Senior Software Engineer` as the approved public role label.
- Use “I’m a software engineer from Georgia who builds tools, games, simulations
  and anything else that inspires me.” as the approved launch thesis, subject to
  light editorial refinement during implementation.
- WIP screenshots and specific project call-outs are optional and non-blocking.
- The current LinkedIn-export PDF may serve as an interim public resume; a
  polished resume can replace it in a later session.
