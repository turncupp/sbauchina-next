'use client'
import { useEffect } from 'react'

export default function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scrollProgress')
    if (!bar) return
    const update = () => {
      const pct =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      bar.style.width = pct + '%'
      bar.setAttribute('aria-valuenow', String(Math.round(pct)))
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      id="scrollProgress"
      role="progressbar"
      aria-label="Progresso di lettura"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}
