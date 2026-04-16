'use client'
import { useState, useRef } from 'react'

interface SubscribeFormProps {
  id: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function SubscribeForm({ id }: SubscribeFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = inputRef.current?.value.trim() ?? ''

    if (!email) {
      setStatus('error')
      setErrorMsg('Inserisci la tua email prima di iscriverti.')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json() as { success?: boolean; error?: string }

      if (res.ok && data.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(data.error ?? 'Qualcosa è andato storto. Riprova.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Impossibile connettersi. Controlla la connessione e riprova.')
    }
  }

  // ── Success state ────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="flex items-center justify-center gap-3 rounded-[var(--radius)] px-7 py-[18px] font-semibold text-[var(--accent)] text-base"
        style={{
          background: 'rgba(240,224,64,.07)',
          border: '1px solid rgba(240,224,64,.2)',
          animation: 'fadeUp .4s ease forwards',
        }}
      >
        ✅&nbsp;Sei dentro. Ora sei ufficialmente più informato della media.
      </div>
    )
  }

  // ── Form ─────────────────────────────────────────────────────────────────
  return (
    <div>
      <form
        id={`${id}-form`}
        onSubmit={handleSubmit}
        className="flex gap-[10px] max-w-[460px] mx-auto"
        aria-label="Iscriviti alla newsletter"
        noValidate
      >
        <label htmlFor={`${id}-email`} className="sr-only">
          Il tuo indirizzo email
        </label>
        <input
          ref={inputRef}
          type="email"
          id={`${id}-email`}
          name="email"
          placeholder="la-tua@email.com"
          required
          autoComplete="email"
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? `${id}-error` : undefined}
          disabled={status === 'loading'}
          className="flex-1 rounded-[var(--radius)] px-5 py-4 text-[var(--text)] text-base font-[var(--font)] outline-none transition-all duration-200 disabled:opacity-60"
          style={{
            background: 'var(--bg-card)',
            border: `1px solid ${status === 'error' ? 'rgba(232,57,110,.5)' : 'var(--border)'}`,
          }}
          onFocus={(e) => {
            if (status !== 'error') {
              e.target.style.borderColor = 'rgba(240,224,64,.4)'
              e.target.style.boxShadow = '0 0 0 3px rgba(240,224,64,.06)'
            }
          }}
          onBlur={(e) => {
            e.target.style.borderColor = status === 'error' ? 'rgba(232,57,110,.5)' : 'var(--border)'
            e.target.style.boxShadow = 'none'
          }}
        />
        <button
          type="submit"
          id={`${id}-btn`}
          disabled={status === 'loading'}
          aria-busy={status === 'loading'}
          className="bg-[var(--accent)] text-[#0a0a0b] border-none rounded-[var(--radius)] px-7 py-4 font-[var(--font)] text-[.95rem] font-bold whitespace-nowrap tracking-[.01em] transition-all duration-200 hover:shadow-[0_8px_32px_rgba(240,224,64,.35)] hover:brightness-105 active:scale-[.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Un secondo…
            </span>
          ) : 'Iscrivimi gratis'}
        </button>
      </form>

      {/* Error message */}
      {status === 'error' && errorMsg && (
        <p
          id={`${id}-error`}
          role="alert"
          aria-live="assertive"
          className="text-[.8rem] font-medium mt-3 text-center"
          style={{
            color: '#e8396e',
            animation: 'fadeUp .3s ease forwards',
          }}
        >
          {errorMsg}
        </p>
      )}

      {/* Baseline copy */}
      <p className="text-[.77rem] text-[var(--muted)] mt-3 text-center">
        Gratis. Un&apos;email a settimana. Zero spam. Lo promettiamo a noi stessi.
      </p>
    </div>
  )
}
