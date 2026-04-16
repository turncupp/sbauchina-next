import type { Metadata } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Archivio',
  description: 'Tutte le edizioni passate di Sbauchina, in ordine cronologico inverso.',
  alternates: { canonical: 'https://sbauchina.it/archivio' },
}

interface NewsletterMeta {
  slug: string
  numero: number
  titolo: string
  data: string
  descrizione: string
  tag: string[]
}

async function getEdizioni(): Promise<NewsletterMeta[]> {
  const dir = path.join(process.cwd(), 'content', 'newsletter')
  try {
    const files = await fs.readdir(dir)
    const mdxFiles = files.filter((f) => f.endsWith('.mdx'))
    if (mdxFiles.length === 0) return []

    const editions = await Promise.all(
      mdxFiles.map(async (file) => {
        const content = await fs.readFile(path.join(dir, file), 'utf8')
        const match = content.match(/^---\n([\s\S]*?)\n---/)
        if (!match) return null
        const fm: Record<string, string> = {}
        match[1].split('\n').forEach((line) => {
          const [k, ...v] = line.split(':')
          if (k) fm[k.trim()] = v.join(':').trim().replace(/^"|"$/g, '')
        })
        return {
          slug: file.replace('.mdx', ''),
          numero: parseInt(fm.numero ?? '0'),
          titolo: fm.titolo ?? '',
          data: fm.data ?? '',
          descrizione: fm.descrizione ?? '',
          tag: fm.tag
            ? fm.tag.replace(/^\[|\]$/g, '').split(',').map((t) => t.trim().replace(/^"|"$/g, ''))
            : [],
        } as NewsletterMeta
      })
    )

    return editions
      .filter(Boolean)
      .sort((a, b) => b!.numero - a!.numero) as NewsletterMeta[]
  } catch {
    return []
  }
}

const tagColor: Record<string, string> = {
  Geopolitica: 'rgba(79,142,247,.12)',
  Musica: 'rgba(232,57,110,.12)',
  'AI': 'rgba(240,224,64,.12)',
  Sport: 'rgba(61,214,140,.12)',
}
const tagText: Record<string, string> = {
  Geopolitica: '#4f8ef7',
  Musica: '#e8396e',
  'AI': '#d4c830',
  Sport: '#3dd68c',
}

export default async function ArchivioPage() {
  const edizioni = await getEdizioni()

  return (
    <main className="min-h-screen pt-[100px] pb-20 px-6 relative z-10">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[.72rem] tracking-[.18em] uppercase text-[var(--muted)] font-bold mb-3">
            Archivio
          </p>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-[-3px] leading-[1.05] mb-4">
            Tutte le <span className="text-[var(--accent)]">edizioni</span>
          </h1>
          <p className="text-[var(--muted)] text-base max-w-[480px]">
            Ogni domenica, una mail. Qui le trovate tutte — nel caso ve ne foste perse qualcuna o vogliate rileggere.
          </p>
        </div>

        {/* Empty State */}
        {edizioni.length === 0 && (
          <ScrollReveal>
            <div
              className="rounded-[var(--radius)] p-16 text-center"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <div className="text-6xl mb-6">📬</div>
              <h2 className="text-2xl font-black tracking-[-1px] mb-3">
                La prima edizione arriva <span className="text-[var(--accent)]">domenica</span>.
              </h2>
              <p className="text-[var(--muted)] text-base max-w-sm mx-auto leading-[1.8]">
                Sbauchina è appena nata. La prima edizione è in preparazione — iscriviti per riceverla direttamente in inbox.
              </p>
              <a
                href="/#iscriviti"
                className="inline-flex items-center gap-2 mt-8 bg-[var(--accent)] text-[#0a0a0b] font-bold px-6 py-3 rounded-full no-underline text-sm transition-all duration-200 hover:shadow-[0_6px_24px_rgba(240,224,64,.3)]"
              >
                Iscriviti gratis →
              </a>
            </div>
          </ScrollReveal>
        )}

        {/* Editions list */}
        {edizioni.length > 0 && (
          <div className="flex flex-col gap-4">
            {edizioni.map((ed, i) => (
              <ScrollReveal key={ed.slug} delay={i * 0.06}>
                <article
                  className="group relative rounded-[var(--radius)] p-7 transition-all duration-300 hover:border-[rgba(240,224,64,.15)] hover:-translate-y-0.5"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  <div className="flex items-start justify-between gap-6 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span
                          className="text-[.68rem] font-bold tracking-[.1em] uppercase px-[10px] py-[3px] rounded-full"
                          style={{ background: 'rgba(240,224,64,.08)', color: 'var(--accent)', border: '1px solid rgba(240,224,64,.15)' }}
                        >
                          #{ed.numero}
                        </span>
                        <time className="text-[.75rem] text-[var(--muted)] font-medium">{ed.data}</time>
                      </div>
                      <h2 className="text-[1.1rem] font-bold tracking-[-0.3px] mb-2 text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
                        {ed.titolo}
                      </h2>
                      <p className="text-[.85rem] text-[var(--muted)] leading-[1.7] mb-4">{ed.descrizione}</p>
                      <div className="flex flex-wrap gap-2">
                        {ed.tag.map((tag) => (
                          <span
                            key={tag}
                            className="text-[.66rem] font-bold tracking-[.12em] uppercase px-[10px] py-[3px] rounded-full"
                            style={{
                              background: tagColor[tag] ?? 'rgba(255,255,255,.05)',
                              color: tagText[tag] ?? 'var(--muted)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a
                      href={`/archivio/${ed.slug}`}
                      className="shrink-0 inline-flex items-center gap-2 text-[.85rem] font-semibold text-[var(--muted)] no-underline transition-all duration-200 hover:text-[var(--accent)] border-b border-transparent hover:border-[rgba(240,224,64,.3)] pb-[2px] mt-1"
                    >
                      Leggi →
                    </a>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
