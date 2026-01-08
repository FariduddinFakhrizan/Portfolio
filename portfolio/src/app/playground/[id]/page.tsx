import AnimatedSections from '@/components/AnimatedSections'
import BackgroundEffects from '@/components/BackgroundEffects'
import CursorFollower from '@/components/CursorFollower'
import CodePlayground from '@/components/CodePlayground'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Sample playgrounds - keep in sync with playground/page.tsx
const playgrounds = [
    {
        id: 1,
        title: 'React Component Library',
        description: 'A collection of reusable React components with TypeScript and Tailwind CSS.',
        embedUrl: 'https://stackblitz.com/edit/react-ts-component-library?embed=1&file=src/App.tsx',
        platform: 'stackblitz' as const,
        tags: ['React', 'TypeScript', 'Tailwind'],
    },
    {
        id: 2,
        title: 'TypeScript Utilities',
        description: 'Useful TypeScript utility functions and type helpers for everyday development.',
        embedUrl: 'https://stackblitz.com/edit/typescript-utilities?embed=1&file=index.ts',
        platform: 'stackblitz' as const,
        tags: ['TypeScript', 'Utilities'],
    },
    {
        id: 3,
        title: 'CSS Animation Showcase',
        description: 'Modern CSS animations and transitions with smooth performance.',
        embedUrl: 'https://codesandbox.io/embed/css-animations?fontsize=14&hidenavigation=1&theme=dark',
        platform: 'codesandbox' as const,
        tags: ['CSS', 'Animation'],
    },
    {
        id: 4,
        title: 'Next.js API Routes Demo',
        description: 'Examples of Next.js API routes with serverless functions and middleware.',
        embedUrl: 'https://stackblitz.com/edit/nextjs-api-routes?embed=1&file=pages/api/hello.ts',
        platform: 'stackblitz' as const,
        tags: ['Next.js', 'API', 'Serverless'],
    },
    {
        id: 5,
        title: 'Algorithm Visualizer',
        description: 'Interactive visualizations of common sorting and searching algorithms.',
        embedUrl: 'https://codesandbox.io/embed/algorithm-visualizer?fontsize=14&hidenavigation=1&theme=dark',
        platform: 'codesandbox' as const,
        tags: ['Algorithms', 'Visualization', 'JavaScript'],
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
