'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DropdownItem {
    href: string
    label: string
    description?: string
}

interface DropdownMenuProps {
    label: string
    items: DropdownItem[]
    isActive?: boolean
}

export default function DropdownMenu({ label, items, isActive }: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const pathname = usePathname()

    // Check if any child is active
    const hasActiveChild = items.some(item =>
        pathname === item.href || pathname.startsWith(item.href + '/')
    )

    // Handle mouse enter - open immediately and cancel any pending close
    const handleMouseEnter = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current)
            closeTimeoutRef.current = null
        }
        setIsOpen(true)
    }

    // Handle mouse leave - delay before closing
    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setIsOpen(false)
        }, 300) // 300ms delay before closing
    }

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current)
            }
        }
    }, [])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Close on escape
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [])

    return (
        <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Trigger Button */}
            <button
                className={`relative px-4 py-2 text-xs font-mono uppercase tracking-widest text-white group flex items-center gap-1 ${isActive || hasActiveChild ? 'opacity-100' : 'opacity-80'
                    }`}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <span className="relative z-10 inline-block group-hover:scale-110 group-hover:opacity-100 transition-all duration-300">
                    {label}
                </span>
                {/* Dropdown Arrow */}
                <svg
                    className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>

                {/* Active Indicator */}
                {(isActive || hasActiveChild) && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
                )}
                {!(isActive || hasActiveChild) && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                )}
                <span className="absolute inset-0 bg-white/10 rounded transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
            </button>

            {/* Dropdown Panel */}
            <div
                className={`absolute top-full left-0 mt-2 min-w-[200px] transition-all duration-200 ${isOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
            >
                <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg overflow-hidden shadow-2xl">
                    {items.map((item, index) => {
                        const itemActive = pathname === item.href || pathname.startsWith(item.href + '/')
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-3 text-sm font-mono transition-all duration-200 group ${itemActive
                                    ? 'bg-white/20 text-white'
                                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                                    } ${index !== items.length - 1 ? 'border-b border-white/10' : ''}`}
                            >
                                <span className="block uppercase tracking-wider text-xs group-hover:translate-x-1 transition-transform duration-200">
                                    {item.label}
                                </span>
                                {item.description && (
                                    <span className="block text-[10px] opacity-50 mt-1 normal-case tracking-normal">
                                        {item.description}
                                    </span>
                                )}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
