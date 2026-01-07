import AnimatedSections from "@/components/AnimatedSections"
import BackgroundEffects from "@/components/BackgroundEffects"
import CursorFollower from "@/components/CursorFollower"
import DragFollowText from "@/components/DragFollowText"
import Link from "next/link"

export const metadata = {
    title: "Blog",
    description: "Technical articles, insights, and lessons learned by Fariduddin Fakhrizan.",
}

const articles = [
    {
        slug: "building-reach-hub-with-laravel-12",
        title: "Building REACH Hub: A Global Academic Publishing Platform",
        excerpt: "How I architected a comprehensive journal management system using Laravel 12, handling complex peer review workflows and multi-language support.",
        date: "January 2026",
        readTime: "8 min read",
        tags: ["Laravel", "Architecture", "Case Study"],
    },
    {
        slug: "aws-cloud-practitioner-journey",
        title: "My AWS Cloud Practitioner Certification Journey",
        excerpt: "Tips, resources, and lessons learned while preparing for and passing the AWS Cloud Practitioner exam.",
        date: "December 2025",
        readTime: "5 min read",
        tags: ["AWS", "Certification", "Cloud"],
    },
    {
        slug: "nextjs-16-features",
        title: "What's New in Next.js 16: A Developer's Perspective",
        excerpt: "Exploring the latest features in Next.js 16 and how they improve developer experience and application performance.",
        date: "November 2025",
        readTime: "6 min read",
        tags: ["Next.js", "React", "Frontend"],
    },
    {
        slug: "designing-healthcare-portals",
        title: "Designing Healthcare Portals: UX Lessons from IIIHWS",
        excerpt: "Key principles and accessibility considerations when designing digital experiences for healthcare and wellness platforms.",
        date: "October 2025",
        readTime: "7 min read",
        tags: ["UI/UX", "Healthcare", "Design"],
    },
]

export default function BlogPage() {
    return (
        <main className="relative bg-gray-500 overflow-hidden">
            <CursorFollower />
            <BackgroundEffects />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
            <AnimatedSections>
                <section className="min-h-screen flex flex-col justify-center p-8 md:p-16 border-b border-white/10 relative z-10 pt-32">
                    <div className="flex justify-between items-baseline mb-12 relative z-10">
                        <span className="text-[10px] font-mono opacity-50 tracking-widest">THOUGHTS & INSIGHTS</span>
                        <DragFollowText as="h1" className="text-4xl md:text-5xl font-black uppercase italic text-white" intensity={0.2}>
                            Blog
                        </DragFollowText>
                    </div>

                    <div className="space-y-6 relative z-10">
                        {articles.map((article) => (
                            <Link
                                key={article.slug}
                                href={`/blog/${article.slug}`}
                                className="group block relative bg-[#0a0a0a] border border-white/10 p-8 rounded-lg hover:border-white/20 transition-all duration-500 hover:translate-x-2"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg" />

                                <div className="relative z-10">
                                    <div className="flex flex-wrap items-center gap-4 mb-3 text-xs font-mono opacity-60">
                                        <span>{article.date}</span>
                                        <span>•</span>
                                        <span>{article.readTime}</span>
                                    </div>

                                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
                                        {article.title}
                                    </h2>

                                    <p className="text-base opacity-70 mb-4 leading-relaxed">
                                        {article.excerpt}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {article.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-white/10 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Arrow indicator */}
                                <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </Link>
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
