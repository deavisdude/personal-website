---

description: "Dependency-ordered implementation tasks for the Davis Odom personal website redesign"

---

# Tasks: Davis Odom Personal Website Redesign

**Input**: Design documents from `/specs/001-personal-website-redesign/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md),
[research.md](./research.md), [data-model.md](./data-model.md),
[contracts/content-entry.md](./contracts/content-entry.md), and
[quickstart.md](./quickstart.md)

**Tests**: No test-first implementation tasks are prescribed; the feature
specification requires independent journey validation and release QA, which are
listed as executable validation tasks below.

**Organization**: Tasks are grouped by user story so each story can be
implemented and reviewed as an independent increment after the foundational
phase.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel with other tasks in the same phase because it
  touches a different file or waits on an independent input.
- **[Story]**: Maps a task to a user story in [spec.md](./spec.md).
- Every task includes an exact project-relative file or directory path.

## Path Conventions

- Application root: `src/`, `public/`, `package.json`, and `package-lock.json`
- Planning and evidence: `specs/001-personal-website-redesign/`
- Optional approved project media: `src/assets/projects/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Lock user-owned content and implementation inputs before source
work begins.

- [x] T001 [P] Record the approved public role label, opening thesis, profile wording, and public social/resume decisions in `specs/001-personal-website-redesign/content-approval.md`
- [x] T002 [P] Record the text-first asset policy and optional future screenshot handoff for Restaurant Tracker and Football Idle Game in `specs/001-personal-website-redesign/content-approval.md`
- [x] T003 [P] Record the BBQ App dates, role, Atlanta BBQ Club relationship, and contract-safe public wording in `specs/001-personal-website-redesign/content-approval.md`
- [x] T004 [P] Record Davis's role, collaborators, event/profile/repository date sources, and attribution decisions for Support, Flux, Battle of the Masses, and UPBETOD in `specs/001-personal-website-redesign/content-approval.md`
- [x] T005 [P] Record the approved modern-stack migration, Vercel deployment, GitHub Actions workflow, broad desktop/mobile target, dark/Atlanta-red direction, text-first asset policy, and lightweight-analytics direction in `specs/001-personal-website-redesign/brief.md`
- [x] T006 Select and initialize the modern web framework, styling system, analytics provider, and deployment integration in `package.json`, `package-lock.json`, `.github/workflows/ci.yml`, and `vercel.json` after the visual interaction model is approved
- [x] T007 Create the planned content, component, and project-media directories in `src/content/`, `src/components/`, and `src/assets/projects/` (or the selected framework equivalents recorded in `brief.md`) (depends on T006)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared content, link, document, and accessibility
infrastructure before any user story implementation.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete and
the exact framework, styling system, and visual tokens are approved.

- [x] T008 Create the approved Profile, Experience Item, Project Entry, Link Evidence, and Media Asset records in `src/content/siteContent.js` according to `specs/001-personal-website-redesign/data-model.md`
- [x] T009 Create typed destination, status, verification-date, attribution, and fallback helpers in `src/content/projectLinks.js` according to `specs/001-personal-website-redesign/contracts/content-entry.md`
- [x] T010 Establish approved typography, color, spacing, breakpoint, focus, and reduced-motion tokens in `src/index.css` and `src/App.css`
- [x] T011 Create semantic page landmarks, skip path, content sections, and responsive shell boundaries in `src/components/SiteShell.jsx`
- [x] T012 Configure approved title, description, social metadata, favicon, and public document settings in `index.html`
- [x] T013 Create the link, playability, accessibility, privacy, visual, and final-review evidence files in `specs/001-personal-website-redesign/qa/` and `specs/001-personal-website-redesign/link-audit.md`

**Checkpoint**: Shared content and accessibility foundations are ready; each
user story can now be implemented and validated independently.

---

## Phase 3: User Story 1 - Recognize Davis and his current engineering identity (Priority: P1) 🎯 MVP

**Goal**: A hiring manager can identify Davis, his current safe engineering
context, and the site's main narrative within 30 seconds.

**Independent Test**: Open the implementation at approved desktop and mobile
widths, read only the opening/About/experience flow, and confirm that a reviewer
can state Davis's identity, Georgia connection, current context, and next
navigation destination without using a resume or contact funnel.

### Implementation for User Story 1

