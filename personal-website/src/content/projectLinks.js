/**
 * Shared content helpers for project destinations and their evidence.
 *
 * This module intentionally contains no project URLs. Link records are supplied
 * by the approved content source and are normalized before a card can consume
 * them.
 */

export const DESTINATION_TYPES = Object.freeze({
  OFFICIAL: 'official',
  REPOSITORY: 'repository',
  DOWNLOAD: 'download',
  DEMO: 'demo',
  HISTORICAL: 'historical',
  SOCIAL: 'social',
  VIDEO: 'video',
});

export const DESTINATION_TYPE_VALUES = Object.freeze(
  Object.values(DESTINATION_TYPES),
);

export const LINK_STATUSES = Object.freeze({
  VERIFIED: 'verified',
  REDIRECTED: 'redirected',
  UNAVAILABLE: 'unavailable',
  UNVERIFIED: 'unverified',
  BLOCKED: 'blocked',
});

export const LINK_STATUS_VALUES = Object.freeze(Object.values(LINK_STATUSES));

export const PROJECT_STATUSES = Object.freeze({
  IN_PROGRESS: 'in-progress',
  ARCHIVED: 'archived',
  DOWNLOAD_ONLY: 'download-only',
  REPOSITORY_ONLY: 'repository-only',
  HISTORICAL_LINK: 'historical-link',
  BROWSER_VERIFIED: 'browser-verified',
});

export const PROJECT_STATUS_VALUES = Object.freeze(
  Object.values(PROJECT_STATUSES),
);

export const PLAY_IN_BROWSER_LABEL = 'Play in browser';

const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const ISO_DATE_TIME_PATTERN = /^(\d{4})-(\d{2})-(\d{2})T/;
const SECRET_QUERY_KEY_PATTERN = /(?:^|[_-])(?:access[_-]?token|api[_-]?key|auth|code|key|password|private[_-]?key|secret|session|signature|sig|state|token)(?:$|[_-])/;

const FALLBACK_LABELS = Object.freeze({
  [DESTINATION_TYPES.OFFICIAL]: 'Official destination',
  [DESTINATION_TYPES.REPOSITORY]: 'Repository',
  [DESTINATION_TYPES.DOWNLOAD]: 'Download-only artifact (not browser-playable)',
  [DESTINATION_TYPES.DEMO]: 'Demo destination',
  [DESTINATION_TYPES.HISTORICAL]: 'Historical link (not a live demo)',
  [DESTINATION_TYPES.SOCIAL]: 'Social profile',
  [DESTINATION_TYPES.VIDEO]: 'Video reference (not browser-playable)',
  [LINK_STATUSES.REDIRECTED]: 'Redirected destination',
  [LINK_STATUSES.UNAVAILABLE]: 'Destination unavailable',
  [LINK_STATUSES.UNVERIFIED]: 'Destination not yet verified',
  [LINK_STATUSES.BLOCKED]: 'Destination blocked',
});

/**
 * @typedef {'official'|'repository'|'download'|'demo'|'historical'|'social'|'video'} DestinationType
 * @typedef {'verified'|'redirected'|'unavailable'|'unverified'|'blocked'} LinkStatus
 * @typedef {'in-progress'|'archived'|'download-only'|'repository-only'|'historical-link'|'browser-verified'} ProjectStatus
 * @typedef {Object} Attribution
 * @property {string} text Public-safe credit or provenance text.
 * @property {string} [role] Optional relationship to the project.
 * @property {string[]} [entities] Optional credited people, groups, or organizers.
 * @typedef {Object} LinkEvidence
 * @property {string} [id] Stable content identifier for a published link record.
 * @property {string} url Public destination URL.
 * @property {DestinationType} type Actual destination category.
 * @property {string} label Visitor-facing label for the actual destination.
 * @property {string} source Public or user-approved evidence source.
 * @property {LinkStatus} status Current link-health status.
 * @property {string} checkedAt Verification date in YYYY-MM-DD form.
 * @property {string} [fallbackLabel] Honest label used when the destination is not a live demo.
 */

const toTrimmedString = (value) => {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed || null;
};

const normalizeEnum = (value, allowedValues) => {
  const normalized = toTrimmedString(value)?.toLowerCase();
  return normalized && allowedValues.includes(normalized) ? normalized : null;
};

const isIpv4Address = (hostname) => {
  const octets = hostname.split('.');

  return (
    octets.length === 4 &&
    octets.every((octet) => {
      if (!/^\d+$/.test(octet)) {
        return false;
      }

      const value = Number(octet);
      return value >= 0 && value <= 255;
    })
  );
};

