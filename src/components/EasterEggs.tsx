'use client'

import { useEffect, useState, useCallback } from 'react'

const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
]

export default function EasterEggs() {
    const [konamiIndex, setKonamiIndex] = useState(0)
    const [showEasterEgg, setShowEasterEgg] = useState(false)
    const [logoClicks, setLogoClicks] = useState(0)

    // Konami Code listener
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const key = event.code

        if (key === KONAMI_CODE[konamiIndex]) {
            const nextIndex = konamiIndex + 1
            setKonamiIndex(nextIndex)

            if (nextIndex === KONAMI_CODE.length) {
                // Konami code completed!
                setShowEasterEgg(true)
                setKonamiIndex(0)

                // Hide after 5 seconds
                setTimeout(() => setShowEasterEgg(false), 5000)
            }
        } else {
            setKonamiIndex(0)
        }
    }, [konamiIndex])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    // Logo click counter (for the F logo)
    useEffect(() => {
        const logo = document.querySelector('a[href="/"] .border-white')
        if (!logo) return

        const handleClick = () => {
            setLogoClicks(prev => {
                const newCount = prev + 1
                if (newCount >= 5) {
                    setShowEasterEgg(true)
                    setTimeout(() => setShowEasterEgg(false), 5000)
                    return 0
                }
                return newCount
            })
        }

        logo.addEventListener('click', handleClick)
        return () => logo.removeEventListener('click', handleClick)
    }, [])

    if (!showEasterEgg) return null

    return (
        <div className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center">
            {/* Confetti effect */}
            <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-3 h-3 animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            backgroundColor: ['#ff0', '#f0f', '#0ff', '#f00', '#0f0', '#00f'][Math.floor(Math.random() * 6)],
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${1 + Math.random()}s`,
                            transform: `rotate(${Math.random() * 360}deg)`,
                        }}
                    />
                ))}
            </div>

            {/* Easter egg message */}
            <div className="bg-black/90 backdrop-blur-xl border-2 border-white/30 p-8 md:p-12 rounded-2xl text-center z-10 animate-pulse">
                <div className="text-6xl mb-4">🎮</div>
                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    You found it!
                </h2>
                <p className="text-lg opacity-80 mb-4">
                    Achievement Unlocked: Secret Hunter
                </p>
                <p className="text-sm font-mono opacity-50">
                    You're clearly someone who explores. I like that! 🚀
                </p>
            </div>
        </div>
    )
}
