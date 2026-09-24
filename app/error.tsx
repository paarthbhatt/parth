'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main id="main-content" className="page plain">
      <h1 className="display">This page failed to render</h1>
      <p>The error has been logged. Try loading it again.</p>
      {error.digest ? (
        <p className="meta">
          Reference: <code>{error.digest}</code>
        </p>
      ) : null}
      <p>
        <button type="button" onClick={reset} className="btn btn-secondary">
          Try again
        </button>
      </p>
    </main>
  )
}
