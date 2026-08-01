import React from 'react';

const DEFAULT_NAVIGATION_ID = 'mobile-navigation';
const DEFAULT_NAVIGATION_LABEL = 'Mobile navigation';

function classNames(...names) {
  return names.filter(Boolean).join(' ');
}

function isPrimaryActivation(event) {
  if (event.defaultPrevented) {
    return false;
  }

  if (event.button !== undefined && event.button !== 0) {
    return false;
  }

  return !(
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

/**
 * Narrow-screen navigation for the shared site shell.
 *
 * The panel is functionally hidden with the native `hidden` attribute while
 * closed, so its keyboard and accessibility behavior does not depend on CSS.
 * Section link clicks are delegated to the shell before the menu closes so
 * the shell remains responsible for hash navigation and active-section state.
 *
 * @param {object} props
 * @param {Array<object>} [props.navigation] Resolved section navigation items.
 * @param {string|null} [props.activeTargetId] Currently active section ID.
 * @param {string} [props.navigationId] ID controlled by the menu button.
 * @param {string} [props.navigationLabel] Accessible name for the mobile nav.
 * @param {(event: React.MouseEvent, targetId: string) => void} [props.onNavigate]
 *   Shell navigation handler.
 * @param {string} [props.className] Additional class on the mobile nav root.
 */
function MobileNavigation({
  navigation = [],
  activeTargetId = null,
  navigationId = DEFAULT_NAVIGATION_ID,
  navigationLabel = DEFAULT_NAVIGATION_LABEL,
  onNavigate,
  className = '',
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuButtonRef = React.useRef(null);
  const resolvedNavigation = Array.isArray(navigation)
    ? navigation.filter(
        (item) =>
          item &&
          typeof item === 'object' &&
          typeof item.targetId === 'string' &&
          typeof item.label === 'string',
      )
    : [];
  const resolvedNavigationId =
    typeof navigationId === 'string' && navigationId.trim()
      ? navigationId
      : DEFAULT_NAVIGATION_ID;
  const resolvedNavigationLabel =
    typeof navigationLabel === 'string' && navigationLabel.trim()
      ? navigationLabel
      : DEFAULT_NAVIGATION_LABEL;

  const closeMenu = React.useCallback(() => {
    setIsOpen(false);
    menuButtonRef.current?.focus?.();
  }, []);

  React.useEffect(() => {
    if (!isOpen || typeof document === 'undefined') {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      closeMenu();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMenu, isOpen]);

  const handleToggle = () => {
    if (isOpen) {
      closeMenu();
      return;
    }

    setIsOpen(true);
  };

  const handleLinkClick = (event, targetId) => {
    onNavigate?.(event, targetId);

    if (isPrimaryActivation(event)) {
      closeMenu();
    }
  };

  return (
    <div
      className={classNames('site-shell__mobile-navigation', className)}
      data-mobile-navigation="true"
      data-state={isOpen ? 'open' : 'closed'}
    >
      <button
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-controls={resolvedNavigationId}
        aria-expanded={isOpen}
        className="site-shell__mobile-navigation-toggle"
        onClick={handleToggle}
        ref={menuButtonRef}
        type="button"
      >
        Menu
      </button>

      <nav
        aria-label={resolvedNavigationLabel}
        className="site-shell__mobile-navigation-panel"
        hidden={!isOpen}
        id={resolvedNavigationId}
      >
        {resolvedNavigation.length > 0 ? (
          <ul className="site-shell__mobile-navigation-list site-nav site-nav--stacked">
            {resolvedNavigation.map((item) => (
              <li key={item.id ?? item.targetId}>
                <a
                  aria-current={
                    activeTargetId === item.targetId ? 'location' : undefined
                  }
                  className={classNames(
                    'site-nav__link',
                    activeTargetId === item.targetId ? 'is-active' : '',
                  )}
                  href={`#${item.targetId}`}
                  onClick={(event) => handleLinkClick(event, item.targetId)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </nav>
    </div>
  );
}

export default MobileNavigation;
