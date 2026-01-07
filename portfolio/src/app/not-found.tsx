import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-500 flex items-center justify-center p-8">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-black text-white">404</h1>
        <h2 className="text-2xl font-bold text-white/80">Page Not Found</h2>
        <p className="text-white/60 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-white font-mono uppercase tracking-wider"
          >
            Go Home
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-white font-mono uppercase tracking-wider"
          >
            View Projects
          </Link>
        </div>
      </div>
    </main>
  )
}
