import { useIntersection } from '../../hooks/useIntersection'
import DeadlineCalculator from './DeadlineCalculator'
import ReadinessChecklist from './ReadinessChecklist'

type InteractiveToolsProps = {
  onGetExpertReview: () => void
}

export default function InteractiveTools({ onGetExpertReview }: InteractiveToolsProps) {
  const { ref, isVisible } = useIntersection<HTMLElement>(0.2)

  return (
    <section id="deadline-check" ref={ref} className="py-16 md:py-24">
      <div className="mx-auto w-[min(1200px,calc(100%-1.5rem))]">
        <h2 className="font-display text-3xl md:text-5xl">Two minute sanity check before you commit.</h2>
        <p className="mt-3 text-lg text-muted">
          Use these to understand where you stand before the deadline finds you.
        </p>

        <div className={`mt-8 grid gap-5 md:grid-cols-2 ${isVisible ? 'animate-fade-up-card' : 'opacity-0'}`}>
          <DeadlineCalculator />
          <ReadinessChecklist onGetExpertReview={onGetExpertReview} />
        </div>
      </div>
    </section>
  )
}
