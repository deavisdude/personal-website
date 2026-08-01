# Technical and Visual Brief

**Feature**: [Davis Odom Personal Website Redesign](./spec.md)
**Updated**: 2026-08-01
**Status**: Direction approved; exact framework and token values remain open

## Approved technical direction

- Replace the existing Create React App source; no current application code is
  considered worth preserving.
- Use a modern web stack selected for the approved visual interaction model.
- Deploy the public site on Vercel.
- Use GitHub Actions for build, quality checks, and deployment workflow as
  appropriate, mirroring the restaurant-app operational model.
- Support traditional laptop/desktop browsers broadly, with a mobile-friendly
  experience for current iPhone and Android browsers.
- Keep content static or content-driven unless a later requirement justifies
  persistence or a service.
- Include lightweight analytics with privacy-conscious configuration; exact
  provider selection remains open.

## Approved visual direction

- Dark overall theme.
- Red as the primary accent, evoking Atlanta and Georgia sports without copying
  official team marks, logos, or protected artwork.
- The visual system should feel polished, serious, warm, and conversational.
- The professional engineering and game/world-building work should feel like one
  identity rather than two separate portfolios.
- The Brittany Chiang site remains a structural reference for hierarchy and
  focus, not a source for copied code, branding, colors, or content.

## Asset strategy

- Launch without photos or project screenshots if they are not available.
- Use intentional text-first and gradient/shape fallbacks rather than empty
  broken-media containers.
- When implementation reaches an asset-dependent area, record the missing asset
  and flag Davis; continue all independent work.
- Davis may supply screenshots, photos, or specific project call-outs later.

## Decisions still open

- Exact framework and language choice, with modern TypeScript-capable options
  under consideration.
- Exact typography, red/neutral color values, spacing scale, breakpoints, and
  motion tokens after visual exploration.
- Exact analytics provider, event scope, retention, and privacy configuration.
- Final browser support matrix and production preview checks.

## Content defaults

- Use `Senior Software Engineer` as the approved public role label.
- Use “I’m a software engineer from Georgia who builds tools, games, simulations
  and anything else that inspires me.” as the approved launch thesis, subject to
  light editorial refinement during implementation.
- WIP screenshots and specific project call-outs are optional and non-blocking.
- The current LinkedIn-export PDF may serve as an interim public resume; a
  polished resume can replace it in a later session.
