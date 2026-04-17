'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function Footer() {
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = logoRef.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('revealed')
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          /* slight delay for polish */
          setTimeout(() => el.classList.add('revealed'), 100)
          obs.unobserve(el)
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <footer
      aria-label="Footer"
      className="relative z-[1] border-t border-white/[0.07] px-10 py-10 flex items-center justify-between flex-wrap gap-6"
    >
      <div ref={logoRef} className="footer-logo" aria-label="Sbauchina">
        Sbau<span style={{ color: 'var(--accent)' }}>china</span>
      </div>

      <nav aria-label="Link footer">
        <ul className="flex gap-6 list-none flex-wrap justify-center">
          {[
            { href: '/archivio', label: 'Archivio' },
            { href: '/glossario', label: 'Glossario' },
            { href: '/consigli', label: 'Consigli di Cami' },
            { href: '/#iscriviti', label: 'Iscriviti' },
            { href: 'mailto:ciao@sbauchina.it', label: 'Contatti' },
          ].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-[.83rem] font-medium text-[var(--muted)] no-underline transition-colors duration-200 hover:text-[var(--text)]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className="text-[.75rem] text-[var(--muted)]">
        © {new Date().getFullYear()} Sbauchina. Tutti i diritti riservati (sia mai).
      </p>
    </footer>
  )
}
