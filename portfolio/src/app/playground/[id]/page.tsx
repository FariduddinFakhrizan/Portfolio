import AnimatedSections from '@/components/AnimatedSections'
import BackgroundEffects from '@/components/BackgroundEffects'
import CursorFollower from '@/components/CursorFollower'
import CodePlayground from '@/components/CodePlayground'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Sample playgrounds with real working examples - keep in sync with playground/page.tsx
const playgrounds = [
    {
        id: 1,
        title: 'React Todo App',
        description: 'A simple todo application built with React hooks and TypeScript.',
        embedUrl: 'https://stackblitz.com/edit/react-ts-todo?embed=1&file=src/App.tsx&view=preview',
        platform: 'stackblitz' as const,
        tags: ['React', 'TypeScript', 'Hooks'],
    },
    {
        id: 2,
        title: 'Animated Counter',
        description: 'Beautiful animated counter component with smooth transitions.',
        embedUrl: 'https://codesandbox.io/embed/animated-counter-forked-vkmz9?fontsize=14&hidenavigation=1&theme=dark&view=preview',
        platform: 'codesandbox' as const,
        tags: ['React', 'Animation', 'Framer Motion'],
    },
    {
        id: 3,
        title: 'CSS Grid Gallery',
        description: 'Responsive image gallery using CSS Grid with hover effects.',
        embedUrl: 'https://codesandbox.io/embed/css-grid-gallery-forked-h7k3p?fontsize=14&hidenavigation=1&theme=dark&view=preview',
        platform: 'codesandbox' as const,
        tags: ['CSS', 'Grid', 'Responsive'],
    },
    {
        id: 4,
        title: 'TypeScript Calculator',
        description: 'Calculator built with TypeScript showcasing type safety and interfaces.',
        embedUrl: 'https://stackblitz.com/edit/typescript-calculator?embed=1&file=index.ts&view=preview',
        platform: 'stackblitz' as const,
        tags: ['TypeScript', 'Math', 'CLI'],
    },
    {
        id: 5,
        title: 'Next.js Dark Mode',
        description: 'Dark mode implementation in Next.js with theme persistence.',
        embedUrl: 'https://stackblitz.com/edit/nextjs-dark-mode?embed=1&file=pages/index.tsx&view=preview',
        platform: 'stackblitz' as const,
        tags: ['Next.js', 'Theme', 'LocalStorage'],
    },
]

export const dynamic = 'force-static'
export const revalidate = false

export async function generateStaticParams() {
    return playgrounds.map((playground) => ({
        id: playground.id.toString(),
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const playground = playgrounds.find(p => p.id === parseInt(id))

    if (!playground) return { title: 'Playground Not Found' }

    return {
        title: playground.title,
        description: playground.description,
    }
}

export default async function PlaygroundDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const playground = playgrounds.find(p => p.id === parseInt(id))

    if (!playground) {
        notFound()
    }

    return (
        <main className="relative bg-gray-500 overflow-hidden min-h-screen">
            <CursorFollower />
            <BackgroundEffects />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />

            <AnimatedSections>
                <div className="p-8 md:p-16 relative z-10 pt-32 pb-20">
                    {/* Back Link */}
                    <Link
                        href="/playground"
                        className="inline-flex items-center gap-2 text-sm font-mono opacity-60 hover:opacity-100 transition-opacity mb-8"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Playground
                    </Link>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                            {playground.title}
                        </h1>
                        <p className="text-white/70 text-lg mb-4">
                            {playground.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {playground.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-white/10 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Playground */}
                    <CodePlayground
                        url={playground.embedUrl}
                        title={playground.title}
                        platform={playground.platform}
                    />
                </div>
            </AnimatedSections>
        </main>
    )
}
