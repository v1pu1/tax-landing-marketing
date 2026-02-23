import { useState } from 'react'
import { PHONE_DISPLAY, PHONE_NUMBER, WHATSAPP_MESSAGES, WHATSAPP_NUMBER } from '../config'
import { useTrack } from '../hooks/useTrack'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from './Icons'

type TopNavProps = {
  onRequestCallback?: () => void
  hasTopBanner?: boolean
}

export default function TopNav({ onRequestCallback, hasTopBanner = false }: TopNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { trackCall, trackConsultation, trackWhatsApp } = useTrack()
  const whatsappUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_MESSAGES.generic)

  return (
    <header className={`fixed inset-x-0 z-[100] border-b border-black/10 bg-white/80 backdrop-blur-md ${hasTopBanner ? 'top-10' : 'top-0'}`}>
      <div className="mx-auto flex h-16 w-[min(1200px,calc(100%-1.5rem))] items-center justify-between">
        <a href="#" className="font-display text-[1.35rem] italic text-primary" aria-label="Finanshels home">
          Finanshels
        </a>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-black/10 p-2 text-ink md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted"
            onClick={() => trackCall('topnav')}
          >
            <PhoneIcon className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-accent"
            onClick={() => trackWhatsApp('topnav')}
          >
            <WhatsAppIcon className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-black/10 bg-white md:hidden">
          <div className="mx-auto flex w-[min(1200px,calc(100%-1.5rem))] flex-col gap-3 py-4">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center gap-2 rounded-card border border-black/10 px-3 py-2 text-sm font-medium"
              onClick={() => {
                trackCall('topnav_mobile_drawer')
                setIsOpen(false)
              }}
            >
              <PhoneIcon className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-card bg-primary px-3 py-2 text-sm font-semibold text-accent"
              onClick={() => {
                trackWhatsApp('topnav_mobile_drawer')
                setIsOpen(false)
              }}
            >
              <WhatsAppIcon className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            {onRequestCallback && (
              <button
                type="button"
                className="rounded-card border border-primary px-3 py-2 text-left text-sm font-semibold text-primary"
                onClick={() => {
                  trackConsultation('topnav_mobile_drawer')
                  onRequestCallback()
                  setIsOpen(false)
                }}
              >
                Request a callback
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
