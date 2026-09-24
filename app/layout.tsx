import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { SITE_URL } from '@/lib/site'
import { contactInfo, socialLinks } from '@/lib/data'
import './globals.css'

/**
 * Bricolage Grotesque, display only. This latin file carries both the wght
 * (200–800) and wdth (75–100) axes; the page animates both. The opsz axis
 * lives in a heavier file and is not needed at display sizes.
 */
const bricolage = localFont({
  src: '../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wdth-normal.woff2',
  variable: '--font-bricolage',
  weight: '200 800',
  style: 'normal',
  display: 'swap',
  declarations: [{ prop: 'font-stretch', value: '75% 100%' }],
  fallback: ['Arial Narrow', 'Arial', 'sans-serif'],
})

const TITLE = 'Parth Bhatt | Security Architect & AI Safety Engineer'
const DESCRIPTION =
  'Portfolio of Parth Bhatt – Security Architect, AI Safety Engineer, and ex-DRDO (SAG) Security Intern. Building self-defending software pipelines, LLM firewalls, and autonomous security agents. CAISO & CAIT certified. B.Tech student from New Delhi.'

export const viewport: Viewport = {
  // Paper: the page color below the intro.
  themeColor: '#EEF0F2',
  colorScheme: 'light',
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${bricolage.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // Serialized from a local literal, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
