/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development'

/**
 * Content-Security-Policy.
 *
 * `script-src` still carries 'unsafe-inline' because Next.js App Router inlines
 * its hydration payload as <script> tags. Removing it requires a per-request
 * nonce from middleware, and reading that nonce in the layout opts the whole
 * route out of static rendering. For a static portfolio with no user input,
 * trading edge-cached HTML for that is a bad deal -- but see README if you want
 * the strict-dynamic setup instead.
 *
 * 'unsafe-eval' is dev-only: it's needed for React Fast Refresh and source maps,
 * never in production.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://va.vercel-scripts.com`,
  // React writes component `style` props out as inline style attributes.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self' https://*.vercel-insights.com https://*.vercel-analytics.com",
  // Nothing on this site is embedded, submitted, or plugin-based.
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "manifest-src 'self'",
  'upgrade-insecure-requests',
].join('; ')

/** A static portfolio needs none of these device APIs. */
const permissionsPolicy = [
  'accelerometer=()',
  'autoplay=()',
  'camera=()',
  'display-capture=()',
  'encrypted-media=()',
  'fullscreen=(self)',
  'geolocation=()',
  'gyroscope=()',
  'magnetometer=()',
  'microphone=()',
  'midi=()',
  'payment=()',
  'usb=()',
  'xr-spatial-tracking=()',
].join(', ')

const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Card art renders at ~400px wide (3-col grid), the portrait at ~160px.
    imageSizes: [64, 128, 160, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Explicitly off: the legacy XSS auditor is deprecated and its
          // filtering introduced its own vulnerabilities. CSP replaces it.
          {
            key: 'X-XSS-Protection',
            value: '0',
          },
          // Superseded by CSP frame-ancestors, kept for legacy browsers.
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: permissionsPolicy,
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
        ],
      },
    ]
  },
}

export default nextConfig
