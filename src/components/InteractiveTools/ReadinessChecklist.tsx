import { useMemo, useState } from 'react'
import { useTrack } from '../../hooks/useTrack'

const ITEMS = [
  'Trade licence',
  'MOA (Memorandum of Association)',
  'Emirates ID / Passport copies',
  'Bank statements (full year)',
  'Invoices & receipts',
  'Revenue streams summary',
  'Major contracts documentation',
  'Fixed asset & depreciation schedule',
  'Accounting software access (if applicable)',
]

const DEFAULT_CHECKED = ['Trade licence', 'Bank statements (full year)']

type ReadinessChecklistProps = {
  onGetExpertReview: () => void
}

function getProgressMessage(checkedCount: number, checkedItems: string[]): string {
  const isDefaultLoaded =
    checkedCount === 2 && DEFAULT_CHECKED.every((item) => checkedItems.includes(item))

  if (checkedCount === 9) return "You're ready to go. Let's get you filed today."
  if (checkedCount >= 6) return 'Almost ready. One conversation and you could be filing this week.'
  if (checkedCount >= 3) return "You're partway there. Let's close the gaps together."
  if (isDefaultLoaded) {
    return 'Good start. Most businesses already have these two. Check off everything else you have ready.'
  }
  return "Good start, check off what you have and we'll handle the rest."
}

export default function ReadinessChecklist({ onGetExpertReview }: ReadinessChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>(DEFAULT_CHECKED)
  const { trackConsultation, trackEvent } = useTrack()

  const { checkedCount, progress, missingItems } = useMemo(() => {
    const checkedCountValue = checkedItems.length
    const progressValue = Math.round((checkedCountValue / ITEMS.length) * 100)
    const missing = ITEMS.filter((item) => !checkedItems.includes(item))

    return {
      checkedCount: checkedCountValue,
      progress: progressValue,
      missingItems: missing,
    }
  }, [checkedItems])

  function toggleItem(item: string) {
    setCheckedItems((current) => {
      const isAlreadyChecked = current.includes(item)
      const next = isAlreadyChecked ? current.filter((entry) => entry !== item) : [...current, item]

      trackEvent('readiness_checklist_interaction', {
        action: isAlreadyChecked ? 'uncheck' : 'check',
        item,
        checked_count: next.length,
      })

      return next
    })
  }

  return (
    <article className="rounded-xl border border-black/10 bg-white p-5 shadow-card">
      <h3 className="font-display text-2xl">How ready are you?</h3>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-primary/12">
        <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${progress}%` }} />
      </div>

      <p className="mt-2 text-sm font-medium text-muted">
        {checkedCount} / 9 items ready ({progress}%)
      </p>

      <p className="mt-2 text-sm text-primary">{getProgressMessage(checkedCount, checkedItems)}</p>

      <div className="mt-4 space-y-2">
        {ITEMS.map((item) => {
          const isChecked = checkedItems.includes(item)

          return (
            <label
              key={item}
              className={`flex cursor-pointer items-start gap-3 rounded-card border px-3 py-2 text-sm transition-all ${
                isChecked ? 'border-primary/40 bg-primary/5' : 'border-black/10 bg-white'
              }`}
            >
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 accent-primary"
                checked={isChecked}
                onChange={() => toggleItem(item)}
              />
              <span>{item}</span>
            </label>
          )
        })}
      </div>

      <button
        type="button"
        className="mt-5 w-full rounded-card bg-primary px-4 py-3 text-sm font-bold text-accent"
        onClick={() => {
          trackConsultation('readiness_checklist')
          trackEvent('readiness_checklist_interaction', {
            checked_count: checkedCount,
            items_missing: missingItems,
          })
          onGetExpertReview()
        }}
      >
        Get an expert to review my readiness
      </button>
    </article>
  )
}
