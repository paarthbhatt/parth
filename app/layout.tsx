import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { ScrollProgress } from '@/components/ScrollProgress'
import { CursorGlow } from '@/components/CursorGlow'
import './globals.css'

export const metadata: Metadata = {
  title: 'Parth Bhatt | Security Architect & AI Safety Engineer',
  description: 'Portfolio of Parth Bhatt – Security Architect, AI Safety Engineer, and DRDO (SAG) Intern. Building self-defending software pipelines, LLM firewalls, and autonomous security agents. B.Tech student from New Delhi.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ScrollProgress />
        <CursorGlow />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
