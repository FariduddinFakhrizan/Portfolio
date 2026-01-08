'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import DropdownMenu from './DropdownMenu'
import ThemeToggle from './ThemeToggle'

// Navigation structure with dropdowns
const aboutItems = [
  { href: '/about', label: 'My Story', description: 'Background & experience' },
  { href: '/now', label: 'Now', description: 'What I\'m currently doing' },
  { href: '/testimonials', label: 'Testimonials', description: 'What colleagues say' },
]

const workItems = [
  { href: '/projects', label: 'Projects', description: 'Featured work' },
  { href: '/case-studies', label: 'Case Studies', description: 'In-depth breakdowns' },
  { href: '/technologies', label: 'Tech Stack', description: 'Tools I use' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [downloadCount, setDownloadCount] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState<string>('')

  // Update clock every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }))
    }
    updateTime() // Set initial time
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Fetch resume download count
  useEffect(() => {
    const fetchDownloadCount = async () => {
      try {
        const res = await fetch('/api/resume-downloads')
        if (res.ok) {
          const data = await res.json()
          setDownloadCount(data.count)
        }
      } catch (e) {
        // Silently fail
      }
    }
    fetchDownloadCount()
  }, [])

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const handleResumeDownload = async () => {
    try {
      await fetch('/api/resume-downloads', { method: 'POST' })
      setDownloadCount(prev => (prev ?? 0) + 1)
    } catch (e) {
      // Silently fail
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] glass backdrop-blur-md py-4 bg-black/50 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Clock */}
              <div className="hidden md:flex items-center gap-2 text-white/80 font-mono text-sm">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path strokeWidth="2" strokeLinecap="round" d="M12 6v6l4 2" />
                </svg>
                <span className="tabular-nums" suppressHydrationWarning>
                  {currentTime || '00:00:00'}
                </span>
              </div>

              {/* Logo/Brand */}
              <Link href="/" className="group">
                <div className="w-10 h-10 border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl font-black italic">F</span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {/* Home */}
              <Link
                href="/"
                className={`relative px-4 py-2 text-xs font-mono uppercase tracking-widest text-white group ${isActive('/') && pathname === '/' ? 'opacity-100' : 'opacity-80'
                  }`}
              >
                <span className="relative z-10 inline-block group-hover:scale-110 group-hover:opacity-100 transition-all duration-300">
                  Home
                </span>
                {pathname === '/' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
                )}
                {pathname !== '/' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                )}
                <span className="absolute inset-0 bg-white/10 rounded transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
              </Link>

              {/* About Dropdown */}
              <DropdownMenu
                label="About"
                items={aboutItems}
                isActive={aboutItems.some(item => isActive(item.href))}
              />

              {/* Work Dropdown */}
              <DropdownMenu
                label="Work"
                items={workItems}
                isActive={workItems.some(item => isActive(item.href))}
              />

              {/* Blog */}
              <Link
                href="/blog"
                className={`relative px-4 py-2 text-xs font-mono uppercase tracking-widest text-white group ${isActive('/blog') ? 'opacity-100' : 'opacity-80'
                  }`}
              >
                <span className="relative z-10 inline-block group-hover:scale-110 group-hover:opacity-100 transition-all duration-300">
                  Blog
                </span>
                {isActive('/blog') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
                )}
                {!isActive('/blog') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                )}
                <span className="absolute inset-0 bg-white/10 rounded transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
              </Link>

              {/* Playground */}
              <Link
                href="/playground"
                className={`relative px-4 py-2 text-xs font-mono uppercase tracking-widest text-white group ${isActive('/playground') ? 'opacity-100' : 'opacity-80'
                  }`}
              >
                <span className="relative z-10 inline-block group-hover:scale-110 group-hover:opacity-100 transition-all duration-300">
                  Playground
                </span>
                {isActive('/playground') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
                )}
                {!isActive('/playground') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                )}
                <span className="absolute inset-0 bg-white/10 rounded transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
              </Link>

              {/* Guestbook */}
              <Link
                href="/guestbook"
                className={`relative px-4 py-2 text-xs font-mono uppercase tracking-widest text-white group ${isActive('/guestbook') ? 'opacity-100' : 'opacity-80'
                  }`}
              >
                <span className="relative z-10 inline-block group-hover:scale-110 group-hover:opacity-100 transition-all duration-300">
                  Guestbook
                </span>
                {isActive('/guestbook') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
                )}
                {!isActive('/guestbook') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                )}
                <span className="absolute inset-0 bg-white/10 rounded transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                className={`relative px-4 py-2 text-xs font-mono uppercase tracking-widest text-white group ${isActive('/contact') ? 'opacity-100' : 'opacity-80'
                  }`}
              >
                <span className="relative z-10 inline-block group-hover:scale-110 group-hover:opacity-100 transition-all duration-300">
                  Contact
                </span>
                {isActive('/contact') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
                )}
                {!isActive('/contact') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                )}
                <span className="absolute inset-0 bg-white/10 rounded transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
              </Link>

              {/* Resume Download */}
              <a
                href="/MUHAMMAD FARIDUDDIN BIN FAKHRIZAN_SOFTWARE DEVELOPER.pdf"
                download
                onClick={handleResumeDownload}
                className="relative px-4 py-2 text-xs font-mono uppercase tracking-widest text-white group opacity-80 hover:opacity-100 transition-all duration-300 resume-button"
              >
                <span className="relative z-10 inline-block group-hover:scale-110 transition-all duration-300 flex items-center gap-2">
                  Resume
                  {downloadCount !== null && downloadCount > 0 && (
                    <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full">
                      {downloadCount}
                    </span>
                  )}
                </span>
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <span className="absolute inset-0 bg-white/10 rounded transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
              </a>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 relative z-[101] text-white"
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-[2px] bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-[2px] bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-[2px] bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] glass backdrop-blur-md bg-black/70 md:hidden transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
      >
        <div className="flex flex-col items-center justify-center h-full gap-4 py-20 overflow-y-auto">
          {/* Home */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`text-2xl font-mono uppercase tracking-widest text-white ${pathname === '/' ? 'opacity-100' : 'opacity-80'
              }`}
          >
            Home
          </Link>

          {/* About Section */}
          <div className="text-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-2">About</span>
            {aboutItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block text-xl font-mono uppercase tracking-widest text-white py-1 ${isActive(item.href) ? 'opacity-100' : 'opacity-70'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Work Section */}
          <div className="text-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-2">Work</span>
            {workItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block text-xl font-mono uppercase tracking-widest text-white py-1 ${isActive(item.href) ? 'opacity-100' : 'opacity-70'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Blog */}
          <Link
            href="/blog"
            onClick={() => setIsOpen(false)}
            className={`text-2xl font-mono uppercase tracking-widest text-white ${isActive('/blog') ? 'opacity-100' : 'opacity-80'
              }`}
          >
            Blog
          </Link>

          {/* Playground */}
          <Link
            href="/playground"
            onClick={() => setIsOpen(false)}
            className={`text-2xl font-mono uppercase tracking-widest text-white ${isActive('/playground') ? 'opacity-100' : 'opacity-80'
              }`}
          >
            Playground
          </Link>

          {/* Guestbook */}
          <Link
            href="/guestbook"
            onClick={() => setIsOpen(false)}
            className={`text-2xl font-mono uppercase tracking-widest text-white ${isActive('/guestbook') ? 'opacity-100' : 'opacity-80'
              }`}
          >
            Guestbook
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className={`text-2xl font-mono uppercase tracking-widest text-white ${isActive('/contact') ? 'opacity-100' : 'opacity-80'
              }`}
          >
            Contact
          </Link>

          {/* Resume */}
          <a
            href="/MUHAMMAD FARIDUDDIN BIN FAKHRIZAN_SOFTWARE DEVELOPER.pdf"
            download
            onClick={() => {
              setIsOpen(false)
              handleResumeDownload()
            }}
            className="text-2xl font-mono uppercase tracking-widest text-white opacity-80"
          >
            Resume
          </a>
        </div>
      </div>
    </>
  )
}
