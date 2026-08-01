<!--
Sync Impact Report
==================
Version change: template -> 1.0.0
Modified principles: template placeholders replaced with five project principles
Added sections: Public Content Guardrails; Quality Gates and Delivery Workflow
Removed sections: none
Templates requiring updates:
  - ✅ .specify/templates/spec-template.md (reviewed; generic mandatory sections remain aligned)
  - ✅ .specify/templates/plan-template.md (reviewed; Constitution Check remains applicable)
  - ✅ .specify/templates/tasks-template.md (reviewed; story traceability and quality gates remain applicable)
  - ✅ specs/001-personal-website-redesign/spec.md (regenerated from the official template)
  - ✅ specs/001-personal-website-redesign/plan.md (regenerated from the official template)
  - ✅ specs/001-personal-website-redesign/tasks.md (regenerated from the official template)
  - ✅ specs/001-personal-website-redesign/research.md, data-model.md, quickstart.md, contracts/content-entry.md
Follow-up TODOs: none
-->

# Personal Website Constitution

## Core Principles

### I. Visitor-First Clarity

The site MUST communicate who Davis is, what he does, and why his work matters
within the first 30 seconds for a hiring-manager visitor. The experience MUST
also remain warm and intelligible for a curious visitor who arrives without
professional context. The information hierarchy MUST prioritize identity and
current engineering credibility, then selected work, then archival context.

### II. Evidence With Provenance

Public claims MUST be grounded in information Davis has approved or that is
verifiable from an authoritative public source. Project entries MUST distinguish
role, date, status, provenance, and current availability. Historical or
learning-oriented work MUST be framed honestly as an archive; unavailable,
abandoned, or non-production work MUST NOT be presented as current product
experience. Source code, technologies, and employer details MUST NOT be inferred
or disclosed beyond the approved public-safe scope.

### III. Public-Safe Privacy Boundaries

The site MUST NOT publish Davis's phone number, personal email address, exact
location, sensitive family information, or non-public employer information. Metro
Atlanta and broad professional context are acceptable. Private or unpublished
projects MAY be represented only with high-level, user-approved descriptions and
assets; private source code MUST remain private. Every external link and embedded
asset MUST be reviewed for unintended disclosure before release.

### IV. Inclusive, Resilient Experience

The site MUST be usable with keyboard navigation, readable at mobile and desktop
widths, and understandable with semantic structure and accessible names. Missing
or stale external links, unavailable game builds, absent project imagery, and
reduced-motion preferences MUST have graceful fallbacks. Content MUST remain
useful when optional media or third-party destinations are unavailable.

### V. Low-Maintenance Content System

The site MUST be organized around a small, explicit content model so normal
updates do not require rewriting layout logic. The implementation MUST favor
static, fast-loading presentation and simple maintenance over unnecessary
features. A blog, contact funnel, analytics-heavy personalization, and forced
call-to-action are out of scope unless separately approved. New content MUST
enter through the same provenance, privacy, and status rules as existing content.

## Public Content Guardrails

- The current employer MAY be named as current career context, but team names,
  internal project names, confidential metrics, and sensitive implementation
  details are excluded unless Davis explicitly approves them.
- The portfolio MUST label working demos, downloadable builds, unavailable links,
  archived work, and unpublished work with accurate status language.
- Game-jam and contract work MUST preserve credited collaborators, official event
  links when available, and the most defensible date source without implying
  ownership beyond Davis's stated role.
- A project entry MUST be removable or demotable without leaving broken primary
  navigation or an unsupported claim elsewhere on the site.

## Quality Gates and Delivery Workflow

- Every redesign increment MUST trace back to the feature specification and an
  independently testable user story.
- Before implementation, the plan MUST pass a constitution check and resolve
  research unknowns or record them as explicit blockers.
- Before release, the project MUST receive content/provenance review, privacy
  review, responsive and keyboard review, link/status review, and a production
  build check. A blocked external dependency MUST be recorded rather than
  silently represented as working.
- Documentation MUST be updated with the same change when content rules,
  validation steps, or public-safe assumptions change.

## Governance

This constitution governs the redesign specification, implementation plan, task
list, content model, and release review. It supersedes conflicting project
guidance unless an amendment explicitly states otherwise.

Amendments require a documented rationale, an incremented semantic version, and
an impact review of the specification, plan, tasks, templates, and release
checks. A major version removes or reverses a principle; a minor version adds or
materially expands a principle or governed section; a patch version clarifies
wording without changing obligations.

Each implementation phase MUST verify compliance with the applicable principles.
Any justified exception MUST be recorded in the plan's Complexity Tracking
section and MUST identify the safer alternative that was rejected. The current
constitution is the source of truth for future Spec Kit planning runs.

**Version**: 1.0.0 | **Ratified**: 2026-08-01 | **Last Amended**: 2026-08-01