- [ ] T014 [P] [US1] Populate the approved profile, career context, and current-first experience data in `src/content/siteContent.js`
- [ ] T015 [US1] Implement the desktop identity rail, opening thesis, Georgia/location phrasing, and public social links in `src/components/IdentityRail.jsx`
- [ ] T016 [US1] Implement the About and current-first Experience sections with employer-safe wording in `src/components/ExperienceSection.jsx`
- [ ] T017 [US1] Implement anchored section navigation and active-section feedback for desktop and mobile in `src/components/SiteShell.jsx`
- [ ] T018 [US1] Compose the P1 page flow and identity-to-experience hierarchy in `src/App.jsx`
- [ ] T019 [US1] Record the P1 identity and current-context result as `PASS`, `BLOCKED`, or `FAIL` in `specs/001-personal-website-redesign/qa/p1-identity.md`

**Checkpoint**: User Story 1 is independently demonstrable as a coherent
identity and current-career page.

---

## Phase 4: User Story 2 - Explore selected work with honest context (Priority: P2)

**Goal**: A visitor can explore WIP work and the five requested archive projects
while understanding role, date, provenance, status, and actual link availability.

**Independent Test**: Disable all optional media and unavailable destinations,
then inspect every requested project entry. Each entry still has useful context,
and no unverified project offers browser play or exposes private source.

### Implementation for User Story 2

- [ ] T020 [P] [US2] Add approved Support and Flux project records, event/date evidence, award or historical context, and destination sources in `src/content/siteContent.js`
- [ ] T021 [P] [US2] Add approved Battle of the Masses and UPBETOD project records, date evidence, attribution, and repository/historical destinations in `src/content/siteContent.js`
- [ ] T022 [P] [US2] Add the BBQ App project record with approved dates, role, Atlanta BBQ Club relationship, and contract-safe wording in `src/content/siteContent.js`
- [ ] T023 [P] [US2] Add Restaurant Tracker and Football Idle Game WIP records with approved high-level copy, media references, and private-source exclusions in `src/content/siteContent.js`
- [ ] T024 [US2] Implement project cards with category, date, role, status, attribution, technology, and fallback presentation in `src/components/ProjectCard.jsx`
- [ ] T025 [US2] Implement selected-work and archive grouping without implying that archived or abandoned projects are current production work in `src/components/ProjectArchive.jsx`
- [ ] T026 [US2] Implement typed repository, download, official, historical, and browser-verified link rendering with no play control by default in `src/content/projectLinks.js` and `src/components/ProjectCard.jsx`
- [ ] T027 [US2] Add optional screenshot rendering, missing-media fallbacks, and public/private asset guards in `src/components/ProjectCard.jsx` and `src/assets/projects/`
- [ ] T028 [US2] Record the P2 work/archive result for all requested projects in `specs/001-personal-website-redesign/qa/p2-work-archive.md`

**Checkpoint**: User Story 2 is independently demonstrable with text-first
project evidence and honest availability labels.

---

## Phase 5: User Story 3 - Browse the whole person without friction (Priority: P3)

**Goal**: A curious visitor can find approved personal context and browse the
full narrative by keyboard or narrow viewport even when optional media is absent.

**Independent Test**: Use keyboard-only traversal at the smallest supported
viewport with optional media disabled and reduced motion enabled. Confirm every
primary section is reachable, readable, and backed by a useful fallback.

### Implementation for User Story 3

- [ ] T029 [P] [US3] Add approved Georgia, University of Georgia, Atlanta Braves, and other semi-personal details to `src/content/siteContent.js`
- [ ] T030 [US3] Implement the personal note, public social links, optional resume link, and no-forced-CTA footer in `src/components/Footer.jsx`
- [ ] T031 [US3] Implement narrow-screen navigation, menu labeling, focus return, and skip-path behavior in `src/components/MobileNavigation.jsx` and `src/components/SiteShell.jsx`
- [ ] T032 [US3] Apply reduced-motion behavior, visible focus, readable fallback text, and no-horizontal-overflow rules in `src/index.css` and `src/App.css`
- [ ] T033 [US3] Record keyboard, responsive, reduced-motion, and missing-media results in `specs/001-personal-website-redesign/qa/p3-browse.md`

**Checkpoint**: User Story 3 is independently demonstrable as an accessible,
human, low-friction browsing experience.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Prove the complete feature against the constitution, contract, and
release criteria.

