import type { Metadata } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Glossario',
  description: 'Geopolitica, Economia, AI, Sport — le parole che senti ma non hai mai capito del tutto, spiegate senza paternalismi.',
  alternates: { canonical: 'https://sbauchina.it/glossario' },
}

interface Termine {
  nome: string
  definizione: string
}

interface Categoria {
  categoria: string
  termini: Termine[]
}

const catColor: Record<string, string> = {
  Geopolitica: '#4f8ef7',
  Economia: '#e8396e',
  AI: '#f0e040',
  Sport: '#3dd68c',
}
const catBg: Record<string, string> = {
  Geopolitica: 'rgba(79,142,247,.08)',
  Economia: 'rgba(232,57,110,.08)',
  AI: 'rgba(240,224,64,.08)',
  Sport: 'rgba(61,214,140,.08)',
}

async function getGlossario(): Promise<Categoria[]> {
  const file = path.join(process.cwd(), 'content', 'glossario.json')
  const raw = await fs.readFile(file, 'utf8')
  return JSON.parse(raw)
}

export default async function GlossarioPage() {
  const categorie = await getGlossario()

  return (
    <main className="min-h-screen pt-[100px] pb-20 px-6 relative z-10">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[.72rem] tracking-[.18em] uppercase text-[var(--muted)] font-bold mb-3">
            Glossario
          </p>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-[-3px] leading-[1.05] mb-4">
            Le parole che <span className="text-[var(--accent)]">contano</span>
          </h1>
          <p className="text-[var(--muted)] text-base max-w-[520px] leading-[1.8]">
            Geopolitica, Economia, AI, Sport. Tutte quelle parole che senti in continuazione e hai sempre fatto finta di capire.
            Spiegazioni dirette, senza paternalismi. Senza fare come Wikipedia.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-16">
          {categorie.map((cat) => (
            <section key={cat.categoria} aria-labelledby={`cat-${cat.categoria}`}>
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-8">
                  <h2
                    id={`cat-${cat.categoria}`}
                    className="text-[1.5rem] font-black tracking-[-0.5px]"
                  >
                    {cat.categoria}
                  </h2>
                  <div
                    className="h-[2px] flex-1 rounded-full"
                    style={{ background: catColor[cat.categoria] ?? 'var(--border)', opacity: 0.3 }}
                  />
                  <span
                    className="text-[.7rem] font-bold tracking-[.12em] uppercase px-3 py-1 rounded-full"
                    style={{
                      background: catBg[cat.categoria] ?? 'var(--bg-card)',
                      color: catColor[cat.categoria] ?? 'var(--muted)',
                    }}
                  >
                    {cat.termini.length} termini
                  </span>
                </div>
              </ScrollReveal>

              <div className="flex flex-col gap-4">
                {cat.termini.map((t, ti) => (
                  <ScrollReveal key={t.nome} delay={ti * 0.07}>
                    <article
                      className="rounded-[var(--radius)] p-6 transition-all duration-300 hover:border-[rgba(240,224,64,.1)] relative overflow-hidden"
                      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                    >
                      {/* colored top border */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ background: catColor[cat.categoria] ?? 'var(--border)' }}
                      />
                      <div className="flex items-start gap-5">
                        <div
                          className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[.8rem] font-black mt-0.5"
                          style={{
                            background: catBg[cat.categoria] ?? 'var(--bg-card2)',
                            color: catColor[cat.categoria] ?? 'var(--muted)',
                          }}
                        >
                          {t.nome[0]}
                        </div>
                        <div>
                          <h3 className="text-[1rem] font-bold mb-2 text-[var(--text)]">{t.nome}</h3>
                          <p className="text-[.875rem] text-[var(--muted)] leading-[1.75]">{t.definizione}</p>
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div
            className="mt-20 rounded-[var(--radius)] p-10 text-center"
            style={{ background: 'var(--bg-card)', border: '1px solid rgba(240,224,64,.1)' }}
          >
            <p className="text-[var(--muted)] text-sm mb-2">Manca una parola?</p>
            <p className="text-[var(--text)] font-semibold text-base">
              Mandaci un&apos;email a{' '}
              <a href="mailto:ciao@sbauchina.it" className="text-[var(--accent)] hover:underline">
                ciao@sbauchina.it
              </a>{' '}
              — se ci sembra utile, la aggiungiamo.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  )
}
