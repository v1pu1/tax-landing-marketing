import { SVGProps } from 'react'
import { useIntersection } from '../hooks/useIntersection'
import { useTrack } from '../hooks/useTrack'
import { ArrowIcon, CheckIcon, DocumentsIcon, SearchIcon, ShieldCheckIcon, ShieldUserIcon } from './Icons'

const FEATURES = [
  'Timely filing, fully managed',
  'Compliance first checks before submission',
  'Tax advisory included, so you avoid expensive mistakes',
  'Revenue based pricing with clear scope',
  'UAE specialist team focused on accountability',
]

const PIPELINE_STAGES = [
  {
    label: 'Documents',
    detail: 'Checklist and financial records are collected',
    status: 'In progress',
    icon: DocumentsIcon,
  },
  {
    label: 'Review',
    detail: 'Data checks and reconciliations are completed',
    status: 'Queued',
    icon: SearchIcon,
  },
  {
    label: 'Expert check',
    detail: 'Specialist validation confirms compliance',
    status: 'Queued',
    icon: ShieldUserIcon,
  },
  {
    label: 'Filed',
    detail: 'Submission confirmation with next actions',
    status: 'Ready',
    icon: ShieldCheckIcon,
  },
]

export default function SolutionSection() {
  const { ref, isVisible } = useIntersection<HTMLElement>(0.25)
  const { trackConsultation } = useTrack()

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="mx-auto grid w-[min(1200px,calc(100%-1.5rem))] gap-12 md:grid-cols-2 md:items-center">
        <div
          className={`rounded-xl border border-black/10 bg-white p-6 shadow-card md:p-7 ${
            isVisible ? 'animate-fade-up-card' : 'opacity-0'
          }`}
        >
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Filing pipeline</p>
          <ol className="mt-5 space-y-4">
            {PIPELINE_STAGES.map((stage, index) => (
              <PipelineStage
                key={stage.label}
                label={stage.label}
                detail={stage.detail}
                status={stage.status}
                Icon={stage.icon}
                isLast={index === PIPELINE_STAGES.length - 1}
                isActive={isVisible}
                delay={index * 120}
              />
            ))}
          </ol>
        </div>

        <div className={isVisible ? 'animate-fade-up-card [animation-delay:120ms]' : 'opacity-0'}>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">How Finanshels solves this</p>
          <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
            We made corporate tax filing
            <br />
            boring. That is the goal.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Boring means: no surprises, no last minute scrambles, no "did we miss something?" after submission.
          </p>

          <ul className="mt-6 space-y-3">
            {FEATURES.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base">
                <span className="mt-0.5 inline-flex rounded-full bg-primary/10 p-1 text-primary">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="mt-8 inline-flex items-center rounded-card border border-primary px-5 py-3 text-sm font-semibold text-primary"
            onClick={() => {
              trackConsultation('solution')
              document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            <span>Talk to a tax expert</span>
            <ArrowIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

type PipelineStageProps = {
  label: string
  detail: string
  status: string
  Icon: (props?: SVGProps<SVGSVGElement>) => JSX.Element
  isLast: boolean
  isActive: boolean
  delay: number
}

function PipelineStage({ label, detail, status, Icon, isLast, isActive, delay }: PipelineStageProps) {
  return (
    <li className="relative">
      {!isLast && (
        <span
          className={`absolute left-[1.4rem] top-12 h-[calc(100%-2.2rem)] w-px bg-primary/25 ${
            isActive ? 'animate-draw-line' : ''
          }`}
        />
      )}
      <div
        className={`flex items-start gap-3 rounded-card border border-black/10 bg-base p-3 transition-all duration-500 ${
          isActive ? 'shadow-[0_8px_24px_rgba(13,79,60,0.08)]' : ''
        }`}
        style={{ animationDelay: `${delay}ms` }}
      >
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-ink">{label}</p>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">{status}</span>
          </div>
          <p className="mt-1 text-sm text-muted">{detail}</p>
        </div>
      </div>
    </li>
  )
}
