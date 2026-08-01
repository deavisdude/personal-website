# Feature Specification: Davis Odom Personal Website Redesign

**Feature Branch**: `codex/redesign`

**Created**: 2026-08-01

**Status**: Draft

**Input**: User description: Redesign Davis Odom's personal website to represent
him first, document selected work second, and support selective engineering
opportunities third. The site should serve hiring managers and curious visitors,
unify professional engineering with game and world-building work, preserve an
honest archive, and protect public-safe privacy boundaries.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Recognize Davis and his current engineering identity (Priority: P1)

A hiring manager opens the site while reviewing Davis's background. The visitor
can quickly understand who Davis is, that he is a software engineer from Georgia,
what his current professional context is at a safe level, and where to learn more
about his experience.

**Why this priority**: Representation is the site's primary job and the hiring
manager is the most important visitor. If this story fails, the rest of the
portfolio cannot provide useful context.

**Independent Test**: Present only the identity, About, experience, and primary
navigation content in the agreed responsive shell. A reviewer who has not seen
the implementation can identify Davis, his role, his Georgia connection, and his
current engineering context within 30 seconds.

**Acceptance Scenarios**:

1. **Given** a first-time visitor on a supported desktop or mobile viewport,
   **When** the page opens, **Then** Davis's name, software-engineering identity,
   Georgia connection, and concise personal thesis are visible without a
   separate recruiting funnel.
2. **Given** a visitor wants current professional context, **When** they use the
   site's primary navigation, **Then** they can reach a current-first experience
   summary and About content without encountering confidential employer details.
3. **Given** a visitor arrives without recruiting context, **When** they read the
   opening and About content, **Then** the writing presents Davis as one person
   whose engineering, game, tool-building, and Georgia-rooted interests belong in
   one narrative.

---

### User Story 2 - Explore selected work with honest context (Priority: P2)

A visitor explores Davis's work after understanding his identity. They can see
current or unpublished projects at a high level, browse the requested game-jam
and BBQ App archive, and distinguish each item's role, date, status, provenance,
and available destination.

**Why this priority**: The site documents Davis's work, but the work is useful
only when the visitor can tell what is current, what is historical, what is
playable, and what is unavailable.

**Independent Test**: Supply the approved project catalog and render the work
sections without relying on a resume PDF, private repository, or live game build.
A reviewer can inspect every requested entry and accurately describe its status
and Davis's role from the page alone.

**Acceptance Scenarios**:

1. **Given** a visitor opens the selected-work or archive section, **When** they
   inspect Support, Flux, Battle of the Masses, UPBETOD, and the BBQ App,
   **Then** each entry has an honest date or date range, role, status, and
   provenance treatment, even if its original site is unavailable.
2. **Given** a visitor inspects Restaurant Tracker or Football Idle Game,
   **When** the entry is shown, **Then** it uses only approved high-level copy
   and supplied media, with no private source link or unstable implementation
   detail.
3. **Given** an external destination is missing, redirected, historical,
   download-only, repository-only, or not yet verified, **When** the visitor
   views the project entry, **Then** the label describes the actual destination
   and the page does not imply a live demo.
4. **Given** a game build has not passed a current start-to-finish browser check,
   **When** the visitor views that project, **Then** no `Play in browser` control
   is offered.

---

### User Story 3 - Browse the whole person without friction (Priority: P3)

A curious visitor uses the site as a small portrait of Davis rather than only as
a resume. They can find selected Georgia, University of Georgia, Atlanta Braves,
and other approved semi-personal context, move between sections from a keyboard
or small screen, and continue reading when optional media or external links are
unavailable.

**Why this priority**: The site is an expression of Davis and his work, not only
an application funnel. This story makes the experience personal and durable
without expanding it into a blog or contact system.

**Independent Test**: Use a keyboard-only traversal and narrow viewport with
optional project media disabled. The visitor can reach every primary section,
understand focus and active navigation, and read the complete narrative without
horizontal scrolling or a broken-media dead end.

**Acceptance Scenarios**:

1. **Given** a visitor uses only a keyboard, **When** they traverse the page,
   **Then** the skip path, headings, navigation, links, and other controls have
   an understandable order and visible focus.
2. **Given** a visitor uses a narrow supported viewport or prefers reduced motion,
   **When** they browse the page, **Then** the information hierarchy remains
   usable and motion does not block comprehension.
3. **Given** a project has no approved screenshot or its external destination is
   unavailable, **When** the visitor reads that entry, **Then** a text-first
   archival or status fallback preserves useful context.

### Edge Cases

- A historical game-jam URL redirects, times out, or resolves to an unrelated
  page after the content was approved.
- A downloadable build exists but cannot be treated as browser-playable, or a
  browser build loads without completing its core loop.
- A project has conflicting event, profile, and repository dates; the page must
  use an appropriately broad date label and retain the source distinction.
- No screenshot is supplied for either unpublished project at launch.
- The BBQ App contract wording, dates, or attribution are not approved in time;
  the entry must be deferred or reduced rather than guessed.
- Davis's role or contribution is uncertain for a collaborative project or fork;
  the entry must not claim solo authorship.
- A prospective resume link or social destination is not approved, becomes
  private, or fails a privacy review.
- A content update accidentally introduces a phone number, personal email,
  exact location, family detail, or confidential employer information.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST communicate Davis's name, software-engineering
  identity, Georgia connection, and concise personal thesis in the opening view.
- **FR-002**: The site MUST provide a clear path to About, current-first
  experience, selected work, archive, and footer/personal context.
- **FR-003**: The site MUST preserve the same information hierarchy on desktop,
  tablet, and mobile viewports without requiring a wide layout.
