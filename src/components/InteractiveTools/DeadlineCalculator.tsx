import { useMemo, useState } from 'react'
import { WHATSAPP_NUMBER } from '../../config'
import { useTrack } from '../../hooks/useTrack'
import { buildWhatsAppUrl } from '../../utils/whatsapp'
import { WhatsAppIcon } from '../Icons'

function addMonths(date: Date, months: number): Date {
  const result = new Date(date)
  const day = result.getDate()
  result.setMonth(result.getMonth() + months)

  if (result.getDate() < day) {
    result.setDate(0)
  }

  return result
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-AE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function getRemainingDays(date: Date): number {
  const now = new Date()
  const ms = date.getTime() - now.getTime()
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
}

export default function DeadlineCalculator() {
  const [financialYearEnd, setFinancialYearEnd] = useState('')
  const [isCalculated, setIsCalculated] = useState(false)
  const { trackEvent, trackWhatsApp } = useTrack()

  const computed = useMemo(() => {
    if (!financialYearEnd) return null
    const end = new Date(`${financialYearEnd}T00:00:00`)
    if (Number.isNaN(end.getTime())) return null
    const due = addMonths(end, 9)
    return {
      end,
      due,
      dueFormatted: formatDate(due),
      endFormatted: formatDate(end),
      remaining: getRemainingDays(due),
    }
  }, [financialYearEnd])

  const progress = computed ? Math.min(100, Math.max(12, Math.round((computed.remaining / 365) * 100))) : 0
  const message = computed
    ? `Hi, my CT deadline is ${computed.dueFormatted}. I need help filing my corporate tax return.`
    : 'Hi, I need help filing my corporate tax return.'

  return (
    <article id="deadline-calculator" className="rounded-xl border border-black/10 bg-white p-5 shadow-card">
      <h3 className="font-display text-2xl">Deadline Calculator</h3>
      <p className="mt-2 text-sm text-muted">When does your financial year end?</p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="date"
          className="h-12 w-full rounded-card border border-black/15 bg-base px-3 text-sm"
          value={financialYearEnd}
          onChange={(event) => setFinancialYearEnd(event.target.value)}
        />
        <button
          type="button"
          className="h-12 rounded-card bg-accent px-5 text-sm font-bold text-primary"
          onClick={() => {
            if (!computed) return
            setIsCalculated(true)
            trackEvent('deadline_calculator_use', {
              fy_end: financialYearEnd,
              computed_deadline: computed.dueFormatted,
            })
          }}
        >
          Calculate
        </button>
      </div>

      {isCalculated && computed && (
        <div className="mt-5 animate-fade-up-card rounded-xl border border-primary/20 bg-primary/[0.03] p-4">
          <p className="text-sm text-muted">Your CT return is due by:</p>
          <p className="mt-1 font-display text-3xl text-primary">{computed.dueFormatted}</p>
          <p className="mt-2 text-sm text-muted">
            It is 9 months after your tax period ends on {computed.endFormatted}.
          </p>

          <div className="mt-4">
            <div className="h-2 overflow-hidden rounded-full bg-primary/10">
              <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-xs font-medium text-muted">{computed.remaining} days remaining</p>
          </div>

          <a
            href={buildWhatsAppUrl(WHATSAPP_NUMBER, message)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-card bg-primary px-4 py-2 text-sm font-bold text-accent"
            onClick={() =>
              trackWhatsApp('deadline_calculator', {
                context: 'deadline_result',
                computed_deadline: computed.dueFormatted,
              })
            }
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>Send this reminder to WhatsApp</span>
          </a>

          <p className="mt-3 text-xs text-muted">
            This is general guidance only. Confirm your obligations in EmaraTax or with a qualified advisor.
          </p>
        </div>
      )}
    </article>
  )
}
