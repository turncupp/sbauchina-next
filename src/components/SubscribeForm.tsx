'use client'
import { useState } from 'react'

interface SubscribeFormProps {
  id: string
}

export default function SubscribeForm({ id }: SubscribeFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  if (submitted) {
    return (
      <div
        role="alert"
        className="flex items-center justify-center gap-3 rounded-[var(--radius)] px-7 py-[18px] font-semibold text-[var(--accent)] text-base"
        style={{ background: 'rgba(240,224,64,.07)', border: '1px solid rgba(240,224,64,.2)', animation: 'fadeUp .4s ease forwards' }}
      >
        ✅&nbsp;Benvenuto. Ora sei ufficialmente più informato della media.
      </div>
    )
  }

  return (
    <div>
      <form
        id={`${id}-form`}
        onSubmit={handleSubmit}
        className="flex gap-[10px] max-w-[460px] mx-auto"
        aria-label="Iscriviti alla newsletter"
      >
        <label htmlFor={`${id}-email`} className="sr-only">
          Il tuo indirizzo email
        </label>
        <input
          type="email"
          id={`${id}-email`}
          name="email"
          placeholder="la-tua@email.com"
          required
          autoComplete="email"
          className="flex-1 rounded-[var(--radius)] px-5 py-4 text-[var(--text)] text-base font-[var(--font)] outline-none transition-all duration-200"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(240,224,64,.4)'
            e.target.style.boxShadow = '0 0 0 3px rgba(240,224,64,.06)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--border)'
            e.target.style.boxShadow = 'none'
          }}
        />
        <button
          type="submit"
          id={`${id}-btn`}
          disabled={loading}
          className="bg-[var(--accent)] text-[#0a0a0b] border-none rounded-[var(--radius)] px-7 py-4 font-[var(--font)] text-[.95rem] font-bold whitespace-nowrap tracking-[.01em] transition-all duration-200 hover:shadow-[0_8px_32px_rgba(240,224,64,.35)] hover:brightness-105 active:scale-[.98] disabled:opacity-70"
        >
          {loading ? 'Un secondo…' : 'Iscrivimi gratis'}
        </button>
      </form>
      <p className="text-[.77rem] text-[var(--muted)] mt-3 text-center">
        Gratis. Un&apos;email a settimana. Zero spam. Lo promettiamo a noi stessi.
      </p>
    </div>
  )
}