- **FR-004**: The site MUST use semantic headings, landmarks, accessible names,
  visible focus, and a keyboard-accessible skip path for primary navigation.
- **FR-005**: The current Home Depot role MUST be represented as current career
  context at a general, public-safe level without confidential team, project,
  incident, metric, or architecture details.
- **FR-006**: The experience content MUST be current-first and selective rather
  than a verbatim replacement for a full resume.
- **FR-007**: About and personal content MUST support approved Georgia,
  University of Georgia, Atlanta Braves, and other semi-personal details without
  publishing sensitive personal or family information.
- **FR-008**: The content model MUST distinguish current, in-progress, archived,
  download-only, repository-only, historical-link, and browser-verified project
  states.
- **FR-009**: Each project entry MUST support an honest title, category, date or
  date range, summary, role, status, provenance, and independently optional
  destination links.
- **FR-010**: The site MUST be able to represent Support, Flux, Battle of the
  Masses, UPBETOD, and the BBQ App even when an original demo or domain is
  unavailable.
- **FR-011**: The site MUST include known and approved official game-jam links
  when useful; if a destination's current health is uncertain, the site MUST
  label it explicitly as historical or unverified rather than presenting it as
  a live project experience.
- **FR-012**: The site MUST represent Restaurant Tracker and Football Idle Game
  only with approved high-level descriptions and media, without private source
  links or unstable implementation details.
- **FR-013**: The BBQ App entry MUST include approved dates, Davis's role, the
  Atlanta BBQ Club relationship, and contract-safe context without unapproved
  legal, contact, or private business details.
- **FR-014**: The site MUST show `Play in browser` only for the exact build that
  passes a current supported-browser, start-to-finish gameplay check.
- **FR-015**: Download-only, repository-only, historical, archived, and
  browser-verified destinations MUST use labels that describe the actual user
  destination and verification state.
- **FR-016**: Collaborative projects, teammate work, organizer links, contract
  work, and forks MUST include accurate attribution and MUST NOT imply more
  ownership than Davis has approved.
- **FR-017**: The site MUST NOT fabricate current availability, impact metrics,
  live demos, dates, roles, or project health.
- **FR-018**: Missing media, unavailable destinations, stale links, and failed
  builds MUST have a useful text-first or archival fallback.
- **FR-019**: The site MUST respect reduced-motion preferences and remain usable
  without optional animation or third-party media.
- **FR-020**: A pre-release audit MUST cover every external and project link,
  including its destination type, status, source, and verification date.
- **FR-021**: A pre-release privacy and content audit MUST confirm that the
  published page and production build contain no phone number, personal email,
  exact location, sensitive family detail, confidential employer detail, stale
  placeholder, or unapproved claim.
- **FR-022**: The site MUST avoid a blog, contact funnel, forced call-to-action,
  or analytics-heavy personalization unless Davis approves a separate feature.
- **FR-023**: Portfolio content MUST be maintained as explicit structured data so
  a normal status, link, date, or summary update does not require rewriting the
  layout structure.

### Key Entities

- **Profile**: The approved public identity, thesis, location phrasing, career
  context, social links, and semi-personal details shown on the site.
- **Experience Item**: A current-first career entry with organization, role,
  date range, public-safe summary, and approved technology context.
- **Project Entry**: A work item with title, category, date evidence, summary,
  role, status, attribution, visibility notes, and optional media or links.
- **Link Evidence**: A destination record containing link type, source, current
  status, verification date, and any warning or fallback label.
- **Media Asset**: An optional screenshot, image, or other approved visual with
  an owner/rights note, accessible description, and fallback behavior.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In a review with at least five representative visitors, at least
  four can identify Davis, his software-engineering identity, Georgia connection,
  and current professional context within 30 seconds of opening the site.
- **SC-002**: 100% of the five requested archive projects are either represented
  with approved context or listed in a documented deferral record before release.
- **SC-003**: 100% of published project destinations have a typed status and
  verification record, and 0 unverified projects expose a browser-play control.
- **SC-004**: 100% of published WIP entries contain only approved high-level
  copy/media and 0 private repository or private asset URLs.
- **SC-005**: A keyboard-only reviewer can reach 100% of primary sections and
  interactive controls with visible focus, and the page has no horizontal
  scrolling at a 320 CSS-pixel viewport (or a larger minimum explicitly
  approved in the technical brief).
- **SC-006**: With optional images and external destinations unavailable, every
  published project still exposes a title, useful summary, role/status context,
  and an honest fallback label.
- **SC-007**: The final privacy/content audit finds 0 disallowed personal,
  family, employer-confidential, placeholder, or fabricated-claim instances in
  the source content and production build.

## Assumptions

- The primary experience is a single, long-form public page with anchored
  sections; a multi-page archive remains possible if the later technical/visual
  brief shows a clear benefit.
- The existing Create React App source is disposable. A modern web stack will be
  selected for the approved design, deployed on Vercel, and built/checked through
  GitHub Actions.
- The initial device target is broad desktop/laptop browser support plus a
  mobile-friendly experience for current iPhone and Android browsers.
- The visual direction starts dark with Atlanta-red accents; exact tokens and
  framework remain implementation decisions.
- Lightweight analytics are desired, but provider, event scope, and privacy
  configuration remain to be selected.
- Davis will provide or approve the final role label, thesis, WIP descriptions
  and screenshots, BBQ App wording, project roles, and attribution before those
  details are published.
- Public LinkedIn, GitHub, official game-jam, and historical sources can change;
  the site will preserve a verification date and a fallback label rather than
  implying permanence.
- No authentication, visitor-submitted content, persistent user data, blog, or
  contact form is required for this redesign.
- A project without approved media remains eligible for a text-first entry and
  does not block the initial release.
