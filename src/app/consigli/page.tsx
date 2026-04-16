import type { Metadata } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Consigli di Cami',
  description: 'Libri, serie, musica e link utili — le cose che Cami consiglia davvero, senza filtri.',
  alternates: { canonical: 'https://sbauchina.it/consigli' },
}

interface Libro {
  titolo: string
  autore: string
  descrizione: string
  link: string
  immagine: string | null
}
interface Serie {
  titolo: string
  piattaforma: string
  descrizione: string
  link: string
  immagine: string | null
}
interface Musica {
  titolo: string
  artista: string
  descrizione: string
  link: string
  immagine: string | null
}
interface LinkItem {
  titolo: string
  descrizione: string
  link: string
  immagine: string | null
}

interface ConsiglioData {
  libri: Libro[]
  serie: Serie[]
  musica: Musica[]
  link: LinkItem[]
}

async function getConsigli(): Promise<ConsiglioData> {
  const file = path.join(process.cwd(), 'content', 'consigli.json')
  const raw = await fs.readFile(file, 'utf8')
  return JSON.parse(raw)
}

const sectionMeta = {
  libri:  { emoji: '📚', label: 'Libri',       color: '#e8396e', bg: 'rgba(232,57,110,.08)' },
  serie:  { emoji: '🎬', label: 'Serie',        color: '#4f8ef7', bg: 'rgba(79,142,247,.08)' },
  musica: { emoji: '🎵', label: 'Musica',       color: '#3dd68c', bg: 'rgba(61,214,140,.08)' },
  link:   { emoji: '🔗', label: 'Link Utili',   color: '#f0e040', bg: 'rgba(240,224,64,.08)' },
}

function Card({
  titolo,
  sottotitolo,
  descrizione,
  href,
  color,
  bg,
  emoji,
}: {
  titolo: string
  sottotitolo: string
  descrizione: string
  href: string
  color: string
  bg: string
  emoji: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-[var(--radius)] p-6 no-underline transition-all duration-300 hover:border-[rgba(255,255,255,.12)] hover:-translate-y-0.5 relative overflow-hidden"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: color }} />
      <div className="flex items-start gap-4">
        <div
          className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl"
          style={{ background: bg }}
        >
          {emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3
              className="text-[1rem] font-bold leading-[1.3] transition-colors duration-200"
              style={{ color: 'var(--text)' }}
            >
              {titolo}
            </h3>
            <span className="shrink-0 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">↗</span>
          </div>
          <p className="text-[.78rem] font-semibold mb-2" style={{ color }}>
            {sottotitolo}
          </p>
          <p className="text-[.85rem] leading-[1.7]" style={{ color: 'var(--muted)' }}>
            {descrizione}
          </p>
        </div>
      </div>
    </a>
  )
}

export default async function ConsigliPage() {
  const data = await getConsigli()

  return (
    <main className="min-h-screen pt-[100px] pb-20 px-6 relative z-10">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[.72rem] tracking-[.18em] uppercase text-[var(--muted)] font-bold mb-3">
            Curated
          </p>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-[-3px] leading-[1.05] mb-4">
            Consigli di <span className="text-[var(--accent)]">Cami</span>
          </h1>
          <p className="text-[var(--muted)] text-base max-w-[520px] leading-[1.8]">
            Libri, serie, musica, link. Le cose che leggo, guardo, ascolto — e che mi sembrano abbastanza buone da consigliarvi senza rimetterci la reputazione.
          </p>
        </div>

        {/* Sections */}
        {(Object.entries(sectionMeta) as [keyof typeof sectionMeta, typeof sectionMeta['libri']][]).map(([key, meta]) => {
          const items = data[key] as (Libro | Serie | Musica | LinkItem)[]
          if (!items?.length) return null
          return (
            <section key={key} className="mb-16" aria-labelledby={`section-${key}`}>
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: meta.bg }}
                  >
                    {meta.emoji}
                  </div>
                  <h2
                    id={`section-${key}`}
                    className="text-[1.5rem] font-black tracking-[-0.5px]"
                  >
                    {meta.label}
                  </h2>
                  <div
                    className="h-[2px] flex-1 rounded-full"
                    style={{ background: meta.color, opacity: 0.25 }}
                  />
                </div>
              </ScrollReveal>

              <div className="flex flex-col gap-4">
                {items.map((item: any, i: number) => (
                  <ScrollReveal key={item.titolo} delay={i * 0.08}>
                    <Card
                      titolo={item.titolo}
                      sottotitolo={item.autore ?? item.piattaforma ?? item.artista ?? item.link}
                      descrizione={item.descrizione}
                      href={item.link}
                      color={meta.color}
                      bg={meta.bg}
                      emoji={meta.emoji}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}
