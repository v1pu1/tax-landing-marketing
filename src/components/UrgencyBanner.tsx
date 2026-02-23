import { PHONE_NUMBER } from '../config'
import { useTrack } from '../hooks/useTrack'
import { ArrowIcon, PhoneIcon } from './Icons'

type BannerTone = 'amber' | 'red'

type BannerState = {
  tone: BannerTone
  deadlineLabel: string
  message: string
  callOnly: boolean
}

function getUpcomingCommonDeadline(referenceDate: Date): Date {
  const currentYear = referenceDate.getFullYear()
  const candidate = new Date(`${currentYear}-12-31T23:59:59`)
  return referenceDate.getTime() <= candidate.getTime() ? candidate : new Date(`${currentYear + 1}-12-31T23:59:59`)
}

function formatDeadline(date: Date): string {
  return new Intl.DateTimeFormat('en-AE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function getBannerState(): BannerState {
  const today = new Date()
  const commonDeadline = getUpcomingCommonDeadline(today)
  const rawDays = Math.ceil((commonDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const daysLeft = Math.max(0, rawDays)
  const deadlineLabel = formatDeadline(commonDeadline)

  if (daysLeft < 7) {
    return {
      tone: 'red',
      deadlineLabel,
      message: `${daysLeft} days left to file. Urgent support available.`,
      callOnly: true,
    }
  }

  if (daysLeft < 30) {
    return {
      tone: 'red',
      deadlineLabel,
      message: `Corporate tax due ${deadlineLabel}. ${daysLeft} days left.`,
      callOnly: false,
    }
  }

  if (daysLeft <= 90) {
    return {
      tone: 'amber',
      deadlineLabel,
      message: `Corporate tax due ${deadlineLabel}. ${daysLeft} days left.`,
      callOnly: false,
    }
  }

  return {
    tone: 'amber',
    deadlineLabel,
    message: `Corporate tax due ${deadlineLabel}. ${daysLeft} days left.`,
    callOnly: false,
  }
}

export default function UrgencyBanner() {
  const { trackCall, trackConsultation } = useTrack()
  const state = getBannerState()

  const toneClass =
    state.tone === 'red'
      ? 'border-red-200 bg-red-50 text-red-700'
      : 'border-amber-200 bg-amber-50 text-amber-800'

  return (
    <div className={`fixed inset-x-0 top-0 z-[110] border-b ${toneClass}`}>
      <div className="mx-auto flex h-10 w-[min(1200px,calc(100%-1.5rem))] items-center justify-between gap-3 text-xs sm:text-sm">
        <p className="truncate font-semibold">{state.message}</p>
        <div className="shrink-0">
          {state.callOnly ? (
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold text-white"
              onClick={() => trackCall('urgency_banner')}
            >
              <PhoneIcon className="h-3.5 w-3.5" />
              Call now
            </a>
          ) : (
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-accent"
              onClick={() => {
                trackConsultation('urgency_banner')
                document.getElementById('deadline-calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              <ArrowIcon className="h-3.5 w-3.5" />
              Check deadline
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
