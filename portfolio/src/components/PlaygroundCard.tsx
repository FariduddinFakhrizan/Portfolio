'use client'

import Link from 'next/link'

interface PlaygroundCardProps {
    id: number
    title: string
    description: string
    platform: 'stackblitz' | 'codesandbox'
    tags: string[]
}

export default function PlaygroundCard({ id, title, description, platform, tags }: PlaygroundCardProps) {
    return (
        <Link
            href={`/playground/${id}`}
            className="group block relative bg-[#0a0a0a] border border-white/10 p-6 rounded-lg hover:border-white/20 transition-all duration-500 hover:translate-y-[-4px]"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg" />

            <div className="relative z-10">
                {/* Platform Badge */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 text-xs font-mono uppercase tracking-wider bg-white/10 rounded-full">
                        {platform === 'stackblitz' ? '⚡ StackBlitz' : '📦 CodeSandbox'}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-base opacity-70 mb-4 leading-relaxed line-clamp-2">
                    {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 text-xs font-mono bg-white/5 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Arrow indicator */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </Link>
    )
}