const isPrivateHostname = (hostname) => {
  const normalized = hostname.toLowerCase().replace(/\.$/, '');

  if (
    normalized === 'localhost' ||
    normalized.endsWith('.localhost') ||
    normalized.endsWith('.local') ||
    normalized.endsWith('.internal') ||
    normalized.endsWith('.intranet') ||
    normalized.endsWith('.lan') ||
    normalized.endsWith('.test') ||
    normalized.endsWith('.invalid')
  ) {
    return true;
  }

  const ipv4 = isIpv4Address(normalized);
  if (ipv4) {
    const [first, second] = normalized.split('.').map(Number);

    return (
      first === 0 ||
      first === 10 ||
      first === 127 ||
      (first === 100 && second >= 64 && second <= 127) ||
      (first === 169 && second === 254) ||
      (first === 172 && second >= 16 && second <= 31) ||
      (first === 192 && second === 168)
    );
  }

  const ipv6 = normalized.replace(/^\[|\]$/g, '');
  return (
    ipv6 === '::' ||
    ipv6 === '::1' ||
    ipv6.startsWith('fc') ||
    ipv6.startsWith('fd') ||
    /^fe[89ab]/.test(ipv6)
  );
};

const hasSecretQueryParameter = (parsedUrl) => {
  for (const key of parsedUrl.searchParams.keys()) {
    if (SECRET_QUERY_KEY_PATTERN.test(key.toLowerCase())) {
      return true;
    }
  }

  return false;
};

/**
 * Validate a public URL without making a network request.
 *
 * @param {unknown} value
 * @returns {{valid: boolean, value: string|null, errors: string[]}}
 */
export const validatePublicUrl = (value) => {
  const errors = [];
  const candidate = toTrimmedString(value);

  if (!candidate) {
    return { valid: false, value: null, errors: ['url is required'] };
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(candidate);
  } catch {
    return { valid: false, value: null, errors: ['url must be a valid public URL'] };
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    errors.push('url must use http or https');
  }

  if (!parsedUrl.hostname || isPrivateHostname(parsedUrl.hostname)) {
    errors.push('url must not point to a private or local host');
  }

  if (parsedUrl.username || parsedUrl.password) {
    errors.push('url must not contain credentials');
  }

  if (hasSecretQueryParameter(parsedUrl)) {
    errors.push('url must not contain secret-bearing query parameters');
  }

  return {
    valid: errors.length === 0,
    value: errors.length === 0 ? parsedUrl.toString() : null,
    errors,
  };
};

/**
 * @param {unknown} value
 * @returns {string|null}
 */
export const normalizePublicUrl = (value) => validatePublicUrl(value).value;

/**
 * @param {unknown} value
 * @returns {value is DestinationType}
 */
export const isDestinationType = (value) =>
  normalizeEnum(value, DESTINATION_TYPE_VALUES) !== null;

/**
 * @param {unknown} value
 * @returns {DestinationType|null}
 */
export const normalizeDestinationType = (value) =>
  normalizeEnum(value, DESTINATION_TYPE_VALUES);

/**
 * @param {unknown} value
 * @returns {value is LinkStatus}
 */
export const isLinkStatus = (value) =>
  normalizeEnum(value, LINK_STATUS_VALUES) !== null;

/**
 * @param {unknown} value
 * @returns {LinkStatus|null}
 */
export const normalizeLinkStatus = (value) =>
  normalizeEnum(value, LINK_STATUS_VALUES);

/**
 * @param {unknown} value
 * @returns {value is ProjectStatus}
 */
export const isProjectStatus = (value) =>
  normalizeEnum(value, PROJECT_STATUS_VALUES) !== null;

/**
 * @param {unknown} value
 * @returns {ProjectStatus|null}
 */
export const normalizeProjectStatus = (value) =>
  normalizeEnum(value, PROJECT_STATUS_VALUES);

const parseVerificationDate = (value) => {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      return null;
    }

    return value.toISOString().slice(0, 10);
  }

  const candidate = toTrimmedString(value);
  if (!candidate) {
    return null;
  }

  const dateOnlyMatch = candidate.match(DATE_ONLY_PATTERN);
  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch;
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

    if (
      date.getUTCFullYear() !== Number(year) ||
      date.getUTCMonth() !== Number(month) - 1 ||
      date.getUTCDate() !== Number(day)
    ) {
      return null;
    }

    return candidate;
  }

  if (!ISO_DATE_TIME_PATTERN.test(candidate)) {
    return null;
  }

  const parsedDate = new Date(candidate);
  return Number.isNaN(parsedDate.getTime())
    ? null
    : parsedDate.toISOString().slice(0, 10);
};

