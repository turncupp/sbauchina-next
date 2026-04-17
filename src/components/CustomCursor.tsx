'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = rootRef.current
    if (!root) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let curX = mouseX
    let curY = mouseY
    let rafId: number

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      root.classList.remove('cursor-hidden')
    }

    const onLeave = () => root.classList.add('cursor-hidden')
    const onEnter = () => root.classList.remove('cursor-hidden')

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element
      const hoverable = target.closest('a, button, [data-hover], input, label, select, textarea')
      root.classList.toggle('cursor-expand', !!hoverable)
    }

    const tick = () => {
      curX = lerp(curX, mouseX, 0.13)
      curY = lerp(curY, mouseY, 0.13)
      root.style.transform = `translate(${curX}px, ${curY}px)`
      rafId = requestAnimationFrame(tick)
    }

    tick()
    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return <div ref={rootRef} className="cursor-root cursor-hidden" aria-hidden />
}
