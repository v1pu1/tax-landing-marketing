import { useCallback, useMemo } from 'react'
import { EventName } from '../types/events'
import { track } from '../utils/track'

export function useTrack() {
  const trackWhatsApp = useCallback(
    (placement: string, properties?: Record<string, unknown>) =>
      track('cta_whatsapp_click', { placement, ...properties }),
    [],
  )

  const trackCall = useCallback(
    (placement: string, properties?: Record<string, unknown>) =>
      track('cta_call_click', { placement, ...properties }),
    [],
  )

  const trackConsultation = useCallback(
    (placement: string, properties?: Record<string, unknown>) =>
      track('cta_book_consultation_click', { placement, ...properties }),
    [],
  )

  const trackEvent = useCallback(
    (eventName: EventName, properties?: Record<string, unknown>) =>
      track(eventName, properties),
    [],
  )

  return useMemo(
    () => ({
      track,
      trackWhatsApp,
      trackCall,
      trackConsultation,
      trackEvent,
    }),
    [trackCall, trackConsultation, trackEvent, trackWhatsApp],
  )
}