const todayAsDateOnly = (referenceDate) => {
  const parsedReference = parseVerificationDate(referenceDate);
  return parsedReference || new Date().toISOString().slice(0, 10);
};

/**
 * Normalize a verification date to a date-only ISO value.
 * Future dates are rejected because they cannot be evidence of a completed
 * link check.
 *
 * @param {unknown} value
 * @param {{allowFuture?: boolean, now?: Date|string}} [options]
 * @returns {string|null}
 */
export const normalizeVerificationDate = (value, options = {}) => {
  const normalized = parseVerificationDate(value);
  if (!normalized) {
    return null;
  }

  const allowFuture = options.allowFuture === true;
  if (!allowFuture && normalized > todayAsDateOnly(options.now)) {
    return null;
  }

  return normalized;
};

/**
 * @param {unknown} value
 * @param {{allowFuture?: boolean, now?: Date|string}} [options]
 * @returns {{valid: boolean, value: string|null, errors: string[]}}
 */
export const validateVerificationDate = (value, options = {}) => {
  const parsed = parseVerificationDate(value);
  if (!parsed) {
    return {
      valid: false,
      value: null,
      errors: ['checkedAt must be a valid date or ISO date-time'],
    };
  }

  const normalized = normalizeVerificationDate(value, options);
  if (!normalized) {
    return {
      valid: false,
      value: parsed,
      errors: ['checkedAt cannot be in the future'],
    };
  }

  return { valid: true, value: normalized, errors: [] };
};

/**
 * @param {unknown} value
 * @param {{allowFuture?: boolean, now?: Date|string}} [options]
 * @returns {boolean}
 */
export const isVerificationDate = (value, options = {}) =>
  validateVerificationDate(value, options).valid;

/**
 * @param {unknown} value
 * @param {{allowFuture?: boolean, now?: Date|string}} [options]
 * @returns {string}
 */
export const createVerificationDate = (value, options = {}) => {
  const result = validateVerificationDate(value, options);
  if (!result.valid) {
    throw new TypeError(result.errors.join('; '));
  }

  return result.value;
};

const normalizeStringList = (value) => {
  if (!Array.isArray(value)) {
    return null;
  }

  const values = [...new Set(value.map(toTrimmedString).filter(Boolean))];
  return values.length > 0 ? values : null;
};

/**
 * Normalize an attribution record. A string is accepted as shorthand for its
 * public display text; object output is stable for later project cards.
 *
 * @param {unknown} value
 * @returns {Attribution|null}
 */
export const normalizeAttribution = (value) => {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === 'string') {
    const text = toTrimmedString(value);
    return text ? { text } : null;
  }

  if (Array.isArray(value)) {
    const entities = normalizeStringList(value);
    return entities ? { text: entities.join(', '), entities } : null;
  }

  if (typeof value !== 'object') {
    return null;
  }

  const text = toTrimmedString(value.text || value.label);
  if (!text) {
    return null;
  }

  const normalized = { text };
  const role = toTrimmedString(value.role);
  const entities = normalizeStringList(value.entities);

  if (role) {
    normalized.role = role;
  }

  if (entities) {
    normalized.entities = entities;
  }

  return normalized;
};

/**
 * @param {unknown} value
 * @param {{required?: boolean}} [options]
 * @returns {{valid: boolean, value: Attribution|null, errors: string[]}}
 */
export const validateAttribution = (value, options = {}) => {
  const normalized = normalizeAttribution(value);
  if (!normalized && options.required === true) {
    return {
      valid: false,
      value: null,
      errors: ['attribution is required for collaborative or provenance-sensitive work'],
    };
  }

  if (value !== null && value !== undefined && !normalized) {
    return {
      valid: false,
      value: null,
      errors: ['attribution must include public display text'],
    };
  }

  return { valid: true, value: normalized, errors: [] };
};

/**
 * @param {unknown} value
 * @param {{required?: boolean}} [options]
 * @returns {Attribution|null}
 */
export const createAttribution = (value, options = {}) => {
  const result = validateAttribution(value, options);
  if (!result.valid) {
    throw new TypeError(result.errors.join('; '));
  }

  return result.value;
};

