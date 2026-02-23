import { useIntersection } from '../hooks/useIntersection'
import { HandshakeIcon, SearchIcon, ShieldCheckIcon, UploadIcon } from './Icons'

const STEPS = [
  {
    icon: <HandshakeIcon className="h-5 w-5" />,
    title: 'Share your basics',
    body: 'Choose your plan, tell us about your company. Takes 5 minutes.',
  },
  {
    icon: <UploadIcon className="h-5 w-5" />,
    title: 'Send your documents',
    body: "We give you a clear checklist. No hunting through email threads.",
  },
  {
    icon: <SearchIcon className="h-5 w-5" />,
    title: 'We review & prepare',
    body: 'Our experts reconcile, verify, and prepare your return, catching issues before filing.',
  },
  {
    icon: <ShieldCheckIcon className="h-5 w-5" />,
    title: 'Submitted & confirmed',
    body: 'We file with the FTA via EmaraTax and send you a confirmation with a clear next step plan.',
  },
]

export default function HowItWorks() {
  const { ref, isVisible } = useIntersection<HTMLElement>(0.2)

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="mx-auto w-[min(1200px,calc(100%-1.5rem))]">
        <h2 className="mx-auto max-w-4xl text-center font-display text-3xl leading-tight md:text-5xl">
          From where do I start to it is filed, in four steps.
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {STEPS.map((step, index) => (
            <article
              key={step.title}
              className={`relative rounded-xl border border-black/10 bg-white p-4 shadow-card ${
                isVisible ? 'animate-fade-up-card' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="inline-flex rounded-full bg-primary/10 p-2 text-primary">{step.icon}</div>
              <h3 className="mt-3 font-display text-xl">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
              {index < STEPS.length - 1 && (
                <svg
                  className="pointer-events-none absolute -right-3 top-1/2 hidden h-4 w-6 -translate-y-1/2 text-primary/40 md:block"
                  viewBox="0 0 24 8"
                >
                  <path d="M1 4h18m0 0-3-3m3 3-3 3" stroke="currentColor" strokeWidth="1.6" fill="none" />
                </svg>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
