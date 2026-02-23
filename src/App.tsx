import { ReactNode, Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import Hero from './components/Hero'
import MobileStickyFooter from './components/MobileStickyFooter'
import SocialProofStrip from './components/SocialProofStrip'
import TopNav from './components/TopNav'
import UrgencyBanner from './components/UrgencyBanner'
import { useUTM } from './hooks/useUTM'
import { track } from './utils/track'

const ProblemSection = lazy(() => import('./components/ProblemSection'))
const SolutionSection = lazy(() => import('./components/SolutionSection'))
const InteractiveTools = lazy(() => import('./components/InteractiveTools/index'))
const HowItWorks = lazy(() => import('./components/HowItWorks'))
const PricingPlans = lazy(() => import('./components/PricingPlans'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const FAQ = lazy(() => import('./components/FAQ'))
const LeadFormSection = lazy(() => import('./components/LeadFormSection'))
const Footer = lazy(() => import('./components/Footer'))
const ThankYou = lazy(() => import('./components/ThankYou'))

type SectionFallbackProps = {
  minHeight: number
}

function SectionFallback({ minHeight }: SectionFallbackProps) {
  return <div aria-hidden="true" style={{ minHeight }} />
}

type DeferredSectionProps = {
  children: ReactNode
  minHeight: number
  forceRender?: boolean
}

function DeferredSection({ children, minHeight, forceRender = false }: DeferredSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldRender, setShouldRender] = useState(false)
  const supportsIntersectionObserver = typeof window !== 'undefined' && 'IntersectionObserver' in window
  const isRendered = shouldRender || forceRender || !supportsIntersectionObserver

  useEffect(() => {
    if (isRendered || !supportsIntersectionObserver) return

    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin: '420px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [isRendered, supportsIntersectionObserver])

  return <div ref={containerRef}>{isRendered ? children : <SectionFallback minHeight={minHeight} />}</div>
}

function LandingPage() {
  const leadFormRef = useRef<HTMLElement>(null!)
  const [forceLeadFormRender, setForceLeadFormRender] = useState(false)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      track('landing_page_view', { page: 'corporate-tax-filing' })
    }, 150)

    return () => window.clearTimeout(timeout)
  }, [])

  function scrollToLeadForm() {
    setForceLeadFormRender(true)

    let attempts = 0
    const maxAttempts = 20

    const scrollWhenReady = () => {
      if (leadFormRef.current) {
        leadFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      attempts += 1
      if (attempts < maxAttempts) {
        window.setTimeout(scrollWhenReady, 80)
      }
    }

    scrollWhenReady()
  }

  return (
    <div className="bg-base pb-20 text-ink md:pb-0">
      <UrgencyBanner />
      <TopNav hasTopBanner onRequestCallback={scrollToLeadForm} />
      <Hero onRequestCallback={scrollToLeadForm} />
      <SocialProofStrip />
      <DeferredSection minHeight={220}>
        <Suspense fallback={<SectionFallback minHeight={220} />}>
          <ProblemSection />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight={220}>
        <Suspense fallback={<SectionFallback minHeight={220} />}>
          <SolutionSection />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight={220}>
        <Suspense fallback={<SectionFallback minHeight={220} />}>
          <InteractiveTools onGetExpertReview={scrollToLeadForm} />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight={220}>
        <Suspense fallback={<SectionFallback minHeight={220} />}>
          <HowItWorks />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight={220}>
        <Suspense fallback={<SectionFallback minHeight={220} />}>
          <PricingPlans />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight={180}>
        <Suspense fallback={<SectionFallback minHeight={180} />}>
          <Testimonials />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight={180}>
        <Suspense fallback={<SectionFallback minHeight={180} />}>
          <FAQ />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight={240} forceRender={forceLeadFormRender}>
        <Suspense fallback={<SectionFallback minHeight={240} />}>
          <LeadFormSection sectionRef={leadFormRef} />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight={120}>
        <Suspense fallback={<SectionFallback minHeight={120} />}>
          <Footer onGetQuote={scrollToLeadForm} />
        </Suspense>
      </DeferredSection>
      <FloatingWhatsApp />
      <MobileStickyFooter onGetQuote={scrollToLeadForm} />
    </div>
  )
}

function ThankYouPage() {
  return (
    <div className="bg-base text-ink">
      <TopNav />
      <Suspense fallback={<SectionFallback minHeight={640} />}>
        <ThankYou />
      </Suspense>
      <FloatingWhatsApp />
    </div>
  )
}

export default function App() {
  useUTM()

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
