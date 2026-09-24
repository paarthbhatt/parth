import Link from 'next/link'

export const metadata = {
  title: '404 — Page not found',
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-lg border-2 border-emerald-500/40 bg-black p-6 font-mono shadow-[0_0_40px_rgba(16,185,129,0.2)] sm:p-8">
        <p className="text-xs text-emerald-400/90">root@parth-bhatt:~$ cd {'<unknown>'}</p>
        <h1 className="mt-4 text-3xl font-bold text-emerald-400 sm:text-4xl">404 — not found</h1>
        <p className="mt-4 text-sm leading-relaxed text-gray-300">
          That path doesn&apos;t resolve to anything on this host.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 transition-colors hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <span aria-hidden="true">&gt;</span> Return to portfolio
        </Link>
      </div>
    </main>
  )
}
