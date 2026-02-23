import { EventEnvelope, EventName } from '../types/events'
import { getAttribution } from './attribution'

declare global {
  interface Window {
    dataLayer?: EventEnvelope[]
  }
}

const SESSION_STORAGE_KEY = 'finanshels_session_id'
const ANON_STORAGE_KEY = 'finanshels_anonymous_id'
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || '/api/events'

function createId(prefix: string): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

function getSessionId(): string {
  const existing = sessionStorage.getItem(SESSION_STORAGE_KEY)
  if (existing) return existing

  const created = createId('sess')
  sessionStorage.setItem(SESSION_STORAGE_KEY, created)
  return created
}

function getAnonymousId(): string {
  const existing = localStorage.getItem(ANON_STORAGE_KEY)
  if (existing) return existing

  const created = createId('anon')
  localStorage.setItem(ANON_STORAGE_KEY, created)
  return created
}

export function getAnonymousLeadToken(): string {
  return getAnonymousId()
}

function envelopeWithAttribution(
  eventName: EventName,
  properties?: Record<string, unknown>,
): EventEnvelope {
  const now = new Date()
  const attribution = getAttribution()
  const leadId = typeof properties?.lead_id === 'string' ? properties.lead_id : undefined

  return {
    event_id: createId('evt'),
    event_name: eventName,
    event_time: now.toISOString(),
    event_time_unix: now.getTime(),
    session_id: getSessionId(),
    anonymous_id: getAnonymousId(),
    lead_id: leadId,
    page_url: window.location.href,
    page_path: window.location.pathname,
    referrer: document.referrer || 'direct',
    attribution,
    first_touch_utm_source: attribution.first_touch.utm_source,
    first_touch_utm_medium: attribution.first_touch.utm_medium,
    first_touch_utm_campaign: attribution.first_touch.utm_campaign,
    first_touch_utm_term: attribution.first_touch.utm_term,
    first_touch_utm_content: attribution.first_touch.utm_content,
    first_touch_utm_id: attribution.first_touch.utm_id,
    first_touch_referrer: attribution.first_touch.referrer,
    first_touch_time: attribution.first_touch.time,
    last_touch_utm_source: attribution.last_touch.utm_source,
    last_touch_utm_medium: attribution.last_touch.utm_medium,
    last_touch_utm_campaign: attribution.last_touch.utm_campaign,
    last_touch_utm_term: attribution.last_touch.utm_term,
    last_touch_utm_content: attribution.last_touch.utm_content,
    last_touch_utm_id: attribution.last_touch.utm_id,
    gclid: attribution.click_ids.gclid,
    gbraid: attribution.click_ids.gbraid,
    wbraid: attribution.click_ids.wbraid,
    fbclid: attribution.click_ids.fbclid,
    ttclid: attribution.click_ids.ttclid,
    properties,
  }
}

export function track(eventName: EventName, properties?: Record<string, unknown>): void {
  const payload = envelopeWithAttribution(eventName, properties)

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)

  fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Fire-and-forget tracking by design.
  })

  if (import.meta.env.DEV) {
    console.debug('[track]', payload)
  }
}
