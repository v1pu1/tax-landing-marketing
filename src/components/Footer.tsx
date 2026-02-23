import { PHONE_NUMBER, WHATSAPP_MESSAGES, WHATSAPP_NUMBER } from '../config'
import { useTrack } from '../hooks/useTrack'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from './Icons'

type FooterProps = {
  onGetQuote: () => void
}

export default function Footer({ onGetQuote }: FooterProps) {
  const { trackCall, trackConsultation, trackWhatsApp } = useTrack()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary py-14 text-white md:py-20">
      <div className="mx-auto w-[min(1200px,calc(100%-1.5rem))]">
        <p className="font-display text-[1.5rem] italic text-accent">Finanshels</p>

        <h2 className="mt-5 font-display text-4xl leading-tight md:text-6xl">
          Do not let the deadline
          <br />
          find you first.
        </h2>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_MESSAGES.generic)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-card bg-accent px-5 py-3 text-center text-sm font-bold text-primary"
            onClick={() => trackWhatsApp('footer')}
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="inline-flex items-center justify-center gap-2 rounded-card border border-white/40 px-5 py-3 text-center text-sm font-semibold"
            onClick={() => trackCall('footer')}
          >
            <PhoneIcon className="h-4 w-4" />
            <span>Call now</span>
          </a>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-card border border-white/40 px-5 py-3 text-center text-sm font-semibold"
            onClick={() => {
              trackConsultation('footer')
              onGetQuote()
            }}
          >
            <span>Get quote</span>
            <ArrowIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 text-sm text-white/80">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Trustpilot Reviews</a>
          <a href="#">LinkedIn</a>
        </div>

        <p className="mt-10 max-w-4xl text-xs leading-6 text-white/70">
          © {year} Finanshels.com · All rights reserved. Finanshels is not a law firm. Information on this page is
          general guidance only and does not constitute legal or tax advice.
        </p>
      </div>
    </footer>
  )
}
