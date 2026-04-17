import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  metadataBase: new URL('https://sbauchina.it'),
  title: {
    default: 'Sbauchina — La newsletter settimanale per under 30',
    template: '%s | Sbauchina',
  },
  description: 'Geopolitica, Musica, AI e Sport. Ogni domenica. Spiegato come se fossi un essere umano.',
  keywords: ['newsletter italiana', 'under 30', 'geopolitica', 'musica', 'AI', 'sport', 'settimanale'],
  authors: [{ name: 'Leonardo', url: 'https://sbauchina.it' }],
  creator: 'Sbauchina',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://sbauchina.it',
    siteName: 'Sbauchina',
    title: 'Sbauchina — La newsletter per under 30',
    description: 'Non sai di cosa parlare al primo appuntamento? Leggi Sbauchina.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sbauchina — La newsletter per under 30',
    description: 'Non sai di cosa parlare al primo appuntamento? Leggi Sbauchina.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://sbauchina.it' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'Sbauchina',
      url: 'https://sbauchina.it',
      description: 'Newsletter settimanale italiana per under 30. Geopolitica, Musica, AI & Innovazione, Sport.',
      potentialAction: { '@type': 'SubscribeAction', target: 'https://sbauchina.it#iscriviti' },
    },
    {
      '@type': 'NewsMediaOrganization',
      name: 'Sbauchina',
      url: 'https://sbauchina.it',
      email: 'ciao@sbauchina.it',
      description: 'Newsletter settimanale italiana per under 30.',
      foundingDate: '2024',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <link rel="canonical" href="https://sbauchina.it" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
