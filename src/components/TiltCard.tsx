'use client'
import { useEffect, useRef } from 'react'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const touch   = window.matchMedia('(hover: none)').matches
    if (reduced || touch) return

    let VanillaTilt: typeof import('vanilla-tilt').default | null = null

    import('vanilla-tilt').then((mod) => {
      VanillaTilt = mod.default
      VanillaTilt.init(el, {
        max: 10,
        speed: 400,
        glare: true,
        'max-glare': 0.12,
        perspective: 900,
        scale: 1.02,
        gyroscope: false,
      })
    })

    return () => {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      const tiltEl = el as any
      if (tiltEl.vanillaTilt) {
        tiltEl.vanillaTilt.destroy()
      }
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
