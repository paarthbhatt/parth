import Link from 'next/link'

export const metadata = {
  title: '404 — Page not found',
}

export default function NotFound() {
  return (
    <main id="main-content" className="page plain">
      <h1 className="display">Page not found</h1>
      <p>Nothing lives at this address. The portfolio is one page.</p>
      <p>
        <Link href="/">Go to the portfolio</Link>
      </p>
    </main>
  )
}
