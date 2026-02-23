const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'] as const
const CLICK_ID_KEYS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'ttclid'] as const

type UTMKey = (typeof UTM_KEYS)[number]
type ClickIDKey = (typeof CLICK_ID_KEYS)[number]

type TouchData = Partial<Record<UTMKey, string>> & {
  referrer?: string
  time?: string
}

type AttributionState = {
  first_touch: TouchData
  last_touch: TouchData
  click_ids: Partial<Record<ClickIDKey, string>>
}

const STORAGE_KEY = 'finanshels_attr'
const COOKIE_KEY = 'finanshels_attr'
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000

const EMPTY_ATTRIBUTION: AttributionState = {
  first_touch: {},
  last_touch: {},
  click_ids: {},
}

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

function writeCookie(name: string, value: string): void {
  const expires = new Date(Date.now() + THIRTY_DAYS_MS).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

function readStoredAttribution(): AttributionState {
  const localValue = localStorage.getItem(STORAGE_KEY)
  const cookieValue = readCookie(COOKIE_KEY)
  const source = localValue || cookieValue

  if (!source) {
    return { ...EMPTY_ATTRIBUTION }
  }

  try {
    const parsed = JSON.parse(source) as AttributionState
    return {
      first_touch: parsed.first_touch || {},
      last_touch: parsed.last_touch || {},
      click_ids: parsed.click_ids || {},
    }
  } catch {
    return { ...EMPTY_ATTRIBUTION }
  }
}

function writeStoredAttribution(payload: AttributionState): void {
  const serialized = JSON.stringify(payload)
  localStorage.setItem(STORAGE_KEY, serialized)
  writeCookie(COOKIE_KEY, serialized)
}

function pickQueryParam(params: URLSearchParams, key: string): string | undefined {
  const value = params.get(key)
  if (!value) return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

export function initAttribution(search: string = window.location.search): AttributionState {
  const current = readStoredAttribution()
  const params = new URLSearchParams(search)
  const nowIso = new Date().toISOString()

  const incomingUtms = UTM_KEYS.reduce<Partial<Record<UTMKey, string>>>((acc, key) => {
    const value = pickQueryParam(params, key)
    if (value) acc[key] = value
    return acc
  }, {})

  const incomingClickIds = CLICK_ID_KEYS.reduce<Partial<Record<ClickIDKey, string>>>((acc, key) => {
    const value = pickQueryParam(params, key)
    if (value) acc[key] = value
    return acc
  }, {})

  const hasIncomingUtm = Object.keys(incomingUtms).length > 0
  const hasExistingFirstTouch = Object.keys(current.first_touch).some((key) =>
    UTM_KEYS.includes(key as UTMKey),
  )

  if (!current.first_touch.time) {
    current.first_touch.time = nowIso
  }
  if (!current.first_touch.referrer) {
    current.first_touch.referrer = document.referrer || 'direct'
  }

  if (hasIncomingUtm) {
    current.last_touch = {
      ...current.last_touch,
      ...incomingUtms,
      referrer: document.referrer || 'direct',
      time: nowIso,
    }

    if (!hasExistingFirstTouch) {
      current.first_touch = {
        ...current.first_touch,
        ...incomingUtms,
        referrer: document.referrer || 'direct',
        time: nowIso,
      }
    }
  }

  if (Object.keys(incomingClickIds).length > 0) {
    current.click_ids = {
      ...current.click_ids,
      ...incomingClickIds,
    }
  }

  writeStoredAttribution(current)
  return current
}

export function getAttribution(): AttributionState {
  return readStoredAttribution()
}

export { UTM_KEYS, CLICK_ID_KEYS }
