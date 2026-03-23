import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { ScrollProgress } from '@/components/ScrollProgress'
import { CursorGlow } from '@/components/CursorGlow'
import './globals.css'

export const metadata: Metadata = {
  title: 'Parth Bhatt | Cybersecurity Portfolio',
  description: 'Portfolio of Parth Bhatt – Cybersecurity enthusiast, Threat Intelligence Analyst, and B.Tech student from New Delhi. Showcasing projects, certifications, and experience in cybersecurity, web security, and AI.',
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
