import AnimatedSections from "@/components/AnimatedSections"
import BackgroundEffects from "@/components/BackgroundEffects"
import CursorFollower from "@/components/CursorFollower"
import Link from "next/link"
import { notFound } from "next/navigation"

// Blog article content
const articles: Record<string, {
    title: string
    date: string
    readTime: string
    tags: string[]
    content: string
}> = {
    "building-reach-hub-with-laravel-12": {
        title: "Building REACH Hub: A Global Academic Publishing Platform",
        date: "January 2026",
        readTime: "8 min read",
        tags: ["Laravel", "Architecture", "Case Study"],
        content: `
## The Challenge

REACH Journal Hub needed to become a globally recognized, open-access knowledge ecosystem capable of hosting peer-reviewed journals, expert directories, and consultancy activities.

## Technical Architecture

### Backend Stack
- **Laravel 12** for the core application
- **PostgreSQL** for robust relational data
- **Redis** for caching and session management

### Key Features Implemented

1. **Multi-language Support**: Built a comprehensive i18n system supporting English, Malay, and Arabic.

2. **Peer Review Workflow**: Designed a complex state machine for manuscript submissions, reviews, and revisions.

3. **Expert Directory**: Created a searchable database of researchers with advanced filtering capabilities.

### Performance Optimizations

We achieved sub-200ms response times through:
- Aggressive query optimization
- Strategic use of database indexes
- Redis caching for frequently accessed data

## Lessons Learned

The biggest challenge was balancing academic rigor with user experience. Researchers needed powerful tools, but not at the cost of usability.

## Conclusion

Building REACH Hub taught me the importance of understanding domain requirements before writing code. The academic publishing world has unique needs that required careful research and collaboration with subject matter experts.
    `
    },
    "aws-cloud-practitioner-journey": {
        title: "My AWS Cloud Practitioner Certification Journey",
        date: "December 2025",
        readTime: "5 min read",
        tags: ["AWS", "Certification", "Cloud"],
        content: `
## Why AWS Cloud Practitioner?

As a full-stack developer increasingly working with cloud infrastructure, I wanted to formalize my AWS knowledge and demonstrate cloud competency.

## Study Resources

### Official Materials
- AWS Cloud Practitioner Essentials (Free course)
- AWS Whitepapers (especially the Well-Architected Framework)

### Third-Party Resources
- Stephane Maarek's Udemy course
- Practice exams from Tutorials Dojo

## Study Timeline

I dedicated about 3 weeks of consistent study:
- Week 1: Core services (EC2, S3, RDS, Lambda)
- Week 2: Security, pricing, and support
- Week 3: Practice exams and weak area review

## Exam Day Tips

1. **Read questions carefully** - AWS loves tricky wording
2. **Eliminate wrong answers** - Usually 2 are clearly wrong
3. **Flag and return** - Don't spend too long on any question

## What's Next?

I'm now working toward the AWS Solutions Architect Associate certification to deepen my architectural knowledge.

## Key Takeaways

The Cloud Practitioner certification is an excellent foundation. It covers breadth over depth, giving you vocabulary and mental models for cloud architecture.
    `
    },
    "nextjs-16-features": {
        title: "What's New in Next.js 16: A Developer's Perspective",
        date: "November 2025",
        readTime: "6 min read",
        tags: ["Next.js", "React", "Frontend"],
        content: `
## Overview

Next.js 16 brings significant improvements to both developer experience and application performance. Here are the highlights that matter most.

## Top Features

### 1. Enhanced Turbopack Performance

Turbopack is now the default bundler, offering:
- 10x faster cold starts
- Near-instant hot module replacement
- Better memory efficiency

### 2. React 19 Integration

Full support for React 19 features:
- Server Components improvements
- Enhanced Suspense boundaries
- Better error handling

### 3. Improved Caching

The new caching system offers:
- More granular cache invalidation
- Better static/dynamic rendering decisions
- Simplified revalidation APIs

## Migration Tips

When upgrading from Next.js 15:

1. **Update dependencies** gradually
2. **Test Server Components** thoroughly
3. **Review caching behavior** - defaults may have changed

## My Experience

Using Next.js 16 for this portfolio has been excellent. The improved build times make development much more pleasant.

## Conclusion

Next.js 16 continues the framework's tradition of excellent developer experience. The Turbopack improvements alone make the upgrade worthwhile.
    `
    },
    "designing-healthcare-portals": {
        title: "Designing Healthcare Portals: UX Lessons from IIIHWS",
        date: "October 2025",
        readTime: "7 min read",
        tags: ["UI/UX", "Healthcare", "Design"],
        content: `
## The IIIHWS Challenge

The International Institute of Integrative Healthcare and Wellness Sciences needed a world-class portal that bridged modern medicine with traditional wellness practices.

## Key Design Principles

### 1. Accessibility First

Healthcare portals serve diverse users:
- Large, readable fonts (minimum 16px)
- High contrast ratios (WCAG AA compliance)
- Keyboard navigation support

### 2. Trust Through Design

Healthcare requires trust:
- Clean, professional aesthetics
- Clear credentialing displays
- Transparent information hierarchy

### 3. Mobile-First Approach

Many users access healthcare info on phones:
- Touch-friendly tap targets
- Simplified navigation
- Optimized images

## Color Psychology

We chose a palette that conveys:
- **Blue/Teal**: Trust, professionalism, calm
- **White**: Cleanliness, clarity
- **Green accents**: Health, growth, wellness

## Navigation Design

Healthcare sites have complex information architectures. Our solution:
- Mega menus for desktop
- Progressive disclosure for mobile
- Persistent search functionality

## Lessons Learned

1. **Test with real users** - Healthcare professionals have unique needs
2. **Iterate based on feedback** - Our first navigation was too complex
3. **Performance matters** - Slow pages erode trust

## Conclusion

Designing for healthcare requires extra care. Users are often stressed or in need - your design should reduce friction, not add to it.
    `
    },
}

export async function generateStaticParams() {
    return Object.keys(articles).map((slug) => ({
        slug,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const article = articles[slug]
    if (!article) return { title: "Article Not Found" }

    return {
        title: article.title,
        description: article.content.substring(0, 160) + "...",
    }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const article = articles[slug]

    if (!article) {
        notFound()
    }

    return (
        <main className="relative bg-gray-500 overflow-hidden">
            <CursorFollower />
            <BackgroundEffects />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
            <AnimatedSections>
                <article className="min-h-screen p-8 md:p-16 relative z-10 pt-32">
                    {/* Back Link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-mono opacity-60 hover:opacity-100 transition-opacity mb-8"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                    </Link>

                    {/* Article Header */}
                    <header className="mb-12 max-w-3xl">
                        <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-mono opacity-60">
                            <span>{article.date}</span>
                            <span>•</span>
                            <span>{article.readTime}</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                            {article.title}
                        </h1>

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
                    </header>

                    {/* Article Content */}
                    <div className="prose prose-invert prose-lg max-w-3xl">
                        <div
                            className="space-y-6 text-white/80 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: article.content
                                    .replace(/## (.*)/g, '<h2 class="text-2xl font-bold text-white mt-12 mb-4">$1</h2>')
                                    .replace(/### (.*)/g, '<h3 class="text-xl font-bold text-white mt-8 mb-3">$1</h3>')
                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                                    .replace(/- (.*)/g, '<li class="ml-4 mb-2">$1</li>')
                                    .replace(/\n\n/g, '</p><p class="mb-4">')
                                    .replace(/1\. (.*)/g, '<li class="ml-4 mb-2 list-decimal">$1</li>')
                            }}
                        />
                    </div>
                </article>

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
