'use client'
import { useEffect, useRef } from 'react'
import SubscribeForm from './SubscribeForm'

const titleLines: { words: string[]; accent?: boolean }[] = [
  { words: ['Il', 'mondo', 'in'] },
  { words: ['5 minuti'], accent: true },
  { words: ['ogni', 'domenica.'] },
]

export default function HeroSection() {
  const titleRef    = useRef<HTMLHeadingElement>(null)
  const bgNumRef    = useRef<HTMLDivElement>(null)
  const sectionRef  = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* ── GSAP word reveal ────────────────────── */
    const initGsap = async () => {
      if (reduced) {
        titleRef.current?.querySelectorAll<HTMLElement>('.word')
          .forEach(w => { w.style.transform = 'translateY(0)' })
        return
      }
      try {
        const { gsap } = await import('gsap')
        const words = titleRef.current?.querySelectorAll('.word') ?? []
        if (!words.length) return
        gsap.fromTo(
          words,
          { y: '110%' },
          { y: '0%', stagger: 0.1, duration: 0.9, ease: 'power4.out', delay: 0.35 }
        )
      } catch {
        /* fallback — show words immediately */
        titleRef.current?.querySelectorAll<HTMLElement>('.word')
          .forEach(w => { w.style.transform = 'translateY(0)' })
      }
    }
    initGsap()

    /* ── Parallax on scroll ──────────────────── */
    if (reduced) return

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        /* bg number: fastest (forward) */
        if (bgNumRef.current) {
          bgNumRef.current.style.transform = `translate(-50%, calc(-50% + ${y * 0.45}px))`
        }
        /* title: slowest (counterscroll) */
        if (titleRef.current) {
          titleRef.current.style.transform = `translateY(${y * -0.14}px)`
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} className="hero-section" id="home" aria-labelledby="hero-heading">

      {/* decorative background number — moves fastest */}
      <div ref={bgNumRef} className="hero-bg-num" aria-hidden>01</div>

      {/* radial glow */}
      <div className="hero-glow" aria-hidden />

      {/* badge */}
      <div className="hero-badge-wrap" role="note">
        <span className="hero-badge-dot" aria-hidden />
        newsletter · settimanale · italiana · under 30
      </div>

      {/* title — word-by-word reveal */}
      <h1 ref={titleRef} id="hero-heading" className="hero-title">
        {titleLines.map((line, li) => (
          <span key={li} className="title-line">
            {line.words.map((word, wi) => (
              <span key={wi} className="word-wrap">
                <span className={`word${line.accent ? ' hero-accent' : ''}`}>
                  {word}
                </span>
              </span>
            ))}
          </span>
        ))}
      </h1>

      {/* subtitle — normal scroll speed (no transform) */}
      <p className="hero-sub">
        Geopolitica, musica, AI e sport. Scritto da un essere umano,
        per persone che hanno di meglio da fare che aprire il TG1.
      </p>

      <p className="hero-quote">
        &ldquo;Non sai di cosa parlare al{' '}
        <em style={{ fontStyle: 'normal', color: 'var(--accent2)' }}>primo appuntamento</em>?
        Leggi Sbauchina.&rdquo;
      </p>

      <div className="hero-form">
        <SubscribeForm id="hero" />
      </div>

      <div className="scroll-hint" aria-hidden>
        <span>Scorri</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  )
}
