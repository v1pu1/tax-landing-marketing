import { PHONE_NUMBER, WHATSAPP_MESSAGES, WHATSAPP_NUMBER } from '../config'
import { useTrack } from '../hooks/useTrack'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from './Icons'

type MobileStickyFooterProps = {
  onGetQuote: () => void
}

export default function MobileStickyFooter({ onGetQuote }: MobileStickyFooterProps) {
  const { trackCall, trackConsultation, trackWhatsApp } = useTrack()

  return (
    <div className="fixed inset-x-0 bottom-0 z-[998] grid h-[calc(64px+env(safe-area-inset-bottom))] grid-cols-3 border-t border-black/10 bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
      <a
        href={buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_MESSAGES.generic)}
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center justify-center gap-1 px-1 text-center text-xs font-bold text-primary"
        onClick={() => trackWhatsApp('mobile_sticky_footer')}
      >
        <WhatsAppIcon className="h-4 w-4" />
        <span>WhatsApp</span>
      </a>
      <a
        href={`tel:${PHONE_NUMBER}`}
        className="flex flex-col items-center justify-center gap-1 px-1 text-center text-xs font-bold text-primary"
        onClick={() => trackCall('mobile_sticky_footer')}
      >
        <PhoneIcon className="h-4 w-4" />
        <span>Call</span>
      </a>
      <button
        type="button"
        className="flex flex-col items-center justify-center gap-1 px-1 text-center text-xs font-bold text-primary"
        onClick={() => {
          trackConsultation('mobile_sticky_footer')
          onGetQuote()
        }}
      >
        <ArrowIcon className="h-4 w-4" />
        <span>Get quote</span>
      </button>
    </div>
  )
}
