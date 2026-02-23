import { getAnonymousLeadToken } from './track'
import { getAttribution } from './attribution'

export function normalizeWhatsAppNumber(rawNumber: string): string {
  return rawNumber.replace(/[^\d]/g, '')
}

export function buildLeadToken(): string {
  const anonymousId = getAnonymousLeadToken()
  const attribution = getAttribution()

  const snapshot = {
    source: attribution.last_touch.utm_source || attribution.first_touch.utm_source || 'direct',
    medium: attribution.last_touch.utm_medium || attribution.first_touch.utm_medium || 'unknown',
    gclid: attribution.click_ids.gclid,
    fbclid: attribution.click_ids.fbclid,
    ttclid: attribution.click_ids.ttclid,
  }

  const encoded = btoa(JSON.stringify(snapshot)).replace(/=+$/g, '')
  return `${anonymousId}.${encoded.slice(0, 28)}`
}

export function buildWhatsAppUrl(number: string, message: string): string {
  const leadToken = buildLeadToken()
  const fullMessage = `${message}\nLead token: ${leadToken}`
  return `https://wa.me/${normalizeWhatsAppNumber(number)}?text=${encodeURIComponent(fullMessage)}`
}
