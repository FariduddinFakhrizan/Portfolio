'use client'

import { useState } from 'react'

interface CodePlaygroundProps {
    url: string
    title: string
    platform: 'stackblitz' | 'codesandbox'
}

export default function CodePlayground({ url, title, platform }: CodePlaygroundProps) {
    const [isLoading, setIsLoading] = useState(true)

    const handleLoad = () => {
        setIsLoading(false)
    }

    const openInNewTab = () => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <div className="relative w-full h-full min-h-[600px] bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden group">
            {/* Platform Badge */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-mono uppercase tracking-wider">
                {platform === 'stackblitz' ? '⚡ StackBlitz' : '📦 CodeSandbox'}
            </div>

            {/* Open in New Tab Button */}
            <button
                onClick={openInNewTab}
                className="absolute top-4 right-4 z-10 px-4 py-2 bg-white text-black font-bold text-xs uppercase tracking-wider rounded hover:bg-white/90 transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
                Open in New Tab →
            </button>

            {/* Loading State */}
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] z-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-white/60 font-mono text-sm">Loading {title}...</p>
                </div>
            )}

            {/* Iframe */}
            <iframe
                src={url}
                title={title}
                onLoad={handleLoad}
                allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi; clipboard-write"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                className="w-full h-full min-h-[600px] border-0"
                loading="lazy"
            />
        </div>
    )
}
