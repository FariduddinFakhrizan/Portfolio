'use client'

import { useState } from 'react'

export default function InitDbPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [details, setDetails] = useState<any>(null)

  const handleInit = async () => {
    setStatus('loading')
    setMessage('Initializing database...')
    setDetails(null)

    try {
      const response = await fetch('/api/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setMessage(`✅ Success! ${data.projectsCreated} projects created.`)
        setDetails(data)
      } else {
        setStatus('error')
        setMessage(`❌ Error: ${data.error || data.message || 'Unknown error'}`)
        setDetails(data)
      }
    } catch (error: any) {
      setStatus('error')
      setMessage(`❌ Failed to connect: ${error.message}`)
      setDetails({ error: error.message })
    }
  }

  const handleCheckStatus = async () => {
    setStatus('loading')
    setMessage('Checking database status...')
    setDetails(null)

    try {
      const response = await fetch('/api/init', {
        method: 'GET',
      })

      const data = await response.json()

      if (data.status === 'connected') {
        setStatus('success')
        setMessage(`✅ Database connected! ${data.projectsCount} projects found.`)
        setDetails(data)
      } else if (data.status === 'not_configured') {
        setStatus('error')
        setMessage('❌ DATABASE_URL not configured in Vercel environment variables.')
        setDetails({
          ...data,
          instructions: 'Go to Vercel Dashboard → Settings → Environment Variables → Add DATABASE_URL'
        })
      } else {
        setStatus('error')
        setMessage(`❌ ${data.message || 'Unknown error'}`)
        setDetails(data)
      }
    } catch (error: any) {
      setStatus('error')
      setMessage(`❌ Failed to check status: ${error.message}`)
      setDetails({ error: error.message })
    }
  }

  return (
    <main className="min-h-screen bg-gray-500 p-8 md:p-16 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-lg">
        <h1 className="text-3xl font-black uppercase mb-6 text-white">Database Initialization</h1>
        
        <div className="space-y-6">
          {/* Status Check Button */}
          <div>
            <button
              onClick={handleCheckStatus}
              disabled={status === 'loading'}
              className="w-full px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white font-mono uppercase tracking-wider"
            >
              {status === 'loading' ? 'Checking...' : 'Check Database Status'}
            </button>
          </div>

          {/* Initialize Button */}
          <div>
            <button
              onClick={handleInit}
              disabled={status === 'loading'}
              className="w-full px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-green-400 font-mono uppercase tracking-wider font-bold"
            >
              {status === 'loading' ? 'Initializing...' : 'Initialize & Seed Database'}
            </button>
          </div>

          {/* Status Message */}
          {message && (
            <div className={`p-4 rounded-lg ${
              status === 'success' ? 'bg-green-500/10 border border-green-500/30' :
              status === 'error' ? 'bg-red-500/10 border border-red-500/30' :
              'bg-white/5 border border-white/10'
            }`}>
              <p className="text-sm font-mono">{message}</p>
            </div>
          )}

          {/* Details */}
          {details && (
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h3 className="text-xs font-mono uppercase tracking-widest mb-2 opacity-60">Details:</h3>
              <pre className="text-xs font-mono overflow-auto text-white/80">
                {JSON.stringify(details, null, 2)}
              </pre>
            </div>
          )}

          {/* Instructions */}
          {status === 'error' && details?.instructions && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
              <h3 className="text-sm font-bold text-yellow-400 mb-2">How to Fix:</h3>
              <ol className="text-sm text-white/80 space-y-2 list-decimal list-inside">
                <li>Go to <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-yellow-400 underline">Vercel Dashboard</a></li>
                <li>Select your project</li>
                <li>Go to Settings → Environment Variables</li>
                <li>Add <code className="bg-white/10 px-1 rounded">DATABASE_URL</code> (NOT PRISMA_DATABASE_URL) with your database URL</li>
                <li><strong className="text-yellow-400">IMPORTANT:</strong> Make sure it's set for <strong>Production</strong> environment (check the dropdown)</li>
                <li>Save and wait for automatic redeploy (or trigger manually)</li>
                <li>Refresh this page and try again</li>
              </ol>
              {details?.debug && (
                <div className="mt-4 p-3 bg-black/30 rounded text-xs font-mono">
                  <p className="text-yellow-400 mb-2">Debug Info:</p>
                  <pre className="text-white/60 overflow-auto">
                    {JSON.stringify(details.debug, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Success Instructions */}
          {status === 'success' && details?.projectsCreated > 0 && (
            <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
              <h3 className="text-sm font-bold text-green-400 mb-2">✅ Success!</h3>
              <p className="text-sm text-white/80">
                Your database has been initialized with {details.projectsCreated} projects.
                Visit <a href="/projects" className="text-green-400 underline">/projects</a> to see them!
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