/**
 * @param {unknown} value
 * @returns {string|null}
 */
export const normalizeFallbackLabel = (value) => toTrimmedString(value);

/**
 * @param {unknown} value
 * @param {{required?: boolean}} [options]
 * @returns {{valid: boolean, value: string|null, errors: string[]}}
 */
export const validateFallbackLabel = (value, options = {}) => {
  const normalized = normalizeFallbackLabel(value);

  if (!normalized && options.required === true) {
    return {
      valid: false,
      value: null,
      errors: ['fallbackLabel is required when a destination is not a verified demo'],
    };
  }

  if (value !== null && value !== undefined && !normalized) {
    return {
      valid: false,
      value: null,
      errors: ['fallbackLabel must be non-empty text'],
    };
  }

  return { valid: true, value: normalized, errors: [] };
};

/**
 * @param {unknown} value
 * @returns {string}
 */
export const createFallbackLabel = (value) => {
  const result = validateFallbackLabel(value, { required: true });
  if (!result.valid) {
    throw new TypeError(result.errors.join('; '));
  }

  return result.value;
};

/**
 * Return a conservative fallback label for a known destination/status pair.
 * This helper does not make a non-demo destination playable.
 *
 * @param {DestinationType|{type?: DestinationType, status?: LinkStatus}} destinationOrType
 * @param {LinkStatus} [status]
 * @returns {string}
 */
export const fallbackLabelFor = (destinationOrType, status) => {
  const type =
    typeof destinationOrType === 'string'
      ? normalizeDestinationType(destinationOrType)
      : normalizeDestinationType(destinationOrType?.type);
  const normalizedStatus = normalizeLinkStatus(
    typeof destinationOrType === 'string'
      ? status
      : destinationOrType?.status,
  );

  if (normalizedStatus && normalizedStatus !== LINK_STATUSES.VERIFIED) {
    return FALLBACK_LABELS[normalizedStatus];
  }

  return FALLBACK_LABELS[type] || 'Destination unavailable';
};

const normalizeSource = (value) => toTrimmedString(value);

/**
 * @param {unknown} value
 * @returns {LinkEvidence|null}
 */
export const normalizeLinkEvidence = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const normalized = {
    url: normalizePublicUrl(value.url),
    type: normalizeDestinationType(value.type),
    label: toTrimmedString(value.label),
    source: normalizeSource(value.source),
    status: normalizeLinkStatus(value.status),
    checkedAt: normalizeVerificationDate(value.checkedAt),
  };
  const id = toTrimmedString(value.id);
  const fallbackLabel = normalizeFallbackLabel(value.fallbackLabel);

  if (id) {
    normalized.id = id;
  }

  if (fallbackLabel) {
    normalized.fallbackLabel = fallbackLabel;
  }

  return normalized;
};

const validateSource = (value) => {
  const source = normalizeSource(value);
  if (!source) {
    return { valid: false, errors: ['source is required'] };
  }

  if (/^[a-z][a-z\d+.-]*:/i.test(source)) {
    const publicUrl = validatePublicUrl(source);
    if (!publicUrl.valid) {
      return { valid: false, errors: ['source must be public evidence'] };
    }
  }

  return { valid: true, errors: [] };
};

/**
 * Validate a complete Link Evidence record without throwing on untrusted input.
 *
 * @param {unknown} value
 * @param {{now?: Date|string}} [options]
 * @returns {{valid: boolean, value: LinkEvidence|null, errors: string[]}}
 */
export const validateLinkEvidence = (value, options = {}) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {
      valid: false,
      value: null,
      errors: ['link evidence must be an object'],
    };
  }

  const url = validatePublicUrl(value.url);
  const id = toTrimmedString(value.id);
  const type = normalizeDestinationType(value.type);
  const label = toTrimmedString(value.label);
  const source = validateSource(value.source);
  const status = normalizeLinkStatus(value.status);
  const checkedAt = validateVerificationDate(value.checkedAt, {
    now: options.now,
  });
  const fallbackLabel = validateFallbackLabel(value.fallbackLabel, {
    required: status !== LINK_STATUSES.VERIFIED || type !== DESTINATION_TYPES.DEMO,
  });
  const normalized = normalizeLinkEvidence(value);
  const errors = [];

  if (!url.valid) {
    errors.push(...url.errors);
  }

  if (value.id !== undefined && !id) {
    errors.push('id must be non-empty text when provided');
  }

  if (!type) {
    errors.push('type must be an approved destination type');
  }

  if (!label) {
    errors.push('label is required');
  }

  if (!source.valid) {
    errors.push(...source.errors);
  }

  if (!status) {
    errors.push('status must be an approved link status');
  }

  if (!checkedAt.valid) {
    errors.push(...checkedAt.errors);
  }

  if (!fallbackLabel.valid) {
    errors.push(...fallbackLabel.errors);
  }

  if (normalized && checkedAt.valid) {
    normalized.checkedAt = checkedAt.value;
  }

  return { valid: errors.length === 0, value: normalized, errors };
};

