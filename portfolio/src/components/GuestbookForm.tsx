'use client'

import { useState } from 'react'

interface GuestbookFormProps {
    onSuccess: () => void
}

export default function GuestbookForm({ onSuccess }: GuestbookFormProps) {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/guestbook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, message, email }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit message')
            }

            setSuccess(true)
            setName('')
            setMessage('')
            setEmail('')
            onSuccess()

            setTimeout(() => setSuccess(false), 3000)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-12">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6">
                <div className="space-y-4">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider opacity-60 mb-2">
                            Name *
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            maxLength={100}
                            className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white font-mono focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="Your name"
                        />
                    </div>

                    {/* Email Input (Optional) */}
                    <div>
                        <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider opacity-60 mb-2">
                            Email (Optional)
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white font-mono focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="your@email.com"
                        />
                    </div>

                    {/* Message Textarea */}
                    <div>
                        <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider opacity-60 mb-2">
                            Message * ({message.length}/500)
                        </label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            maxLength={500}
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white font-mono focus:outline-none focus:border-white/30 transition-colors resize-none"
                            placeholder="Leave your message..."
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || !name || !message}
                        className="w-full bg-white text-black font-bold uppercase tracking-wider px-6 py-3 rounded hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Submitting...' : 'Sign Guestbook'}
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm font-mono">
                        {error}
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded text-green-400 text-sm font-mono">
                        ✓ Message signed successfully!
                    </div>
                )}
            </div>
        </form>
    )
}
