import React from 'react';
import MobileNavigation from './MobileNavigation';

const DEFAULT_IDS = {
  shell: 'site-shell',
  header: 'site-header',
  navigation: 'primary-navigation',
  mobileNavigation: 'mobile-navigation',
  main: 'main-content',
  footer: 'site-footer',
};

const DEFAULT_LABELS = {
  skipLink: 'Skip to main content',
  navigation: 'Primary navigation',
  mobileNavigation: 'Mobile navigation',
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

function distinctLabel(value, fallback, disallowedLabel) {
  const label = asLabel(value) ?? fallback;

  return label === disallowedLabel ? `${fallback} menu` : label;
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

function hashTargetId(targetIds) {
  if (typeof window === 'undefined') {
    return null;
  }

  let hash = window.location.hash.slice(1);

  try {
    hash = decodeURIComponent(hash);
  } catch {
    return null;
  }

  const targetId = normalizeId(hash, '');
  return targetIds.includes(targetId) ? targetId : null;
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
 * @param {string} [props.mobileNavigationLabel] Accessible name for mobile nav.
 * @param {string} [props.mainLabel] Accessible name for the main landmark.
 * @param {string} [props.railLabel] Accessible name for the optional rail.
 * @param {string} [props.footerLabel] Accessible name for the footer landmark.
 * @param {string} [props.className] Additional class on the shell root.
 * @param {string} [props.shellId] ID for the shell root.
 * @param {string} [props.headerId] ID for the header landmark.
 * @param {string} [props.navigationId] ID for the navigation landmark.
 * @param {string} [props.mobileNavigationId] ID for the mobile navigation.
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
  mobileNavigationLabel = DEFAULT_LABELS.mobileNavigation,
  mainLabel = DEFAULT_LABELS.main,
  railLabel = DEFAULT_LABELS.rail,
  footerLabel = DEFAULT_LABELS.footer,
  className = '',
  shellId = DEFAULT_IDS.shell,
  headerId = DEFAULT_IDS.header,
  navigationId = DEFAULT_IDS.navigation,
  mobileNavigationId = DEFAULT_IDS.mobileNavigation,
  mainId = DEFAULT_IDS.main,
  footerId = DEFAULT_IDS.footer,
}) {
  const resolvedSkipLinkLabel = asLabel(skipLinkLabel) ?? DEFAULT_LABELS.skipLink;
  const resolvedNavigationLabel = asLabel(navigationLabel) ?? DEFAULT_LABELS.navigation;
  const resolvedMobileNavigationLabel = distinctLabel(
    mobileNavigationLabel,
    DEFAULT_LABELS.mobileNavigation,
    resolvedNavigationLabel,
  );
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
  const resolvedMobileNavigationId = reserveId(
    mobileNavigationId,
    DEFAULT_IDS.mobileNavigation,
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
  const navigationTargetIds = resolvedNavigation.map((item) => item.targetId);
  const navigationTargetKey = navigationTargetIds.join('|');
  const [activeTargetId, setActiveTargetId] = React.useState(
    () => hashTargetId(navigationTargetIds) ?? navigationTargetIds[0] ?? null,
  );

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return undefined;
    }

    const targetIds = navigationTargetIds;
    const targetIdSet = new Set(targetIds);
    const updateFromHash = () => {
      setActiveTargetId(hashTargetId(targetIds) ?? targetIds[0] ?? null);
    };

    updateFromHash();
    window.addEventListener('hashchange', updateFromHash);

    const IntersectionObserverConstructor =
      window.IntersectionObserver ??
      (typeof globalThis !== 'undefined'
        ? globalThis.IntersectionObserver
        : undefined);

    if (typeof IntersectionObserverConstructor !== 'function') {
      return () => window.removeEventListener('hashchange', updateFromHash);
    }

    const sectionsToObserve = targetIds
      .map((targetId) => document.getElementById(targetId))
      .filter(Boolean);

    if (sectionsToObserve.length === 0) {
      return () => window.removeEventListener('hashchange', updateFromHash);
    }

    const latestEntries = new Map();
    const observer = new IntersectionObserverConstructor(
      (entries) => {
        entries.forEach((entry) => {
          const targetId = entry.target?.id;

          if (targetIdSet.has(targetId)) {
            latestEntries.set(targetId, entry);
          }
        });

        const visibleEntries = targetIds
          .map((targetId) => latestEntries.get(targetId))
          .filter((entry) => entry?.isIntersecting);

        if (visibleEntries.length === 0) {
          return;
        }

        visibleEntries.sort((entryA, entryB) => {
          const topA = entryA.boundingClientRect?.top ?? Number.POSITIVE_INFINITY;
          const topB = entryB.boundingClientRect?.top ?? Number.POSITIVE_INFINITY;

          if (topA !== topB) {
            return topA - topB;
          }

          return (
            (entryB.intersectionRatio ?? 0) -
            (entryA.intersectionRatio ?? 0)
          );
        });

        setActiveTargetId(visibleEntries[0].target.id);
      },
      { threshold: [0, 0.25, 0.5, 1] },
    );

    sectionsToObserve.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', updateFromHash);
    };
  }, [navigationTargetKey]);

  const handleNavigationClick = (event, targetId) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    setActiveTargetId(targetId);
  };

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
                        aria-current={
                          activeTargetId === item.targetId ? 'location' : undefined
                        }
                        className={classNames(
                          'site-nav__link',
                          activeTargetId === item.targetId ? 'is-active' : '',
                        )}
                        href={`#${item.targetId}`}
                        onClick={(event) =>
                          handleNavigationClick(event, item.targetId)
                        }
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </nav>

            <MobileNavigation
              activeTargetId={activeTargetId}
              navigation={resolvedNavigation}
              navigationId={resolvedMobileNavigationId}
              navigationLabel={resolvedMobileNavigationLabel}
              onNavigate={handleNavigationClick}
            />
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
