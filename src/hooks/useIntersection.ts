import { useEffect, useRef, useState } from 'react'

export function useIntersection<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const target = ref.current
    if (!target) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold },
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
