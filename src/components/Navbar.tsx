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
      style={{ background: 'rgba(8,8,9,.85)' }}
    >
      <Link
        href="/"
        className="relative text-[1.2rem] font-[800] tracking-[-0.5px] text-[var(--text)] no-underline leading-none"
        aria-label="Sbauchina — torna in cima"
      >
        Sbau<span style={{ color: 'var(--accent)' }}>china</span>
        <span aria-hidden className="nav-logo-ghost  absolute inset-0 opacity-0" style={{ color: '#e8396e' }}>Sbauchina</span>
        <span aria-hidden className="nav-logo-ghost2 absolute inset-0 opacity-0" style={{ color: '#4f8ef7' }}>Sbauchina</span>
      </Link>

      <div className="hidden md:flex items-center gap-7">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`text-[.82rem] font-[600] tracking-[.04em] transition-colors duration-200 ${
              pathname === l.href ? 'text-[var(--accent)]' : 'text-[var(--muted)] hover:text-[var(--text)]'
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <Link
        href="/#iscriviti"
        className="bg-[var(--accent)] text-[#080809] font-[700] text-[.82rem] px-5 py-[9px] rounded-full no-underline tracking-[.04em] transition-all duration-200 hover:shadow-[0_6px_24px_rgba(240,224,64,.35)] hover:brightness-105 active:scale-[.97]"
      >
        Iscriviti
      </Link>
    </nav>
  )
}
