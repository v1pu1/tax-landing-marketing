import { useState } from 'react'
import { useTrack } from '../hooks/useTrack'

const FAQS = [
  {
    question: 'What documents do I need to provide?',
    answer:
      "We'll guide you through exactly what applies to your situation. The readiness checklist above is a great starting point. Generally: trade licence, MOA, Emirates ID, bank statements (full year), invoices, receipts, major contracts, and fixed asset details. If you use accounting software, we'll need access credentials.",
  },
  {
    question: 'What happens if I miss the CT filing deadline?',
    answer:
      'Late filing can trigger administrative penalties: AED 500 per month for the first 12 months, rising to AED 1,000 per month thereafter. Late payment also incurs 14% per annum on the outstanding amount. We build your timeline early so you are not filing in panic mode.',
  },
  {
    question: 'Can you help reduce my corporate tax liability?',
    answer:
      "We'll review your situation and advise on all legitimate reliefs, deductions, and elections available to you, including Small Business Relief if eligible. We keep you compliant while maximising what's available to you.",
  },
  {
    question: 'How long does the full process take?',
    answer:
      'Once we have all required documents, we typically complete and file within 10 business days. Reach out early, do not wait until the final month before your deadline.',
  },
  {
    question: "What's included in the free advisory session?",
    answer:
      "A 1 hour call with a UAE corporate tax specialist. We'll review your situation, answer your specific questions, and tell you exactly what you need. No sales pitch.",
  },
  {
    question: 'Do you handle EmaraTax registration too?',
    answer:
      "Yes. If you haven't registered as a taxable person yet, we can guide you through the EmaraTax registration process as well.",
  },
]

function slugify(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, '_')
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { trackEvent } = useTrack()

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-[min(1200px,calc(100%-1.5rem))]">
        <h2 className="font-display text-3xl md:text-5xl">Questions you're probably already Googling.</h2>
        <p className="mt-3 text-sm text-muted">Tap any question to expand</p>

        <div className="mt-6 divide-y divide-black/10 rounded-xl border border-black/10 bg-white shadow-card">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <article key={item.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                  onClick={() => {
                    const nextValue = isOpen ? null : index
                    setOpenIndex(nextValue)

                    if (nextValue !== null) {
                      trackEvent('faq_expand', { question: slugify(item.question) })
                    }
                  }}
                >
                  <span className="font-semibold">{item.question}</span>
                  <span className="text-primary">{isOpen ? '−' : '+'}</span>
                </button>

                <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-sm leading-6 text-muted">{item.answer}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
