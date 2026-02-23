import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { PHONE_NUMBER, WHATSAPP_MESSAGES, WHATSAPP_NUMBER } from '../config'
import { useTrack } from '../hooks/useTrack'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { PhoneIcon, WhatsAppIcon } from './Icons'

const NEXT_STEPS = [
  'We review your submission and prepare questions',
  'Quick call to confirm scope and documents needed',
  'We get started, you get back to building',
]

export default function ThankYou() {
  const { search } = useLocation()
  const { trackCall, trackEvent, trackWhatsApp } = useTrack()
  const leadId = new URLSearchParams(search).get('lead_id')

  useEffect(() => {
    trackEvent('thank_you_view', leadId ? { lead_id: leadId } : undefined)
  }, [leadId, trackEvent])

  return (
    <main className="min-h-screen bg-base pt-28 pb-20">
      <div className="mx-auto w-[min(900px,calc(100%-1.5rem))]">
        <div className="rounded-xl border border-black/10 bg-white p-6 shadow-card md:p-10">
          <svg viewBox="0 0 120 120" className="h-20 w-20 text-primary" aria-hidden="true">
            <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="6" fill="none" className="opacity-25" />
            <path
              d="M34 62 52 80 88 42"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="check-draw"
            />
          </svg>

          <h1 className="mt-4 font-display text-5xl leading-none md:text-6xl">You're in.</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Our corporate tax team will reach out within 1 business day. Want this faster?
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {NEXT_STEPS.map((step, index) => (
              <article key={step} className="rounded-card border border-black/10 bg-base p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">Step {index + 1}</p>
                <p className="mt-2 text-sm text-ink">{step}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
            href={buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_MESSAGES.generic)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-card bg-primary px-4 py-2 text-sm font-bold text-accent"
            onClick={() => trackWhatsApp('thank_you_route')}
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>WhatsApp us now, skip the queue</span>
          </a>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="inline-flex items-center gap-2 rounded-card border border-primary px-4 py-2 text-sm font-semibold text-primary"
            onClick={() => trackCall('thank_you_route')}
          >
            <PhoneIcon className="h-4 w-4" />
            <span>Call us directly</span>
          </a>
          <a
            href={buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_MESSAGES.checklist)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-card border border-black/10 px-4 py-2 text-sm font-semibold"
            onClick={() => trackWhatsApp('thank_you_route_checklist')}
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>Get the document checklist on WhatsApp</span>
          </a>
          </div>

          <p className="mt-6 text-sm font-semibold text-muted">4.9★ Trustpilot · 6,000+ businesses served</p>
        </div>
      </div>
    </main>
  )
}
