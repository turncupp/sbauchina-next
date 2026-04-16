import type { Metadata } from 'next'
import ScrollReveal from '@/components/ScrollReveal'
import TiltCard from '@/components/TiltCard'
import SubscribeForm from '@/components/SubscribeForm'

export const metadata: Metadata = {
  title: 'Sbauchina \u2014 La newsletter settimanale per under 30',
  description: 'Geopolitica, Musica, AI e Sport. Ogni domenica. Spiegato come se fossi un essere umano.',
  alternates: { canonical: 'https://sbauchina.it' },
}

const stats = [
  { num: '2', label: "iscritti\n(io e la mia seconda mail)" },
  { num: '52', label: "domeniche all\u2019anno\nsenza scuse" },
  { num: "5'", label: "di lettura\n(meno del tuo ultimo reel)" },
  { num: '0', label: "pipponi moralistici\ngarantito" },
]

const topics = [
  {
    cls: 'card-geo',
    tag: 'Geopolitica',
    headline: "Tutti parlano di dazi \u2014 ma qualcuno sa davvero cosa sono e perch\u00e9 ci riguardano?",
    teaser: "Trade war, inflazione, supply chain. Spiegato senza gergo da Farnesina. Solo quello che ti serve per non sembrare l\u2019unico che non capisce.",
  },
  {
    cls: 'card-music',
    tag: 'Musica',
    headline: "Spotify paga meno di un caff\u00e8 per mille stream. Siamo sicuri che vada bene cos\u00ec?",
    teaser: "Non la recensione. La notizia musicale che dice qualcosa sul mondo pi\u00f9 grande \u2014 l\u2019industria, i soldi, le dinamiche di potere.",
    delay: 0.08,
  },
  {
    cls: 'card-ai',
    tag: 'AI & Innovazione',
    headline: "OpenAI ha lanciato l\u2019ennesima cosa. Questa volta vale davvero la pena saperlo?",
    teaser: "Filtro anti-hype sempre attivo. S\u00ec, \u00e8 interessante. No, non changer\u00e0 tutto domani. Nella tua vita pratica significa che\u2026",
    delay: 0.16,
  },
  {
    cls: 'card-sport',
    tag: 'Sport',
    headline: "Il Milan vale 1,2 miliardi. Il tifoso medio paga 40 euro d\u2019abbonamento. Qualcosa non torna.",
    teaser: "Calcio, basket, tennis \u2014 ma anche i soldi, il potere, le storie umane. Il commento da bar, ma con tutti gli elementi per farlo bene.",
    delay: 0.24,
  },
]

const whyItems = [
  { icon: '\u26a1', title: '5 minuti, non di pi\u00f9', desc: 'Scritto per chi ha rispetto del proprio tempo. Il che non vale per tutti, ma tu ci sei.' },
  { icon: '\ud83c\udfaf', title: 'Zero prediche', desc: "Siamo qui per darti i fatti \u2014 con un\u2019opinione, ch\u00e9 il neutro \u00e8 noioso. Non per dirti cosa pensare." },
  { icon: '\ud83d\udd25', title: 'Tono umano', desc: "Scriviamo come parliamo. Perch\u00e9 la noia non \u00e8 una virt\u00f9 e il Corriere ci ha gi\u00e0 provato." },
  { icon: '\ud83d\udd12', title: "Un\u2019email a settimana", desc: "Mai di pi\u00f9. Zero notifiche, zero tracking aggressivo, zero drama." },
]

const marqueeItems = [
  'Geopolitica', 'Musica', 'AI & Innovazione', 'Sport',
  'Il TG1 non ha questo swag', 'Ogni domenica', "Gratis, finch\u00e9 dura",
  'Scritto da un umano', 'Non una newsletter meme', 'Sbauchina',
]

