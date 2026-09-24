import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { ScrollProgress } from '@/components/ScrollProgress'
import { CursorGlow } from '@/components/CursorGlow'
import { SITE_URL } from '@/lib/site'
import { contactInfo, socialLinks } from '@/lib/data'
import './globals.css'

const TITLE = 'Parth Bhatt | Security Architect & AI Safety Engineer'
const DESCRIPTION =
  'Portfolio of Parth Bhatt – Security Architect, AI Safety Engineer, and ex-DRDO (SAG) Security Intern. Building self-defending software pipelines, LLM firewalls, and autonomous security agents. CAISO & CAIT certified. B.Tech student from New Delhi.'

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | Parth Bhatt',
  },
  description: DESCRIPTION,
  keywords: [
    'Parth Bhatt',
    'Security Architect',
    'AI Safety Engineer',
    'Cybersecurity',
    'Ethical Hacking',
    'Penetration Testing',
    'DRDO',
    'SAG',
    'CAISO',
    'Certified AI Security Officer',
    'CAIT',
    'Certified AI Threat Hunter',
    'CATP',
    'arcX Threat Intelligence',
    'GitHub Foundations',
    'LLM Firewall',
    'Autonomous Security Agent',
    'New Delhi',
  ],
  authors: [{ name: contactInfo.name, url: SITE_URL }],
  creator: contactInfo.name,
  publisher: contactInfo.name,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: '/',
    siteName: contactInfo.name,
    title: TITLE,
    description: DESCRIPTION,
    // The 1200x630 card comes from app/opengraph-image.tsx.
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    creator: '@thatsparthbhatt',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}

/**
 * Person schema. This portfolio is found overwhelmingly by name search, so a
 * Person entity with sameAs links is the highest-value structured data here.
 */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: contactInfo.name,
  url: SITE_URL,
  image: `${SITE_URL}/parth-bhatt-portrait.webp`,
  jobTitle: contactInfo.jobTitle,
  email: `mailto:${contactInfo.email}`,
  description: DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'New Delhi',
    addressCountry: 'IN',
  },
  alumniOf: [
    {
      '@type': 'Organization',
      name: 'Defence Research and Development Organisation (DRDO) — SAG',
    },
    {
      '@type': 'Organization',
      name: 'Cisco Networking Academy',
    },
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'CAISO — Certified AI Security Officer',
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: 'CISO Network Academy' },
      url: 'https://cisonetwork.com/verify/caiso/285df881-d1a9-4fce-8cd2-95986e72c828',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'CAIT — Certified AI Threat Hunter',
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: 'CISO Network Academy' },
      url: 'https://cisonetwork.com/verify/cait/e7832d56-4b94-40f6-ba32-e655ac3b7069',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'CATP — Certified AI Trust Practitioner',
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: 'CISO Network Academy' },
      url: 'https://cisonetwork.com/verify/70ebf952-79bd-40ff-82d4-e8ebf1de632f',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Foundation Level Threat Intelligence Analyst',
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: 'arcX' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'GitHub Foundations',
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: 'GitHub' },
    },
  ],
  knowsAbout: [
    'Application Security',
    'AI Safety',
    'Threat Intelligence',
    'Penetration Testing',
    'DevSecOps',
    'LLM Security',
  ],
  sameAs: [
    socialLinks.github,
    socialLinks.linkedin,
    socialLinks.twitter,
    socialLinks.medium,
    socialLinks.tryhackme,
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <script
          type="application/ld+json"
          // Serialized from a local literal, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ScrollProgress />
        <CursorGlow />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
