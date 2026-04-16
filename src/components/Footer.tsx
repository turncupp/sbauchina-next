import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      aria-label="Footer"
      className="relative z-[1] border-t border-white/[0.07] px-10 py-8 flex items-center justify-between flex-wrap gap-4"
    >
      <div className="text-[1rem] font-black tracking-[-0.5px] text-[var(--text)]">
        Sbau<span className="text-[var(--accent)]">china</span>
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
                className="text-[.83rem] text-[var(--muted)] no-underline transition-colors duration-200 hover:text-[var(--text)]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className="text-[.78rem] text-[var(--muted)]">
        © {new Date().getFullYear()} Sbauchina. Tutti i diritti riservati (sia mai).
      </p>
    </footer>
  )
}
