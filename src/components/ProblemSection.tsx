import { useIntersection } from '../hooks/useIntersection'
import { BulbIcon, CalendarWarningIcon, DocumentsIcon, ShieldUserIcon } from './Icons'

type ProblemCard = {
  title: string
  body: string
  icon: JSX.Element
}

const PROBLEM_CARDS: ProblemCard[] = [
  {
    icon: <CalendarWarningIcon className="h-5 w-5" />,
    title: "Your deadline is not a date, it is a formula.",
    body:
      "CT returns are due 9 months after your tax period ends. Miss it and penalties can stack: AED 500/month for the first 12 months, then AED 1,000/month after. Let's make it predictable.",
  },
  {
    icon: <DocumentsIcon className="h-5 w-5" />,
    title: "Your documents are scattered, and someone always has it.",
    body:
      "Trade licence, MOA, bank statements, invoices, asset schedules... Filing is easy when your inputs aren't chaos. We'll tell you exactly what we need, in one list.",
  },
  {
    icon: <ShieldUserIcon className="h-5 w-5" />,
    title: "You don't want 'an accountant'. You want accountability.",
    body:
      "Filing is a compliance event with your name on it. You need a team that catches issues early, stands behind the submission, and doesn't disappear after hitting send.",
  },
  {
    icon: <BulbIcon className="h-5 w-5" />,
    title: 'Reliefs, elections, and edge cases are not your hobbies.',
    body:
      "If you're eligible for Small Business Relief or other elections, you want them applied correctly, not missed. We do this every day.",
  },
]

export default function ProblemSection() {
  const { ref, isVisible } = useIntersection<HTMLElement>(0.16)

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="mx-auto w-[min(1200px,calc(100%-1.5rem))]">
        <h2 className="mx-auto max-w-4xl text-center font-display text-3xl leading-tight md:text-5xl">
          If corporate tax filing feels like a trapdoor,
          <br />
          you're not imagining it.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          You are not bad at compliance, the system was not built for founders.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {PROBLEM_CARDS.map((card, index) => (
            <article
              key={card.title}
              className={`group relative rounded-xl border border-black/10 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                isVisible ? 'animate-fade-up-card' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <span className="absolute inset-y-4 left-0 w-1 rounded-r bg-accent transition-all duration-300 group-hover:w-2" />
              <div className="mb-4 inline-flex rounded-full bg-primary/5 p-2 text-primary">{card.icon}</div>
              <h3 className="font-display text-xl leading-tight">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
