import { useState } from 'react'
import { PHONE_NUMBER, WHATSAPP_MESSAGES, WHATSAPP_NUMBER } from '../config'
import { useIntersection } from '../hooks/useIntersection'
import { useTrack } from '../hooks/useTrack'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from './Icons'

const BANDS = ['<3M', '3M-10M', '>10M'] as const

type Band = (typeof BANDS)[number]

type Plan = {
  key: Band
  title: string
  subtitle: string
  features: string[]
}

const PLANS: Plan[] = [
  {
    key: '<3M',
    title: 'Basic',
    subtitle: 'Revenue under AED 3 million',
    features: [
      'Corporate tax return filing',
      'Free tax advisory session (1 hour)',
      'Free Small Business Relief application',
      'Unlimited chat & email support',
      'FTA EmaraTax submission handled',
    ],
  },
  {
    key: '3M-10M',
    title: 'Business',
    subtitle: 'Revenue AED 3 to 10 million',
    features: [
      'Corporate tax return preparation & filing',
      'Free tax advisory session (1 hour)',
      'Unlimited chat & email support',
      'FTA EmaraTax submission handled',
    ],
  },
  {
    key: '>10M',
    title: 'Enterprise',
    subtitle: 'Revenue above AED 10 million',
    features: [
      'Corporate tax return preparation & filing',
      'Free tax advisory session (1 hour)',
      'Unlimited chat & email support',
      'Priority handling & dedicated contact',
    ],
  },
]

export default function PricingPlans() {
  const [activeBand, setActiveBand] = useState<Band>('<3M')
  const { ref, isVisible } = useIntersection<HTMLElement>(0.2)
  const { trackCall, trackEvent, trackWhatsApp } = useTrack()
  const whatsappUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_MESSAGES.generic)

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="mx-auto w-[min(1200px,calc(100%-1.5rem))]">
        <h2 className="font-display text-3xl md:text-5xl">Simple plans, based on how complex your year is.</h2>
        <p className="mt-3 text-lg text-muted">No surprises. No hidden fees. Just a clear scope.</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="w-full overflow-x-auto rounded-full border border-black/10 bg-white p-1 sm:w-auto">
            <div className="inline-flex min-w-max">
              {BANDS.map((band) => (
                <button
                  key={band}
                  type="button"
                  className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] ${
                    activeBand === band ? 'bg-primary text-accent' : 'text-muted'
                  }`}
                  onClick={() => {
                    setActiveBand(band)
                    const planName = band === '<3M' ? 'basic' : band === '3M-10M' ? 'business' : 'enterprise'
                    trackEvent('plan_selected', {
                      plan: planName,
                      revenue_band: band,
                    })
                  }}
                >
                  {band === '<3M' ? 'Under AED 3M' : band === '3M-10M' ? 'AED 3 to 10M' : 'Above AED 10M'}
                </button>
              ))}
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-card border border-primary px-4 py-2 text-sm font-semibold text-primary"
            onClick={() => trackWhatsApp('near_pricing')}
          >
            <WhatsAppIcon className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PLANS.map((plan, index) => {
            const isActive = plan.key === activeBand
            const planName = plan.title.toLowerCase()
            const isEnterprise = plan.key === '>10M'

            return (
              <article
                key={plan.title}
                className={`rounded-xl border bg-white p-5 shadow-card transition-all duration-300 ${
                  isActive
                    ? 'scale-[1.01] border-primary/50 opacity-100'
                    : 'border-black/10 opacity-65 md:opacity-80 md:hover:opacity-100'
                } ${isVisible ? 'animate-fade-up-card' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.key === '<3M' && (
                  <span className="inline-flex rounded-full bg-accent px-2 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-primary">
                    Most popular
                  </span>
                )}
                <h3 className="mt-3 font-display text-2xl">{plan.title}</h3>
                <p className="mt-1 text-sm text-muted">{plan.subtitle}</p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {plan.features.map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>

                {isEnterprise ? (
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="mt-5 inline-flex items-center gap-2 rounded-card border border-primary px-4 py-2 text-sm font-bold text-primary"
                    onClick={() => {
                      trackEvent('plan_selected', {
                        plan: planName,
                        revenue_band: plan.key,
                      })
                      trackCall('pricing', { plan: planName })
                    }}
                  >
                    <PhoneIcon className="h-4 w-4" />
                    <span>Talk to our team</span>
                    <ArrowIcon className="h-4 w-4" />
                  </a>
                ) : (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-card bg-primary px-4 py-2 text-sm font-bold text-accent"
                    onClick={() => {
                      trackEvent('plan_selected', {
                        plan: planName,
                        revenue_band: plan.key,
                      })
                      trackWhatsApp('pricing', { plan: planName })
                    }}
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    <span>WhatsApp to get started</span>
                  </a>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
