import React from 'react';

const DEFAULT_IDS = {
  shell: 'site-shell',
  header: 'site-header',
  navigation: 'primary-navigation',
  main: 'main-content',
  footer: 'site-footer',
};

const DEFAULT_LABELS = {
  skipLink: 'Skip to main content',
  navigation: 'Primary navigation',
  main: 'Main content',
  rail: 'Supporting content',
  footer: 'Site footer',
};

// These are information-architecture slots named by the feature specification,
// not invented profile or project copy. Passing `sections` replaces them.
const DEFAULT_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'selected-work', label: 'Selected work' },
  { id: 'archive', label: 'Archive' },
  { id: 'personal', label: 'Personal' },
];

/**
 * Convert caller-provided landmark and section IDs into predictable HTML IDs.
 * Keeping this normalization in the shell also means the skip link and its
 * target always use the same value.
 */
function normalizeId(value, fallback) {
  const normalized = String(value ?? '')
    .trim()
    .replace(/^#+/, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

  return normalized || fallback;
}

function reserveId(value, fallback, usedIds) {
  const baseId = normalizeId(value, fallback);
  let id = baseId;
  let suffix = 2;

  while (usedIds.has(id)) {
    id = `${baseId}-${suffix}`;
    suffix += 1;
  }

  usedIds.add(id);
  return id;
}

function asLabel(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const label = value.trim();
  return label || null;
}

function classNames(...names) {
  return names.filter(Boolean).join(' ');
}

function contentForSection(section) {
  if (section.content !== undefined) {
    return section.content;
  }

  return section.children ?? null;
}

function normalizeSections(sections, usedIds) {
  if (!Array.isArray(sections)) {
    return [];
  }

  return sections.reduce((normalizedSections, section, index) => {
    if (!section || typeof section !== 'object') {
      return normalizedSections;
    }

    const id = reserveId(section.id, `section-${index + 1}`, usedIds);
    const label = asLabel(section.label);
    const heading = section.heading ?? label;
    const headingId = reserveId(`${id}-heading`, `${id}-heading`, usedIds);

    normalizedSections.push({
      ...section,
      id,
      label,
      heading,
      headingId,
      content: contentForSection(section),
    });

    return normalizedSections;
  }, []);
}

function navigationTarget(item) {
  if (!item || typeof item !== 'object') {
    return null;
  }

  return item.sectionId ?? item.targetId ?? item.href ?? item.id ?? null;
}

function normalizeNavigation(items, sections) {
  if (!Array.isArray(items)) {
    return [];
  }

  const sectionsById = new Map(sections.map((section) => [section.id, section]));
  const usedTargets = new Set();

  return items.reduce((navigationItems, item, index) => {
    const targetId = normalizeId(navigationTarget(item), '');
    const section = sectionsById.get(targetId);
    const label = asLabel(item?.label) ?? section?.label ?? asLabel(section?.heading);

    // Navigation is intentionally limited to rendered section targets. This
    // prevents empty shells from exposing anchors that lead nowhere.
    if (!section || !label || usedTargets.has(targetId)) {
      return navigationItems;
    }

    usedTargets.add(targetId);
    navigationItems.push({
      id: `navigation-item-${index + 1}`,
      label,
      targetId,
    });

    return navigationItems;
  }, []);
}

/**
 * Shared page frame for the long-form site.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.children] Page content that is already
 *   composed into sections. It is optional so the shell can be mounted while
 *   story components are developed independently.
 * @param {Array<object>} [props.sections] Section descriptors. Each descriptor
 *   should provide an `id` and may provide a navigation `label`, heading, and
 *   `content` (or `children`). When both `sections` and `children` are omitted,
 *   the shell renders named structural slots from the page information
 *   architecture so its default navigation has valid targets.
 * @param {Array<object>} [props.navigation] Optional navigation descriptors.
 *   When omitted, navigation is derived from `sections`; entries without a
 *   rendered section target are ignored.
 * @param {React.ReactNode} [props.brand] Optional identity/header content.
 * @param {React.ReactNode} [props.rail] Optional large-screen supporting rail.
 * @param {React.ReactNode} [props.footerContent] Optional footer content.
 * @param {string} [props.skipLinkLabel] Accessible skip-link text.
 * @param {string} [props.navigationLabel] Accessible name for primary nav.
 * @param {string} [props.mainLabel] Accessible name for the main landmark.
 * @param {string} [props.railLabel] Accessible name for the optional rail.
 * @param {string} [props.footerLabel] Accessible name for the footer landmark.
 * @param {string} [props.className] Additional class on the shell root.
 * @param {string} [props.shellId] ID for the shell root.
 * @param {string} [props.headerId] ID for the header landmark.
 * @param {string} [props.navigationId] ID for the navigation landmark.
 * @param {string} [props.mainId] ID for the main landmark and skip target.
 * @param {string} [props.footerId] ID for the footer landmark.
 */
function SiteShell({
  children = null,
  sections,
  navigation,
  brand = null,
  rail = null,
  footerContent = null,
  skipLinkLabel = DEFAULT_LABELS.skipLink,
  navigationLabel = DEFAULT_LABELS.navigation,
  mainLabel = DEFAULT_LABELS.main,
  railLabel = DEFAULT_LABELS.rail,
  footerLabel = DEFAULT_LABELS.footer,
  className = '',
  shellId = DEFAULT_IDS.shell,
  headerId = DEFAULT_IDS.header,
  navigationId = DEFAULT_IDS.navigation,
  mainId = DEFAULT_IDS.main,
  footerId = DEFAULT_IDS.footer,
}) {
  const resolvedSkipLinkLabel = asLabel(skipLinkLabel) ?? DEFAULT_LABELS.skipLink;
  const resolvedNavigationLabel = asLabel(navigationLabel) ?? DEFAULT_LABELS.navigation;
  const resolvedMainLabel = asLabel(mainLabel) ?? DEFAULT_LABELS.main;
  const resolvedRailLabel = asLabel(railLabel) ?? DEFAULT_LABELS.rail;
  const resolvedFooterLabel = asLabel(footerLabel) ?? DEFAULT_LABELS.footer;
  const usedIds = new Set();
  const resolvedShellId = reserveId(shellId, DEFAULT_IDS.shell, usedIds);
  const resolvedHeaderId = reserveId(headerId, DEFAULT_IDS.header, usedIds);
  const resolvedNavigationId = reserveId(
    navigationId,
    DEFAULT_IDS.navigation,
    usedIds,
  );
  const resolvedMainId = reserveId(mainId, DEFAULT_IDS.main, usedIds);
  const resolvedFooterId = reserveId(footerId, DEFAULT_IDS.footer, usedIds);
  const sectionDescriptors =
    sections === undefined && children == null ? DEFAULT_SECTIONS : sections;
  const resolvedSections = normalizeSections(sectionDescriptors, usedIds);
  const derivedNavigation = resolvedSections.map((section) => ({
    sectionId: section.id,
    label: section.label ?? asLabel(section.heading),
  }));
  const resolvedNavigation = normalizeNavigation(
    navigation === undefined ? derivedNavigation : navigation,
    resolvedSections,
  );

  return (
    <>
      <a
        className="skip-link site-shell__skip-link"
        href={`#${resolvedMainId}`}
      >
        {resolvedSkipLinkLabel}
      </a>

      <div
        className={classNames('site-shell', className)}
        data-site-shell="true"
        id={resolvedShellId}
      >
        <header className="site-shell__header" id={resolvedHeaderId}>
          <div className="site-shell__inner site-shell__header-inner">
            {brand ? <div className="site-shell__brand">{brand}</div> : null}

            <nav
              aria-label={resolvedNavigationLabel}
              className="site-shell__navigation"
              id={resolvedNavigationId}
            >
              {resolvedNavigation.length > 0 ? (
                <ul className="site-shell__navigation-list site-nav">
                  {resolvedNavigation.map((item) => (
                    <li key={item.id}>
                      <a
                        className="site-nav__link"
                        href={`#${item.targetId}`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </nav>
          </div>
        </header>

        <div className="site-shell__inner site-shell__body site-shell__layout">
          {rail ? (
            <aside aria-label={resolvedRailLabel} className="site-shell__rail">
              {rail}
            </aside>
          ) : null}

          <main
            aria-label={resolvedMainLabel}
            className="site-shell__main site-shell__content"
            id={resolvedMainId}
            tabIndex="-1"
          >
            <div className="site-shell__main-inner">
              {resolvedSections.map((section) => {
                const headingId = section.headingId;
                const hasHeading =
                  section.heading !== null &&
                  section.heading !== undefined &&
                  section.heading !== false &&
                  section.heading !== '';

                return (
                  <section
                    aria-label={!hasHeading ? section.label ?? 'Content section' : undefined}
                    aria-labelledby={hasHeading ? headingId : undefined}
                    className={classNames('site-shell__section', 'section', section.className)}
                    id={section.id}
                    key={section.id}
                    tabIndex="-1"
                  >
                    {hasHeading ? <h2 id={headingId}>{section.heading}</h2> : null}
                    {section.content}
                  </section>
                );
              })}

              {children}
            </div>
          </main>
        </div>

        <footer
          aria-label={resolvedFooterLabel}
          className="site-shell__footer"
          id={resolvedFooterId}
        >
          <div className="site-shell__inner site-shell__footer-inner">
            {footerContent}
          </div>
        </footer>
      </div>
    </>
  );
}

export default SiteShell;
