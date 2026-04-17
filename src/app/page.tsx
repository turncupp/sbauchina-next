import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import ScrollReveal from '@/components/ScrollReveal'
import TiltCard from '@/components/TiltCard'
import SubscribeForm from '@/components/SubscribeForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sbauchina — La newsletter settimanale per under 30',
  description: 'Geopolitica, Musica, AI e Sport. Ogni domenica. Spiegato come se fossi un essere umano.',
  alternates: { canonical: 'https://sbauchina.it' },
}

const stats = [
  { num: '2',   label: "iscritti\n(io e la mia seconda mail)" },
  { num: '52',  label: "domeniche all'anno\nsenza scuse" },
  { num: "5'",  label: "di lettura\n(meno del tuo ultimo reel)" },
  { num: '0',   label: "pipponi moralistici\ngarantito" },
]

const topics = [
  {
    cls: 'card-geo',
    tag: 'Geopolitica',
    headline: 'Tutti parlano di dazi — ma qualcuno sa davvero cosa sono e perché ci riguardano?',
    teaser: 'Trade war, inflazione, supply chain. Spiegato senza gergo da Farnesina. Solo quello che ti serve per non sembrare l\'unico che non capisce.',
  },
  {
    cls: 'card-music',
    tag: 'Musica',
    headline: 'Spotify paga meno di un caffè per mille stream. Siamo sicuri che vada bene così?',
    teaser: 'Non la recensione. La notizia musicale che dice qualcosa sul mondo più grande — l\'industria, i soldi, le dinamiche di potere.',
    delay: 0.08,
  },
  {
    cls: 'card-ai',
    tag: 'AI & Innovazione',
    headline: 'OpenAI ha lanciato l\'ennesima cosa. Questa volta vale davvero la pena saperlo?',
    teaser: 'Filtro anti-hype sempre attivo. Sì, è interessante. No, non cambierà tutto domani. Nella tua vita pratica significa che…',
    delay: 0.16,
  },
  {
    cls: 'card-sport',
    tag: 'Sport',
    headline: 'Il Milan vale 1,2 miliardi. Il tifoso medio paga 40 euro d\'abbonamento. Qualcosa non torna.',
    teaser: 'Calcio, basket, tennis — ma anche i soldi, il potere, le storie umane. Il commento da bar, ma con tutti gli elementi per farlo bene.',
    delay: 0.24,
  },
]

const whyItems = [
  { icon: '⚡', title: '5 minuti, non di più',   desc: 'Scritto per chi ha rispetto del proprio tempo. Il che non vale per tutti, ma tu ci sei.' },
  { icon: '🎯', title: 'Zero prediche',           desc: 'Siamo qui per darti i fatti — con un\'opinione, ché il neutro è noioso. Non per dirti cosa pensare.' },
  { icon: '🔥', title: 'Tono umano',              desc: 'Scriviamo come parliamo. Perché la noia non è una virtù e il Corriere ci ha già provato.' },
  { icon: '🔒', title: 'Un\'email a settimana',   desc: 'Mai di più. Zero notifiche, zero tracking aggressivo, zero drama.' },
]

const marqueeItems = [
  { label: 'Geopolitica',           accent: false },
  { label: '·',                     accent: true  },
  { label: 'Musica',                accent: false },
  { label: '·',                     accent: true  },
  { label: 'AI',                    accent: false },
  { label: '·',                     accent: true  },
  { label: 'Sport',                 accent: false },
  { label: '·',                     accent: true  },
  { label: 'Ogni domenica',         accent: false },
  { label: '·',                     accent: true  },
  { label: 'Sbauchina',             accent: true  },
  { label: '·',                     accent: true  },
]