/**
 * Create an immutable, normalized Link Evidence record. Callers must provide
 * the contract-required fallback label for non-demo or non-verified links.
 *
 * @param {LinkEvidence} value
 * @param {{now?: Date|string}} [options]
 * @returns {Readonly<LinkEvidence>}
 */
export const createLinkEvidence = (value, options = {}) => {
  const result = validateLinkEvidence(value, options);
  if (!result.valid) {
    throw new TypeError(result.errors.join('; '));
  }

  return Object.freeze({ ...result.value });
};

const projectStatusAndLinks = (projectOrStatus, linkOrLinks) => {
  if (typeof projectOrStatus === 'string') {
    return {
      status: normalizeProjectStatus(projectOrStatus),
      links: linkOrLinks === undefined
        ? []
        : Array.isArray(linkOrLinks)
          ? linkOrLinks
          : [linkOrLinks],
    };
  }

  if (!projectOrStatus || typeof projectOrStatus !== 'object') {
    return { status: null, links: [] };
  }

  const links = linkOrLinks === undefined ? projectOrStatus.links : linkOrLinks;
  return {
    status: normalizeProjectStatus(projectOrStatus.status),
    links: Array.isArray(links) ? links : links ? [links] : [],
  };
};

/**
 * A link is playable only when its project is explicitly browser-verified and
 * it has a separately verified demo destination. A repository, download,
 * historical page, redirect, or merely reachable URL can never pass this
 * check.
 *
 * @param {ProjectStatus|{status?: ProjectStatus, links?: LinkEvidence[]}} projectOrStatus
 * @param {LinkEvidence|LinkEvidence[]} [linkOrLinks]
 * @returns {boolean}
 */
export const isBrowserPlayable = (projectOrStatus, linkOrLinks) => {
  const { status, links } = projectStatusAndLinks(projectOrStatus, linkOrLinks);

  if (status !== PROJECT_STATUSES.BROWSER_VERIFIED) {
    return false;
  }

  return links.some((link) => {
    const result = validateLinkEvidence(link);
    const normalized = result.value;

    return (
      result.valid &&
      normalized.type === DESTINATION_TYPES.DEMO &&
      normalized.status === LINK_STATUSES.VERIFIED
    );
  });
};

export const canPlayInBrowser = isBrowserPlayable;
export const isPlayableLink = isBrowserPlayable;

/**
 * Resolve the safe action label a card should render. This is deliberately
 * separate from Link Evidence's stored label so an unverified record cannot
 * accidentally become a Play in browser control.
 *
 * @param {LinkEvidence} link
 * @param {ProjectStatus|{status?: ProjectStatus, links?: LinkEvidence[]}} [project]
 * @returns {{label: string, playable: boolean, url: string|null, fallbackLabel: string|null}}
 */
export const getLinkPresentation = (link, project) => {
  const result = validateLinkEvidence(link);
  const normalized = result.value;

  if (!result.valid || !normalized) {
    return {
      label: 'Destination unavailable',
      playable: false,
      url: null,
      fallbackLabel: 'Destination unavailable',
    };
  }

  const playable = isBrowserPlayable(project, normalized);
  const fallbackLabel =
    normalized.fallbackLabel || fallbackLabelFor(normalized);
  const storedLabelIsPlayControl =
    normalized.label.toLowerCase() === PLAY_IN_BROWSER_LABEL.toLowerCase();

  return {
    label: playable
      ? PLAY_IN_BROWSER_LABEL
      : storedLabelIsPlayControl
        ? fallbackLabel
        : normalized.label,
    playable,
    url: normalized.url,
    fallbackLabel: normalized.fallbackLabel || null,
  };
};

/**
 * @param {LinkEvidence} link
 * @param {ProjectStatus|{status?: ProjectStatus, links?: LinkEvidence[]}} [project]
 * @returns {string}
 */
export const getLinkLabel = (link, project) =>
  getLinkPresentation(link, project).label;

export const getDestinationLabel = getLinkLabel;
