'use client'
import { useRef } from 'react'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent) => {
    const card = ref.current
    if (!card) return
    const r = card.getBoundingClientRect()
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2)
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2)
    card.style.transform = `perspective(900px) rotateY(${dx * 7}deg) rotateX(${-dy * 7}deg) translateZ(8px)`
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%')
    card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%')
  }

  const onMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateZ(0)'
  }

  return (
    <div ref={ref} className={className} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      {children}
    </div>
  )
}
