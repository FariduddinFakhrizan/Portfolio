'use client'

import { useState } from 'react'

interface GuestbookEntryProps {
    id: number
    name: string
    message: string
    createdAt: string
    reactions: Record<string, number>
    onReactionToggle: (id: number, emoji: string) => void
}

const ALLOWED_EMOJIS = ['👍', '❤️', '🎉', '🚀', '💯', '🔥']

export default function GuestbookEntry({
    id,
    name,
    message,
    createdAt,
    reactions,
    onReactionToggle,
}: GuestbookEntryProps) {
    const [isReacting, setIsReacting] = useState(false)

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

        if (diffInSeconds < 60) return 'just now'
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        })
    }

    const handleReaction = async (emoji: string) => {
        if (isReacting) return
        setIsReacting(true)

        try {
            await onReactionToggle(id, emoji)
        } finally {
            setIsReacting(false)
        }
    }

    return (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all duration-300 group">
            {/* Header */}
            <div className="flex items-baseline justify-between mb-3">
                <span className="font-bold text-white">{name}</span>
                <span className="text-xs font-mono opacity-40">{formatDate(createdAt)}</span>
            </div>

            {/* Message */}
            <p className="text-white/70 leading-relaxed mb-4">{message}</p>

            {/* Reactions */}
            <div className="flex flex-wrap gap-2">
                {ALLOWED_EMOJIS.map((emoji) => {
                    const count = reactions[emoji] || 0
                    const hasReaction = count > 0

                    return (
                        <button
                            key={emoji}
                            onClick={() => handleReaction(emoji)}
                            disabled={isReacting}
                            className={`
                px-3 py-1 rounded-full font-mono text-sm
                transition-all duration-200
                ${hasReaction
                                    ? 'bg-white/20 border border-white/30'
                                    : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                                }
                disabled:opacity-50 disabled:cursor-not-allowed
                group-hover:border-white/20
              `}
                        >
                            <span className="mr-1">{emoji}</span>
                            {count > 0 && <span className="opacity-70">{count}</span>}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
