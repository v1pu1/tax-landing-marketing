import { useEffect, useState } from 'react'
import { PHONE_NUMBER, WHATSAPP_MESSAGES, WHATSAPP_NUMBER } from '../config'
import { useTrack } from '../hooks/useTrack'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { CheckIcon, PhoneIcon, WhatsAppIcon } from './Icons'

type HeroProps = {
  onRequestCallback: () => void
}

const trustText = '4.9 Trustpilot (700+ clients) · 6,000+ businesses · Backed by MBRIF, in5 Tech'

export default function Hero({ onRequestCallback }: HeroProps) {
  const { trackCall, trackConsultation, trackWhatsApp } = useTrack()
  const whatsappUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_MESSAGES.generic)
  const [showVisuals, setShowVisuals] = useState(false)

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowVisuals(true), 220)
    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <section className="relative min-h-[90vh] overflow-x-hidden bg-base pt-36 md:pt-40">
      <div className="pointer-events-none absolute right-[-12rem] top-[-4rem] h-[24rem] w-[24rem] rounded-full bg-primary/5 blur-[84px]" />

      <div className="relative mx-auto grid w-[min(1200px,calc(100%-1.5rem))] gap-10 py-12 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-24">
        <div>
          <span className="inline-flex rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            UAE Corporate Tax Return Filing 2024 to 2025
          </span>

          <h1 className="mt-5 font-display text-[2.5rem] leading-[1.05] text-ink md:text-[3.625rem]">
            File your corporate
            <br />
            tax return without
            <br />
            the panic.
          </h1>

          <p className="mt-5 max-w-[32rem] text-[1.125rem] text-muted">
            Expert guided filing with smart checks and a clear path from "we're not ready" to "submitted." Accurate, on
            time, accountable.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white px-3 py-1.5 text-sm font-semibold text-primary">
            <CheckIcon className="h-4 w-4" />
            0 Errors guarantee, or 100% refund.
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="flex max-w-[18rem] flex-col gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-card bg-primary px-6 text-base font-bold text-accent shadow-card"
                onClick={() => trackWhatsApp('hero')}
              >
                <WhatsAppIcon className="h-5 w-5" />
                Chat on WhatsApp
              </a>
              <p className="text-xs text-muted">No spam. Just answers. If we can't help, we'll say so.</p>
            </div>

            <button
              type="button"
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-card border border-primary bg-white px-6 text-base font-semibold text-primary"
              onClick={() => {
                trackConsultation('hero')
                onRequestCallback()
              }}
            >
              <PhoneIcon className="h-5 w-5" />
              Request a callback
            </button>
          </div>

          <p className="mt-6 text-sm font-medium text-muted">{trustText}</p>

          <a
            href={`tel:${PHONE_NUMBER}`}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            onClick={() => trackCall('hero')}
          >
            <PhoneIcon className="h-4 w-4" />
            Need to talk now? Call us.
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-[30rem] pb-2 md:pb-8">
          {showVisuals ? (
            <>
              <article className="animate-fade-up-card relative w-full max-w-[21.5rem] -rotate-1 rounded-card border border-black/10 bg-white p-4 shadow-card [animation-delay:80ms] md:absolute md:left-0 md:top-0 md:w-[74%] md:-rotate-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">Your deadline</p>
                <p className="mt-1 font-mono text-3xl font-bold text-primary">9 months</p>
                <p className="mt-1 text-sm text-muted">from your tax period end date</p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-primary/10">
                  <div className="h-full w-[68%] rounded-full bg-primary transition-all duration-700" />
                </div>
              </article>

              <article className="animate-fade-up-card relative z-10 mt-4 rounded-card border border-black/10 bg-white p-5 shadow-card [animation-delay:180ms] md:mt-14">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">Filing status</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                    ● Submitted ✓
                  </span>
                </div>
                <div className="my-4 border-t border-black/10" />
                <dl className="grid grid-cols-[1fr_auto] gap-y-2 text-sm">
                  <dt className="text-muted">Tax Period</dt>
                  <dd className="font-mono text-ink">FY 2024 to 2025</dd>
                  <dt className="text-muted">Return Due</dt>
                  <dd className="font-mono text-ink">31 December 2025</dd>
                  <dt className="text-muted">Filed by Finanshels</dt>
                  <dd className="font-mono text-primary">✓ 14 October 2025</dd>
                </dl>
                <p className="mt-4 text-xs font-semibold text-primary">0 errors flagged by FTA</p>
              </article>

              <article className="animate-fade-up-card relative z-20 ml-auto mt-4 w-full max-w-[19.5rem] rotate-1 rounded-card border border-black/10 bg-white p-4 shadow-card [animation-delay:260ms] md:absolute md:bottom-[-2.5rem] md:right-0 md:mt-0 md:w-[68%] md:rotate-2">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">Your readiness</p>
                <p className="mt-1 font-mono text-2xl font-bold text-primary">7/9 documents</p>
                <ul className="mt-2 space-y-1 text-xs text-muted">
                  <li>✓ Trade licence</li>
                  <li>✓ MOA copy</li>
                  <li>✓ Bank statements</li>
                </ul>
                <p className="mt-3 text-xs font-semibold text-primary">See what's missing →</p>
              </article>
            </>
          ) : (
            <div
              aria-hidden="true"
              className="h-[240px] w-full rounded-card border border-black/5 bg-white/40 md:h-[360px]"
            />
          )}
        </div>
      </div>
    </section>
  )
}