- [ ] T034 [P] Check every published external and project link and record final URL, redirect behavior, destination type, source, status, and verification date in `specs/001-personal-website-redesign/link-audit.md`
- [ ] T035 [P] Test each candidate browser build from the rendered control for load, controls, core loop, completion/exit, and failure behavior and record results in `specs/001-personal-website-redesign/qa/playability.md`
- [ ] T036 [P] Add `Play in browser` only for builds with current start-to-finish evidence in `src/content/siteContent.js` and `src/content/projectLinks.js`
- [ ] T037 [P] Run desktop, tablet, and mobile visual review with optional media enabled and disabled and record evidence in `specs/001-personal-website-redesign/qa/visual.md`
- [ ] T038 [P] Run keyboard, heading, focus, skip-path, reduced-motion, and contrast review and record evidence in `specs/001-personal-website-redesign/qa/accessibility.md`
- [ ] T039 [P] Run privacy, employer-safety, private-source, placeholder, attribution, and unsupported-claim searches over source and production output and record evidence in `specs/001-personal-website-redesign/qa/privacy.md`
- [ ] T040 [P] Run the build, project test runner, metadata review, and quickstart scenarios and record results in `specs/001-personal-website-redesign/qa/release.md`
- [ ] T041 Update `specs/001-personal-website-redesign/content-approval.md` with final approved copy, explicit deferrals, and remaining `BLOCKED` prerequisites
- [ ] T042 Complete Davis's final content and design review and record `PASS`, `BLOCKED`, or `FAIL` for each required area in `specs/001-personal-website-redesign/qa/final-review.md`
- [ ] T043 Prepare deployment configuration and release notes only after T042 passes in `README.md` and the approved deployment configuration files

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: T001-T005 are user-input tasks that can proceed in
  parallel; T006-T007 depend on the technical brief and complete the setup.
- **Foundational (Phase 2)**: Depends on Phase 1 and blocks all user stories.
- **User Stories (Phases 3-5)**: Depend on the foundational phase; P1 is the
  suggested MVP, while P2 and P3 can proceed independently after foundation and
  their content approvals are complete.
- **Polish (Phase 6)**: Depends on the desired user stories being implemented;
  T042 is the release gate for T043.

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Phase 2 and T001; no dependency on P2/P3.
- **User Story 2 (P2)**: Depends on Phase 2 and T002-T004; no dependency on P1
  beyond the shared site shell.
- **User Story 3 (P3)**: Depends on Phase 2 and T001; no dependency on P2 beyond
  the shared content and shell contracts.

### Within Each User Story

- Content records precede the components that render them.
- Shared shell and link helpers precede story-specific presentation.
- A story's independent evidence task runs after its implementation tasks.
- Play controls remain disabled until the cross-cutting playability task passes.

### Parallel Opportunities

- T001-T005 can be collected independently from Davis.
- T008-T010 and T012-T013 can be implemented in parallel once the technical
  brief exists; T011 is the shared shell dependency for presentation work.
- T020-T023 can be populated in parallel because they touch independent content
  records after the content contract is approved.
- T029-T032 can be developed in parallel after the foundational shell exists.
- T034-T040 are independent evidence passes once the page is feature-complete.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 content/technical inputs.
2. Complete Phase 2 shared content and accessibility foundation.
3. Complete Phase 3 P1 identity and current-first experience.
4. Stop and validate T019 independently.
5. Continue only after Davis approves the visual direction and P1 content.

### Incremental Delivery

1. Add P2 WIP/archive evidence and validate every requested project.
2. Add P3 personal context and resilient responsive browsing.
3. Run all cross-cutting audits and retain evidence.
4. Deploy only after final review is `PASS`.

### Parallel Team Strategy

1. One contributor owns the content approval and provenance record.
2. One contributor owns the shared shell and accessibility foundation.
3. After foundation, contributors can own P1 identity, P2 archive, and P3
   browsing independently, provided they do not edit the same content records
   concurrently without reconciliation.

## Notes

- All tasks use the required checkbox, sequential ID, optional `[P]`, required
  user-story labels inside story phases, and exact file paths.
- No task licenses invented achievements, private source, or unverified browser
  playability.
- A `BLOCKED` prerequisite is a valid outcome when an external source, asset,
  approval, or browser build is unavailable; it must be named in the QA record.
