import { NextRequest, NextResponse } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface BrevoErrorBody {
  code?: string
  message?: string
}

export async function POST(req: NextRequest) {
  // ── 1. Parse body ────────────────────────────────────────────────────────
  let email: string
  try {
    const body = await req.json() as { email?: unknown }
    email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  } catch {
    return NextResponse.json(
      { error: 'Richiesta non valida.' },
      { status: 400 },
    )
  }

  // ── 2. Validate email ────────────────────────────────────────────────────
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Inserisci un indirizzo email valido.' },
      { status: 422 },
    )
  }

  // ── 3. Read env vars ─────────────────────────────────────────────────────
  const apiKey = process.env.BREVO_API_KEY
  const listId = Number(process.env.BREVO_LIST_ID)

  if (!apiKey || !listId) {
    console.error('[subscribe] Variabili d\'ambiente mancanti: BREVO_API_KEY o BREVO_LIST_ID')
    return NextResponse.json(
      { error: 'Errore di configurazione del server. Riprova tra poco.' },
      { status: 500 },
    )
  }

  // ── 4. Call Brevo API ────────────────────────────────────────────────────
  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: false, // do NOT silently update existing contacts
      }),
    })

    // ── 5. Handle Brevo response ───────────────────────────────────────────
    if (res.ok) {
      // 201 Created — new contact added
      return NextResponse.json({ success: true }, { status: 201 })
    }

    const errBody = await res.json() as BrevoErrorBody

    // Brevo returns 400 + code "duplicate_parameter" for already-subscribed contacts
    if (res.status === 400 && errBody.code === 'duplicate_parameter') {
      return NextResponse.json(
        { error: 'Questa email è già iscritta. Ci vediamo domenica! 👋' },
        { status: 409 },
      )
    }

    // Any other Brevo error
    console.error('[subscribe] Errore Brevo:', res.status, errBody)
    return NextResponse.json(
      { error: 'Qualcosa è andato storto. Riprova tra qualche minuto.' },
      { status: 502 },
    )
  } catch (err) {
    console.error('[subscribe] Errore di rete verso Brevo:', err)
    return NextResponse.json(
      { error: 'Impossibile raggiungere il server. Controlla la connessione e riprova.' },
      { status: 503 },
    )
  }
}
