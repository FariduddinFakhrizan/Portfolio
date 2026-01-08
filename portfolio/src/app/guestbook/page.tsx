'use client'

import { useState, useEffect } from 'react'
import AnimatedSections from '@/components/AnimatedSections'
import BackgroundEffects from '@/components/BackgroundEffects'
import CursorFollower from '@/components/CursorFollower'
import DragFollowText from '@/components/DragFollowText'
import GuestbookForm from '@/components/GuestbookForm'
import GuestbookEntry from '@/components/GuestbookEntry'

interface GuestbookEntryData {
    id: number
    name: string
    message: string
    createdAt: string
    reactions: Record<string, number>
}

export default function GuestbookPage() {
    const [entries, setEntries] = useState<GuestbookEntryData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchEntries = async () => {
        try {
            const response = await fetch('/api/guestbook')
            if (!response.ok) throw new Error('Failed to fetch entries')

            const data = await response.json()
            setEntries(data)
            setError('')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchEntries()
    }, [])

    const handleReactionToggle = async (entryId: number, emoji: string) => {
        try {
            const response = await fetch(`/api/guestbook/${entryId}/react`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emoji }),
            })

            if (!response.ok) throw new Error('Failed to toggle reaction')

            // Optimistic update
            setEntries(prevEntries =>
                prevEntries.map(entry => {
                    if (entry.id === entryId) {
                        const newReactions = { ...entry.reactions }
                        const currentCount = newReactions[emoji] || 0

                        if (currentCount > 0) {
                            newReactions[emoji] = currentCount - 1
                            if (newReactions[emoji] === 0) {
                                delete newReactions[emoji]
                            }
                        } else {
                            newReactions[emoji] = 1
                        }

                        return { ...entry, reactions: newReactions }
                    }
                    return entry
                })
            )
        } catch (err) {
            console.error('Error toggling reaction:', err)
            // Refetch on error to ensure consistency
            fetchEntries()
        }
    }

    return (
        <main className="relative bg-gray-500 overflow-hidden">
            <CursorFollower />
            <BackgroundEffects />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />

            <AnimatedSections>
                <section className="min-h-screen flex flex-col justify-center p-8 md:p-16 relative z-10 pt-32 pb-20">
                    {/* Header */}
                    <div className="flex justify-between items-baseline mb-12 relative z-10">
                        <span className="text-[10px] font-mono opacity-50 tracking-widest">VISITOR MESSAGES</span>
                        <DragFollowText as="h1" className="text-4xl md:text-5xl font-black uppercase italic text-white" intensity={0.2}>
                            Guestbook
                        </DragFollowText>
                    </div>

                    <div className="max-w-3xl mx-auto w-full relative z-10">
                        {/* Description */}
                        <p className="text-white/70 mb-8 font-mono text-sm">
                            Leave a message, share your thoughts, or just say hi! 👋
                        </p>

                        {/* Form */}
                        <GuestbookForm onSuccess={fetchEntries} />

                        {/* Entries List */}
                        {isLoading ? (
                            <div className="text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                <p className="mt-4 text-white/60 font-mono text-sm">Loading messages...</p>
                            </div>
                        ) : error ? (
                            <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 font-mono text-sm">
                                {error}
                            </div>
                        ) : entries.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-white/40 font-mono text-sm">No messages yet. Be the first to sign! ✨</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold text-white">
                                        {entries.length} {entries.length === 1 ? 'Message' : 'Messages'}
                                    </h2>
                                </div>

                                {entries.map((entry) => (
                                    <GuestbookEntry
                                        key={entry.id}
                                        {...entry}
                                        onReactionToggle={handleReactionToggle}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <footer className="p-8 md:p-20 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-[10px] uppercase opacity-20 tracking-[0.5em] text-center md:text-left">
                            © 2024 Fariduddin Fakhrizan. All Rights Reserved.
                        </p>
                        <div className="flex gap-6 text-[10px] font-mono uppercase tracking-widest opacity-30">
                            <span>Built with Next.js 16</span>
                            <span>•</span>
                            <span>Prisma</span>
                            <span>•</span>
                            <span>TypeScript</span>
                        </div>
                    </div>
                </footer>
            </AnimatedSections>
        </main>
    )
}
