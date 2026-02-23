import { WHATSAPP_MESSAGES, WHATSAPP_NUMBER } from '../config'
import { useTrack } from '../hooks/useTrack'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { WhatsAppIcon } from './Icons'

export default function FloatingWhatsApp() {
  const { trackWhatsApp } = useTrack()

  return (
    <a
      href={buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_MESSAGES.generic)}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-20 right-4 z-[999] inline-flex h-[52px] w-[52px] animate-pulse-soft items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 md:bottom-6 md:right-6 md:h-[60px] md:w-[60px]"
      onClick={() => trackWhatsApp('floating')}
      aria-label="Chat with a tax expert"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="pointer-events-none absolute right-full mr-2 hidden whitespace-nowrap rounded bg-ink px-2 py-1 text-xs text-white group-hover:block">
        Chat with a tax expert
      </span>
    </a>
  )
}
