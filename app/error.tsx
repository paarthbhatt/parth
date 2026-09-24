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
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-lg border-2 border-red-500/40 bg-black p-6 font-mono shadow-[0_0_40px_rgba(239,68,68,0.15)] sm:p-8">
        <p className="text-xs text-red-400/90">root@parth-bhatt:~$</p>
        <h1 className="mt-4 text-3xl font-bold text-red-400 sm:text-4xl">Runtime error</h1>
        <p className="mt-4 text-sm leading-relaxed text-gray-300">
          Something broke during rendering. The error has been logged.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-gray-500">Digest: {error.digest}</p>
        )}
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 transition-colors hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <span aria-hidden="true">&gt;</span> Retry
        </button>
      </div>
    </main>
  )
}
