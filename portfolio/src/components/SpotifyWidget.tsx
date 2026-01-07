'use client'

import { useEffect, useState } from 'react'

interface SpotifyTrack {
    name: string
    artist: string
    albumArt: string
    isPlaying: boolean
    url: string
}

interface SpotifyWidgetProps {
    className?: string
}

export default function SpotifyWidget({ className = '' }: SpotifyWidgetProps) {
    const [track, setTrack] = useState<SpotifyTrack | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const res = await fetch('/api/spotify/now-playing')
                if (res.ok) {
                    const data = await res.json()
                    if (data.isPlaying) {
                        setTrack(data)
                    } else {
                        setTrack(null)
                    }
                } else {
                    setError(true)
                }
            } catch (err) {
                console.error('Failed to fetch Spotify data:', err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchNowPlaying()
        // Refresh every 30 seconds
        const interval = setInterval(fetchNowPlaying, 30000)
        return () => clearInterval(interval)
    }, [])

    if (loading) {
        return (
            <div className={`bg-[#1DB954]/10 border border-[#1DB954]/30 p-4 rounded-lg ${className}`}>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#1DB954]/20 rounded animate-pulse" />
                    <div className="flex-1">
                        <div className="h-4 bg-[#1DB954]/20 rounded w-3/4 mb-2 animate-pulse" />
                        <div className="h-3 bg-[#1DB954]/20 rounded w-1/2 animate-pulse" />
                    </div>
                </div>
            </div>
        )
    }

    if (error || !track) {
        return (
            <div className={`bg-[#1DB954]/10 border border-[#1DB954]/30 p-4 rounded-lg ${className}`}>
                <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    <div>
                        <p className="text-sm font-mono text-[#1DB954]">Not Playing</p>
                        <p className="text-xs opacity-60">Spotify is quiet right now</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block bg-[#1DB954]/10 border border-[#1DB954]/30 p-4 rounded-lg hover:bg-[#1DB954]/20 transition-colors group ${className}`}
        >
            <div className="flex items-center gap-4">
                {/* Album Art */}
                <div className="relative w-14 h-14 rounded overflow-hidden flex-shrink-0">
                    <img
                        src={track.albumArt}
                        alt={track.name}
                        className="w-full h-full object-cover"
                    />
                    {/* Playing indicator */}
                    <div className="absolute bottom-1 right-1 flex gap-0.5">
                        <span className="w-1 h-3 bg-[#1DB954] rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 h-4 bg-[#1DB954] rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 h-2 bg-[#1DB954] rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono uppercase tracking-widest text-[#1DB954] mb-1 flex items-center gap-2">
                        <span>Now Playing</span>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                    </p>
                    <p className="font-bold text-white truncate group-hover:text-[#1DB954] transition-colors">
                        {track.name}
                    </p>
                    <p className="text-sm opacity-60 truncate">
                        {track.artist}
                    </p>
                </div>
            </div>
        </a>
    )
}
