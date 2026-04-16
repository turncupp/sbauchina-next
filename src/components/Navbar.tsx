'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/archivio', label: 'Archivio' },
  { href: '/glossario', label: 'Glossario' },
  { href: '/consigli', label: 'Consigli di Cami' },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <nav
      id="navbar"
      aria-label="Navigazione principale"
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 py-[18px] border-b border-white/[0.07] backdrop-blur-[20px]"
      style={{ background: 'rgba(10,10,11,.8)' }}
    >
      <Link
        href="/"
        className="nav-logo relative text-[1.15rem] font-black tracking-[-0.5px] text-[var(--text)] no-underline"
        data-text="Sbauchina"
        aria-label="Sbauchina — torna in cima"
        style={{ position: 'relative' }}
      >
        Sbau<span className="text-[var(--accent)]">china</span>
        <span aria-hidden className="absolute inset-0 opacity-0" style={{ animation: 'gl1 9s infinite', color: '#e8396e' }}>Sbauchina</span>
        <span aria-hidden className="absolute inset-0 opacity-0" style={{ animation: 'gl2 9s infinite', color: '#4f8ef7' }}>Sbauchina</span>
      </Link>

      <div className="hidden md:flex items-center gap-6">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`text-sm font-medium transition-colors duration-200 ${
              pathname === l.href ? 'text-[var(--accent)]' : 'text-[var(--muted)] hover:text-[var(--text)]'
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <Link
        href="/#iscriviti"
        className="bg-[var(--accent)] text-[#0a0a0b] font-bold text-[.85rem] px-5 py-[9px] rounded-full no-underline tracking-[.02em] transition-all duration-200 hover:shadow-[0_6px_24px_rgba(240,224,64,.3)]"
      >
        Iscriviti
      </Link>
    </nav>
  )
}