export default function HomePage() {
  return (
    <main>
      {/* ── HERO ────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-[120px] pb-20 overflow-hidden"
        id="home"
        aria-labelledby="hero-heading"
      >
        {/* radial glow */}
        <div
          aria-hidden
          className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(240,224,64,.07) 0%, transparent 65%)',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            animation: 'pulse 7s ease-in-out infinite',
          }}
        />

        {/* badge */}
        <div
          className="relative z-10 inline-flex items-center gap-2 rounded-full px-4 py-[6px] text-[.74rem] font-bold tracking-[.12em] uppercase text-[var(--accent)] mb-9"
          style={{
            background: 'rgba(240,224,64,.08)',
            border: '1px solid rgba(240,224,64,.2)',
            animation: 'fadeUp .6s .1s ease forwards',
            opacity: 0,
          }}
          role="note"
        >
          <span className="hero-badge dot" aria-hidden />
          newsletter &middot; settimanale &middot; italiana &middot; under 30
        </div>

        <h1
          id="hero-heading"
          className="relative z-10 text-[clamp(3rem,7.5vw,6rem)] font-black leading-[1.05] tracking-[-3px] mb-6 flex flex-col items-center"
        >
          <span className="clip-line"><span>Il mondo in</span></span>
          <span className="clip-line">
            <span
              style={{
                background: 'linear-gradient(135deg,#f0e040 0%,#ffb740 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              5 minuti
            </span>
          </span>
          <span className="clip-line"><span>ogni domenica.</span></span>
        </h1>

        <p
          className="relative z-10 text-[clamp(.95rem,2.2vw,1.2rem)] text-[var(--muted)] max-w-[520px] mx-auto mb-4"
          style={{ animation: 'fadeUp .7s .75s ease forwards', opacity: 0 }}
        >
          Geopolitica, musica, AI e sport. Scritto da un essere umano,
          per persone che hanno di meglio da fare che aprire il TG1.
        </p>

        <p
          className="relative z-10 text-[clamp(1rem,1.8vw,1.2rem)] font-semibold italic max-w-[500px] mx-auto mb-12"
          style={{ animation: 'fadeUp .7s .9s ease forwards', opacity: 0 }}
        >
          &ldquo;Non sai di cosa parlare al{' '}
          <em style={{ fontStyle: 'normal', color: 'var(--accent2)' }}>primo appuntamento</em>? Leggi Sbauchina.&rdquo;
        </p>

        <div
          className="relative z-10 w-full"
          style={{ animation: 'fadeUp .7s 1.05s ease forwards', opacity: 0 }}
        >
          <SubscribeForm id="hero" />
        </div>

        <div
          className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--muted)] text-[.72rem] tracking-[.12em] uppercase z-10"
          aria-hidden
          style={{ animation: 'fadeUp .8s 1.5s ease forwards', opacity: 0 }}
        >
          <span>Scorri</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────── */}
      <div
        className="marquee-wrap overflow-hidden border-t border-b border-white/[0.07] py-[13px] relative z-10"
        style={{ background: 'rgba(240,224,64,.025)' }}
        aria-hidden
      >
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-[18px] px-[22px] text-[.72rem] font-bold tracking-[.14em] uppercase whitespace-nowrap"
              style={{ color: i % 2 === 1 ? 'var(--accent)' : 'var(--muted)' }}
            >
              {item} <span style={{ color: 'var(--accent)', fontSize: '.9rem' }}>&middot;</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS ───────────────────────────────────── */}
      <section className="px-10 py-[72px] relative z-10" aria-label="Sbauchina in numeri">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1000px] mx-auto">
          {stats.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div
                className="text-center px-5 py-9 rounded-[var(--radius)] transition-all duration-300 hover:border-[rgba(240,224,64,.2)] hover:-translate-y-1"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <div className="text-5xl font-black tracking-[-2px] text-[var(--accent)] leading-none mb-[10px]">
                  {s.num}
                </div>
                <div className="text-[.8rem] text-[var(--muted)] font-medium leading-[1.5] whitespace-pre-line">
                  {s.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── TOPICS ──────────────────────────────────── */}
      <section className="px-10 py-[100px] max-w-[1200px] mx-auto relative z-10" id="topics" aria-labelledby="topics-heading">
        <p className="text-[.72rem] tracking-[.18em] uppercase text-[var(--muted)] font-bold mb-[14px]">I 4 topic fissi</p>
        <h2
          id="topics-heading"
          className="text-[clamp(2rem,4vw,3.2rem)] font-black tracking-[-2px] leading-[1.05] mb-14"
        >
          Di cosa parliamo<br /><span className="text-[var(--accent)]">ogni settimana</span>
        </h2>

        <div className="topics-grid">
          {topics.map((t, i) => (
            <ScrollReveal key={i} delay={t.delay ?? 0}>
              <TiltCard className={`topic-card ${t.cls} h-full`}>
                <header className="flex items-center gap-[10px] mb-5">
                  <span className="topic-tag inline-block text-[.66rem] font-bold tracking-[.14em] uppercase px-[10px] py-[3px] rounded-full">
                    {t.tag}
                  </span>
                  <span className="text-[.68rem] text-[var(--muted)] font-medium">ogni domenica</span>
                </header>
                <h3 className="text-[1.05rem] font-extrabold leading-[1.35] tracking-[-0.25px] text-[var(--text)] mb-[14px] flex-1">
                  {t.headline}
                </h3>
                <p className="text-[.83rem] text-[var(--muted)] leading-[1.65]">{t.teaser}</p>
                <div className="card-rule mt-6" aria-hidden />
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── CHI SONO ────────────────────────────────── */}
      <section
        className="px-10 py-[100px] border-t border-white/[0.07] relative z-10"
        id="chi-sono"
        aria-labelledby="chi-sono-heading"
      >
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[320px_1fr] gap-[72px] items-start">
          {/* Photo */}
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
                  className="text-[8rem] font-black leading-none select-none"
                  style={{ color: 'var(--accent)', opacity: 0.07, letterSpacing: '-8px' }}
                >
                  LV
                </span>
              </div>
              <p
                className="absolute bottom-3 left-0 right-0 text-center text-[.68rem] text-[var(--muted)] tracking-[.06em] uppercase z-20"
              >
                &larr; mettici una foto vera, su
              </p>
            </div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal delay={0.15}>
            <p className="text-[.72rem] tracking-[.18em] uppercase text-[var(--muted)] font-bold mb-4">
              Chi c&apos;è dietro Sbauchina
            </p>
            <h2
              id="chi-sono-heading"
              className="text-[clamp(2rem,3.5vw,3rem)] font-black tracking-[-1.5px] leading-[1.05] mb-6"
            >
              Ciao, sono <span className="text-[var(--accent)]">Leonardo</span>.
            </h2>

            <p className="text-[1rem] text-[var(--muted)] leading-[1.8] max-w-[520px] mb-5">
              Ho iniziato Sbauchina per un motivo molto semplice: non riuscivo a trovare una newsletter italiana che valesse davvero la pena aprire.{' '}
              <strong className="text-[var(--text)] font-semibold">Troppo seriose, troppo banali, o peggio: entrambe le cose.</strong>{' '}
              Cos\u00ec invece di lamentarmi ho aperto un editor di testo &mdash; e adesso eccoci qui.
            </p>
            <p className="text-[1rem] text-[var(--muted)] leading-[1.8] max-w-[520px] mb-5">
              Scrivo ogni domenica da{' '}
              <em style={{ fontStyle: 'normal', color: 'var(--accent2)', fontWeight: 600 }}>sotto i 30</em>,
              per persone sotto i 30 che vogliono capire il mondo senza sorbirsi un editoriale da 3000 parole o una story con 47 slide.
              Nessuna pretesa di essere The Economist. Solo il punto di vista di qualcuno che legge troppo e ha{' '}
              <strong className="text-[var(--text)] font-semibold">pochissima pazienza per le cose inutili</strong>.
            </p>

            <div className="flex flex-wrap gap-2 mt-7 mb-8">
              {['Italiano', 'Under 30', 'In funzione dal 2024', 'Spedita ogni domenica', 'Nessun MBA', 'Troppo caff\u00e8'].map((c, i) => (
                <span
                  key={i}
                  className={`inline-block rounded-full px-[14px] py-[6px] text-[.78rem] font-semibold tracking-[.02em] transition-all duration-200 ${
                    c === 'Spedita ogni domenica'
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                  style={{
                    background: c === 'Spedita ogni domenica' ? 'rgba(240,224,64,.07)' : 'var(--bg-card)',
                    border: c === 'Spedita ogni domenica'
                      ? '1px solid rgba(240,224,64,.2)'
                      : '1px solid var(--border)',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>

            <a
              href="mailto:ciao@sbauchina.it"
              className="inline-flex items-center gap-2 text-[.9rem] font-semibold text-[var(--muted)] no-underline transition-all duration-200 hover:text-[var(--accent)] border-b border-transparent hover:border-[rgba(240,224,64,.3)] pb-[2px]"
            >
              Scrivimi se hai una storia da raccontare
              <span aria-hidden className="inline-block transition-transform duration-200 hover:translate-x-1">&rarr;</span>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ── WHY ─────────────────────────────────────── */}
      <section
        className="border-t border-b border-white/[0.07] px-10 py-[100px] relative z-10"
        id="perche"
        aria-labelledby="why-heading"
        style={{ background: 'var(--bg-card)' }}
      >
        <div className="max-w-[960px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <p className="text-[.72rem] tracking-[.18em] uppercase text-[var(--muted)] font-bold mb-[14px]">
              Perch&eacute; Sbauchina?
            </p>
            <h2
              id="why-heading"
              className="text-[clamp(2rem,4vw,3.2rem)] font-black tracking-[-2px] leading-[1.05] mb-6"
            >
              L&apos;informazione<br /><span className="text-[var(--accent)]">che ti mancava</span>
            </h2>
            <p className="text-[var(--muted)] text-base leading-[1.8] mb-4">
              I giornali sono <strong className="text-[var(--text)] font-semibold">troppo lenti</strong>. I social sono{' '}
              <strong className="text-[var(--text)] font-semibold">troppo rumorosi</strong>. I podcast richiedono un&apos;attenzione che non hai. Sbauchina risolve il problema.
            </p>
            <p className="text-[var(--muted)] text-base leading-[1.8]">
              Una mail la domenica. Quattro argomenti. Tutto quello che ti serve per{' '}
              <strong className="text-[var(--text)] font-semibold">iniziare la settimana gi&agrave; avanti agli altri</strong> &mdash; o almeno per non fare la figura di chi non sa cos&apos;&egrave; successo.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <ul className="flex flex-col gap-3 list-none why-list">
              {whyItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-[14px] rounded-xl px-5 py-[18px] transition-all duration-200"
                  style={{ background: 'var(--bg-card2)', border: '1px solid var(--border)' }}
                >
                  <span className="text-[1.3rem] flex-shrink-0 mt-[1px]" aria-hidden>{item.icon}</span>
                  <div>
                    <strong className="block text-[.92rem] font-bold mb-[2px]">{item.title}</strong>
                    <span className="text-[.83rem] text-[var(--muted)]">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
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
            background: 'radial-gradient(ellipse, rgba(240,224,64,.05) 0%, transparent 70%)',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        />
        <ScrollReveal>
          <h2
            id="cta-heading"
            className="text-[clamp(2rem,4.5vw,3.8rem)] font-black tracking-[-2.5px] leading-[1.05] mb-5"
          >
            Pronto a smettere di<br />fare <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>finta</em> di essere informato?
          </h2>
          <p className="text-[var(--muted)] text-base max-w-[480px] mx-auto mb-10">
            Ogni domenica mattina, direttamente in inbox. Gratis, finch&eacute; dura.
          </p>
          <div className="max-w-[460px] mx-auto">
            <SubscribeForm id="cta" />
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
