import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { ScrollProgress } from '@/components/ScrollProgress'
import { CursorGlow } from '@/components/CursorGlow'
import './globals.css'

const SITE_URL = 'https://www.parthbhatt.me'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Parth Bhatt | Security Architect & AI Safety Engineer',
  description:
    'Portfolio of Parth Bhatt – Security Architect, AI Safety Engineer, and DRDO (SAG) Intern. Building self-defending software pipelines, LLM firewalls, and autonomous security agents. B.Tech student from New Delhi.',
  keywords: [
    'Parth Bhatt',
    'Security Architect',
    'AI Safety Engineer',
    'Cybersecurity',
    'Ethical Hacking',
    'Penetration Testing',
    'DRDO',
    'SAG',
    'LLM Firewall',
    'Autonomous Security Agent',
    'New Delhi',
  ],
  authors: [{ name: 'Parth Bhatt', url: SITE_URL }],
  creator: 'Parth Bhatt',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Parth Bhatt',
    title: 'Parth Bhatt | Security Architect & AI Safety Engineer',
    description:
      'Portfolio of Parth Bhatt – Security Architect, AI Safety Engineer, and DRDO (SAG) Intern. Building self-defending software pipelines, LLM firewalls, and autonomous security agents.',
    images: [
      {
        url: '/parth-bhatt-portrait.png',
        alt: 'Parth Bhatt portrait',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parth Bhatt | Security Architect & AI Safety Engineer',
    description:
      'Portfolio of Parth Bhatt – Security Architect, AI Safety Engineer, and DRDO (SAG) Intern. Building self-defending software pipelines, LLM firewalls, and autonomous security agents.',
    images: ['/parth-bhatt-portrait.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ScrollProgress />
        <CursorGlow />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
