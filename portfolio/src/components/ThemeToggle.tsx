'use client'

import { useState, useEffect } from 'react'

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Check localStorage for saved theme
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
        if (savedTheme) {
            setTheme(savedTheme)
            document.documentElement.classList.remove('light', 'dark')
            document.documentElement.classList.add(savedTheme)
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    // Don't render anything until mounted to prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20" />
        )
    }

    return (
        <button
            onClick={toggleTheme}
            className="relative w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {/* Sun Icon */}
            <svg
                className={`w-5 h-5 absolute transition-all duration-300 ${theme === 'dark'
                        ? 'opacity-100 rotate-0 scale-100'
                        : 'opacity-0 rotate-90 scale-0'
                    }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
            </svg>

            {/* Moon Icon */}
            <svg
                className={`w-5 h-5 absolute transition-all duration-300 ${theme === 'light'
                        ? 'opacity-100 rotate-0 scale-100'
                        : 'opacity-0 -rotate-90 scale-0'
                    }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
            </svg>
        </button>
    )
}