export default function HomePage() {
  return (
    <main>

      {/* ── HERO ──────────────────────────────── */}
      <HeroSection />

      {/* ── MARQUEE ───────────────────────────── */}
      <div className="marquee-wrap" aria-hidden>
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className={`marquee-item ${item.accent ? 'accent' : 'muted'}`}>
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── EDITION NUMBER ────────────────────── */}
      <section className="edition-section" aria-labelledby="edition-heading">
        <div className="edition-bg-num" aria-hidden>01</div>

        <ScrollReveal>
          <div className="edition-content">
            <span className="edition-label">Ultima edizione</span>
            <span className="edition-num" aria-hidden>N°01</span>
            <h2 id="edition-heading" className="edition-title">
              Il futuro è già qui —<br />ma distribuito in modo diseguale.
            </h2>
            <Link href="/archivio" className="edition-cta" data-hover>
              Sfoglia l&apos;archivio <span aria-hidden>→</span>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── TOPICS ────────────────────────────── */}
      <section
        className="px-10 py-[100px] max-w-[1200px] mx-auto relative z-10"
        id="topics"
        aria-labelledby="topics-heading"
      >
        <p className="text-[.68rem] tracking-[.2em] uppercase text-[var(--muted)] font-[700] mb-[14px]">
          I 4 topic fissi
        </p>
        <h2
          id="topics-heading"
          className="text-[clamp(2rem,4vw,3.2rem)] font-[800] tracking-[-2px] leading-[1.05] mb-14"
        >
          Di cosa parliamo<br />
          <span style={{ color: 'var(--accent)' }}>ogni settimana</span>
        </h2>

        <div className="topics-grid">
          {topics.map((t, i) => (
            <ScrollReveal key={i} delay={t.delay ?? 0}>
              <TiltCard className={`topic-card ${t.cls} h-full`}>
                <header className="flex items-center gap-[10px] mb-5">
                  <span className="topic-tag inline-block text-[.63rem] font-[700] tracking-[.14em] uppercase px-[10px] py-[3px] rounded-full">
                    {t.tag}
                  </span>
                  <span className="text-[.65rem] text-[var(--muted)] font-[600]">ogni domenica</span>
                </header>
                <h3 className="text-[1rem] font-[700] leading-[1.4] tracking-[-0.2px] text-[var(--text)] mb-[14px] flex-1">
                  {t.headline}
                </h3>
                <p className="text-[.82rem] text-[var(--muted)] leading-[1.7]">{t.teaser}</p>
                <div className="card-rule mt-6" aria-hidden />
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── STATS ─────────────────────────────── */}
      <section className="px-10 py-[72px] relative z-10 border-t border-white/[0.07]" aria-label="Sbauchina in numeri">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1000px] mx-auto">
          {stats.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div
                className="text-center px-5 py-9 rounded-[var(--radius)] transition-all duration-300 hover:border-[rgba(240,224,64,.2)] hover:-translate-y-1"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <div
                  className="text-5xl font-[800] tracking-[-2px] leading-none mb-[10px]"
                  style={{ color: 'var(--accent)' }}
                >
                  {s.num}
                </div>
                <div className="text-[.78rem] text-[var(--muted)] font-[600] leading-[1.5] whitespace-pre-line">
                  {s.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── CHI SONO ──────────────────────────── */}
      <section
        className="px-10 py-[100px] border-t border-white/[0.07] relative z-10"
        id="chi-sono"
        aria-labelledby="chi-sono-heading"
      >
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[320px_1fr] gap-[72px] items-start">
          <ScrollReveal>
            <div
              className="founder-photo relative w-full rounded-[var(--radius)]"
              style={{ aspectRatio: '3/4' }}
              aria-hidden
            >
              <div
                className="relative z-10 w-full h-full rounded-[var(--radius)] flex items-center justify-center overflow-hidden"
                style={{ background: 'var(--bg-card2)' }}
              >
                <span
                  className="text-[8rem] font-[800] leading-none select-none"
                  style={{ color: 'var(--accent)', opacity: 0.06, letterSpacing: '-8px' }}
                >
                  LV
                </span>
              </div>
              <p className="absolute bottom-3 left-0 right-0 text-center text-[.66rem] text-[var(--muted)] tracking-[.06em] uppercase z-20">
                ← mettici una foto vera, su
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-[.68rem] tracking-[.2em] uppercase text-[var(--muted)] font-[700] mb-4">
              Chi c&apos;è dietro Sbauchina
            </p>
            <h2
              id="chi-sono-heading"
              className="text-[clamp(2rem,3.5vw,3rem)] font-[800] tracking-[-1.5px] leading-[1.05] mb-6"
            >
              Ciao, sono <span style={{ color: 'var(--accent)' }}>Leonardo</span>.
            </h2>

            <p className="text-[1rem] text-[var(--muted)] leading-[1.8] max-w-[520px] mb-5">
              Ho iniziato Sbauchina per un motivo molto semplice: non riuscivo a trovare una newsletter italiana che valesse davvero la pena aprire.{' '}
              <strong className="text-[var(--text)] font-[700]">Troppo seriose, troppo banali, o peggio: entrambe le cose.</strong>{' '}
              Così invece di lamentarmi ho aperto un editor di testo — e adesso eccoci qui.
            </p>
            <p className="text-[1rem] text-[var(--muted)] leading-[1.8] max-w-[520px] mb-5">
              Scrivo ogni domenica da{' '}
              <em style={{ fontStyle: 'normal', color: 'var(--accent2)', fontWeight: 600 }}>sotto i 30</em>,
              per persone sotto i 30 che vogliono capire il mondo senza sorbirsi un editoriale da 3000 parole.
              Nessuna pretesa di essere The Economist. Solo il punto di vista di qualcuno che legge troppo e ha{' '}
              <strong className="text-[var(--text)] font-[700]">pochissima pazienza per le cose inutili</strong>.
            </p>

            <div className="flex flex-wrap gap-2 mt-7 mb-8">
              {['Italiano', 'Under 30', 'In funzione dal 2024', 'Spedita ogni domenica', 'Nessun MBA', 'Troppo caffè'].map((c, i) => (
                <span
                  key={i}
                  className={`inline-block rounded-full px-[14px] py-[6px] text-[.75rem] font-[600] tracking-[.02em] transition-all duration-200`}
                  style={{
                    background: c === 'Spedita ogni domenica' ? 'rgba(240,224,64,.07)' : 'var(--bg-card)',
                    border: c === 'Spedita ogni domenica' ? '1px solid rgba(240,224,64,.2)' : '1px solid var(--border)',
                    color: c === 'Spedita ogni domenica' ? 'var(--accent)' : 'var(--muted)',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>

            <a
              href="mailto:ciao@sbauchina.it"
              className="inline-flex items-center gap-2 text-[.88rem] font-[600] text-[var(--muted)] no-underline transition-all duration-200 hover:text-[var(--accent)] border-b border-transparent hover:border-[rgba(240,224,64,.3)] pb-[2px]"
              data-hover
            >
              Scrivimi se hai una storia da raccontare →
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ── WHY ───────────────────────────────── */}
      <section
        className="border-t border-b border-white/[0.07] px-10 py-[100px] relative z-10"
        id="perche"
        aria-labelledby="why-heading"
        style={{ background: 'var(--bg-card)' }}
      >
        <div className="max-w-[960px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <p className="text-[.68rem] tracking-[.2em] uppercase text-[var(--muted)] font-[700] mb-[14px]">
              Perché Sbauchina?
            </p>
            <h2
              id="why-heading"
              className="text-[clamp(2rem,4vw,3.2rem)] font-[800] tracking-[-2px] leading-[1.05] mb-6"
            >
              L&apos;informazione<br />
              <span style={{ color: 'var(--accent)' }}>che ti mancava</span>
            </h2>
            <p className="text-[var(--muted)] text-base leading-[1.8] mb-4">
              I giornali sono <strong className="text-[var(--text)] font-[700]">troppo lenti</strong>. I social sono{' '}
              <strong className="text-[var(--text)] font-[700]">troppo rumorosi</strong>. I podcast richiedono un&apos;attenzione che non hai. Sbauchina risolve il problema.
            </p>
            <p className="text-[var(--muted)] text-base leading-[1.8]">
              Una mail la domenica. Quattro argomenti. Tutto quello che ti serve per{' '}
              <strong className="text-[var(--text)] font-[700]">iniziare la settimana già avanti agli altri</strong>.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <ul className="flex flex-col gap-3 list-none why-list">
              {whyItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-[14px] rounded-xl px-5 py-[18px]"
                  style={{ background: 'var(--bg-card2)', border: '1px solid var(--border)' }}
                >
                  <span className="text-[1.3rem] flex-shrink-0 mt-[1px]" aria-hidden>{item.icon}</span>
                  <div>
                    <strong className="block text-[.9rem] font-[700] mb-[2px]">{item.title}</strong>
                    <span className="text-[.82rem] text-[var(--muted)]">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────── */}
      <section
        className="px-6 py-[120px] text-center relative z-10 overflow-hidden"
        id="iscriviti"
        aria-labelledby="cta-heading"
      >
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: '900px', height: '500px',
            background: 'radial-gradient(ellipse, rgba(240,224,64,.06) 0%, transparent 70%)',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        />
        <ScrollReveal>
          <h2
            id="cta-heading"
            className="text-[clamp(2rem,4.5vw,3.8rem)] font-[800] tracking-[-2.5px] leading-[1.05] mb-5"
          >
            Pronto a smettere di fare<br />
            <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>finta</em> di essere informato?
          </h2>
          <p className="text-[var(--muted)] text-base max-w-[480px] mx-auto mb-10">
            Ogni domenica mattina, direttamente in inbox. Gratis, finché dura.
          </p>
          <div className="max-w-[460px] mx-auto">
            <SubscribeForm id="cta" />
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
