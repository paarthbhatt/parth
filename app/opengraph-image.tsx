import { ImageResponse } from 'next/og'

export const alt = 'Parth Bhatt — Security Architect & AI Safety Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Social card, rendered at build time. Twitter and LinkedIn crop anything that
 * isn't roughly 1.91:1, which is why the old 800x800 portrait looked wrong.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#000000',
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(16,185,129,0.22), transparent 45%), radial-gradient(circle at 85% 80%, rgba(6,182,212,0.18), transparent 45%)',
          padding: '72px 80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            color: '#34d399',
            fontSize: 26,
            letterSpacing: 2,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: '#10b981',
            }}
          />
          root@parth-bhatt:~$
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 96,
            fontWeight: 700,
            color: '#ffffff',
            marginTop: 24,
            lineHeight: 1.05,
          }}
        >
          Parth Bhatt
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 42,
            color: '#34d399',
            marginTop: 18,
          }}
        >
          Security Architect &amp; AI Safety Engineer
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: '#94a3b8',
            marginTop: 28,
          }}
        >
          DRDO (SAG) Intern · 4× Hackathon Winner · Top 6% TryHackMe
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 'auto',
            paddingTop: 40,
            fontSize: 26,
            color: '#22d3ee',
          }}
        >
          parthbhatt.me
        </div>
      </div>
    ),
    size,
  )
}
