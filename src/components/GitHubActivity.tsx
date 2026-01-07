'use client'

import { useEffect, useState } from 'react'

interface GitHubActivityProps {
    username: string
    className?: string
}

interface GitHubStats {
    publicRepos: number
    followers: number
    contributions?: number
    recentRepos: { name: string; url: string; description: string; language: string; stars: number }[]
}

export default function GitHubActivity({ username, className = '' }: GitHubActivityProps) {
    const [stats, setStats] = useState<GitHubStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                // Fetch user data
                const userRes = await fetch(`https://api.github.com/users/${username}`)
                if (!userRes.ok) throw new Error('User not found')
                const userData = await userRes.json()

                // Fetch recent repos
                const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`)
                const reposData = await reposRes.json()

                setStats({
                    publicRepos: userData.public_repos,
                    followers: userData.followers,
                    recentRepos: reposData.map((repo: any) => ({
                        name: repo.name,
                        url: repo.html_url,
                        description: repo.description || 'No description',
                        language: repo.language || 'Unknown',
                        stars: repo.stargazers_count,
                    })),
                })
            } catch (err) {
                console.error('Failed to fetch GitHub data:', err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchGitHubData()
    }, [username])

    if (loading) {
        return (
            <div className={`bg-[#0a0a0a] border border-white/10 p-6 rounded-lg ${className}`}>
                <div className="flex items-center gap-3 mb-4">
                    <svg className="w-6 h-6 text-white/70" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span className="text-sm font-mono uppercase tracking-widest opacity-60">GitHub Activity</span>
                </div>
                <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-white/10 rounded w-3/4"></div>
                    <div className="h-4 bg-white/10 rounded w-1/2"></div>
                </div>
            </div>
        )
    }

    if (error || !stats) {
        return (
            <div className={`bg-[#0a0a0a] border border-white/10 p-6 rounded-lg ${className}`}>
                <p className="text-sm opacity-60">Unable to load GitHub activity</p>
            </div>
        )
    }

    return (
        <div className={`bg-[#0a0a0a] border border-white/10 p-6 rounded-lg hover:border-white/20 transition-all duration-500 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-white/70" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span className="text-sm font-mono uppercase tracking-widest opacity-60">GitHub</span>
                </div>
                <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity"
                >
                    @{username}
                </a>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mb-6">
                <div>
                    <span className="text-2xl font-black text-white">{stats.publicRepos}</span>
                    <span className="text-xs font-mono uppercase tracking-wider opacity-60 ml-2">Repos</span>
                </div>
                <div>
                    <span className="text-2xl font-black text-white">{stats.followers}</span>
                    <span className="text-xs font-mono uppercase tracking-wider opacity-60 ml-2">Followers</span>
                </div>
            </div>

            {/* Recent Repos */}
            <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest opacity-40 block">Recent Activity</span>
                {stats.recentRepos.slice(0, 3).map((repo) => (
                    <a
                        key={repo.name}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-sm text-white group-hover:text-white/90">{repo.name}</span>
                            <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full">{repo.language}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}
