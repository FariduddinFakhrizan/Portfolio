import AnimatedSections from '@/components/AnimatedSections'
import BackgroundEffects from '@/components/BackgroundEffects'
import CursorFollower from '@/components/CursorFollower'
import DragFollowText from '@/components/DragFollowText'
import PlaygroundCard from '@/components/PlaygroundCard'

export const metadata = {
    title: 'Code Playground',
    description: 'Interactive code examples and live demonstrations by Fariduddin Fakhrizan.',
}

// Ensure this page is included in the build as static
export const dynamic = 'force-static'
export const revalidate = false

// Sample playgrounds - you can move this to a database later
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

export default function PlaygroundPage() {
    return (
        <main className="relative bg-gray-500 overflow-hidden">
            <CursorFollower />
            <BackgroundEffects />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />

            <AnimatedSections>
                <section className="min-h-screen flex flex-col justify-center p-8 md:p-16 border-b border-white/10 relative z-10 pt-32">
                    {/* Header */}
                    <div className="flex justify-between items-baseline mb-12 relative z-10">
                        <span className="text-[10px] font-mono opacity-50 tracking-widest">LIVE CODE DEMOS</span>
                        <DragFollowText as="h1" className="text-4xl md:text-5xl font-black uppercase italic text-white" intensity={0.2}>
                            Playground
                        </DragFollowText>
                    </div>

                    {/* Description */}
                    <div className="mb-12 relative z-10">
                        <p className="text-white/70 max-w-2xl font-mono text-sm">
                            Explore interactive code examples and live demonstrations. Click any card to view the full playground.
                        </p>
                    </div>

                    {/* Playground Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                        {playgrounds.map((playground) => (
                            <PlaygroundCard
                                key={playground.id}
                                id={playground.id}
                                title={playground.title}
                                description={playground.description}
                                platform={playground.platform}
                                tags={playground.tags}
                            />
                        ))}
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
