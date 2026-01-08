import AnimatedSections from "@/components/AnimatedSections"
import BackgroundEffects from "@/components/BackgroundEffects"
import CursorFollower from "@/components/CursorFollower"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

// Case study data
const caseStudies: Record<string, {
    title: string
    subtitle: string
    image: string
    overview: string
    challenge: string
    solution: string
    techStack: { name: string; purpose: string }[]
    features: string[]
    results: { metric: string; value: string }[]
    lessons: string[]
    liveUrl?: string
}> = {
    "reach-journal-hub": {
        title: "REACH Journal Hub",
        subtitle: "Academic Publishing Platform",
        image: "/Reach.png",
        overview: "REACH Journal Hub is a comprehensive, open-access academic ecosystem designed to streamline the lifecycle of research publishing. Beyond hosting peer-reviewed journals, the platform integrates an expert directory, consultancy services, and a real-time support network. It bridges the gap between researchers, editors, and reviewers through a high-performance, multilingual interface.",
        challenge: "Academic publishing requires a delicate balance between complex, multi-stage workflows (manuscript submission to double-blind peer review) and high-security requirements for intellectual property and financial transactions. We needed a system that could handle PDF metadata extraction, role-based access control for sensitive research, and a seamless payment experience for Malaysian and international researchers.",
        solution: "I architected a modern monolith-plus-microservice hybrid. The core application is built with Laravel 12 and Vue 3 via Inertia.js, providing a snappy SPA feel without the complexity of a separate frontend API. To handle real-time support, I deployed a dedicated Node.js/Socket.io chat server, ensuring that live communication doesn't tax the primary application resources.",
        techStack: [
            { name: "Laravel 12 & PHP 8.2+", purpose: "The robust core handling business logic, policies, and routing" },
            { name: "Vue.js 3 & Inertia.js", purpose: "For a reactive, single-page application experience" },
            { name: "MySQL", purpose: "Relational data management for complex submission tracking" },
            { name: "Tailwind CSS 4.0", purpose: "Utilizing the latest utility-first styling for a high-performance UI" },
            { name: "Vite & Alpine.js", purpose: "For ultra-fast development builds and lightweight client-side interactions" },
            { name: "Socket.io", purpose: "For real-time communication and support" },
            { name: "Node.js & Typescript", purpose: "Powering the standalone real-time chat and support engine" },
            { name: "Embla Carousel", purpose: "For smooth, responsive scrolling of journal listings" },
        ],
        features: [
            "Research Publication Workflow",
            "Expert Network & Global Directory",
            "Integrated Payment System (Billplz)",
            "Real-time Support & Live Chat",
            "Advanced User Management",
        ],
        results: [
            { metric: "Journals Hosted", value: "10+" },
            { metric: "Average Response Time", value: "<200ms" },
            { metric: "User Roles Supported", value: "6" },
            { metric: "Languages", value: "2" },
        ],
        lessons: [
            "Prioritizing Human Expertise: The switch from AI to a polling-based human support system increased user trust and submission completion rates, as authors felt heard by real experts",
            "Scalable Real-time Architecture: Decoupling the chat server into a Node.js/TypeScript service allowed the main Laravel app to remain lightweight while handling high-frequency polling requests",
            "Future-Proofing with Tailwind 4.0: Utilizing the latest CSS engine ensured the platform remains fast and maintainable as the journal library grows",
        ],
        liveUrl: "https://reach-hub.org/",
    },
    "iiihws-healthcare": {
        title: "IIIHWS Portal",
        subtitle: "Integrative Healthcare Platform",
        image: "/IIIHWS.png",
        overview: "IIIHWS Healthcare is the digital flagship of the International Institute of Human Wellness and Science. It serves as a high-performance portal for academic programs, research initiatives, and professional healthcare collaborations. The platform is designed to bridge the gap between complex health sciences and accessible digital information, providing a seamless experience for researchers, students, and healthcare professionals globally.",
        challenge: "Healthcare and academic platforms must balance elite professionalism with high accessibility. We needed to create a high-fidelity digital experience that serves a diverse global audience—from medical practitioners to policymakers—while ensuring the platform could handle complex data structures (academic programs, research tiers) without compromising on speed or mobile responsiveness.",
        solution: "I architected a robust Laravel 12 backend coupled with a cutting-edge Tailwind CSS 4.0 frontend. By moving to a Vite 7 asset pipeline, I achieved sub-second page loads. The solution features a modular Blade-based architecture, a sophisticated multilingual engine, and a real-time polling system to facilitate direct communication between the institute and its global stakeholders.",
        techStack: [
            { name: "Laravel 12", purpose: "Core framework (PHP 8.2+) with MVC architecture" },
            { name: "Vite 7.0.7", purpose: "High-speed build tool and HMR." },
            { name: "Tailwind CSS 4.0", purpose: "Advanced utility-first styling with 3D CSS transforms." },
            { name: "MySQL & Eloquent", purpose: "Relational database for program and subscription management." },
            { name: "Vanilla JS & Axios", purpose: "Lightweight, reactive frontend interactions." },
            { name: "cPanel", purpose: "Secure hosting and CDN for global performance." },
        ],
        features: [
            "Multilingual Engine (EN/MS): Session-based language switching (English & Bahasa Malaysia)",
            "3D Interactive UI: Value proposition cards using CSS 3D transforms and gradient transitions",
            "Advanced Lead Capture: AJAX-driven newsletter system with automated reactivation logic",
            "Custom Motion Design: Animated loading overlays with spinning rings and page transition effects",
            "Ultra-Wide Optimization: Dedicated layout logic for high-end studio monitors (2560px+)",
            "Multi-Division Organizational Structure: Clear hierarchy across 5 major wellness and science sectors.",
        ],
        results: [
            { metric: "Page Load Time", value: "<2s" },
            { metric: "Mobile Score", value: "95+" },
            { metric: "Accessibility Score", value: "AA" },
            { metric: "Divisions", value: "5" },
        ],
        lessons: [
            "Healthcare UX requires extra attention to accessibility",
            "Trust is built through clean, professional design",
            "Mobile-first is essential for global reach",
        ],
        liveUrl: "https://integrative-care.org/",
    },
    "klibs-portal": {
        title: "KLIBS Portal",
        subtitle: "Learning Management System",
        image: "/Hero.png",
        overview: "KLIBS is a comprehensive learning management system currently in the high-fidelity prototyping phase. The design encompasses a complete user journey with 15+ screens including hero landing, secure authentication flows, course management, and community features.",
        challenge: "Designing an LMS that balances powerful functionality with intuitive usability. The system needed to serve diverse learning styles while maintaining engagement and motivation for learners.",
        solution: "I created a complete Figma-based design system with reusable components, establishing consistent patterns for navigation, content display, and user interactions. The prototype covers the full user journey from registration to course completion.",
        techStack: [
            { name: "Figma", purpose: "UI/UX design and prototyping" },
            { name: "Design System", purpose: "Reusable component library" },
            { name: "Auto Layout", purpose: "Responsive design patterns" },
            { name: "Prototyping", purpose: "Interactive user flows" },
        ],
        features: [
            "Hero landing with clear value proposition",
            "Secure authentication flows (login, register, password reset)",
            "Course catalog with filtering and search",
            "Progress tracking and achievements",
            "Community features and discussions",
            "Instructor dashboard for content management",
        ],
        results: [
            { metric: "Screens Designed", value: "15+" },
            { metric: "Components", value: "50+" },
            { metric: "User Flows", value: "5" },
            { metric: "Status", value: "Ready for Dev" },
        ],
        lessons: [
            "Prototyping before development saves significant time",
            "Design systems ensure consistency at scale",
            "User testing early reveals usability issues",
        ],
        liveUrl: "https://www.figma.com/proto/zIYS9dwnUHgrBE04orOxi2/PORTFOLIO?node-id=0-1&t=5kHfSCjBqZsEg51V-1",
    },
}

// Ensure static generation
export const dynamic = 'force-static'
export const revalidate = false

export async function generateStaticParams() {
    return Object.keys(caseStudies).map((project) => ({
        project,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ project: string }> }) {
    const { project } = await params
    const study = caseStudies[project]
    if (!study) return { title: "Case Study Not Found" }

    return {
        title: `${study.title} | Case Study`,
        description: study.overview.substring(0, 160) + "...",
    }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ project: string }> }) {
    const { project } = await params
    const study = caseStudies[project]

    if (!study) {
        notFound()
    }

    return (
        <main className="relative bg-gray-500 overflow-hidden">
            <CursorFollower />
            <BackgroundEffects />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
            <AnimatedSections>
                {/* Hero Image */}
                <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                    <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-500 via-gray-500/50 to-transparent" />

                    {/* Back Link */}
                    <Link
                        href="/case-studies"
                        className="absolute top-24 left-8 md:left-16 inline-flex items-center gap-2 text-sm font-mono opacity-60 hover:opacity-100 transition-opacity z-20"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Case Studies
                    </Link>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10">
                        <span className="text-xs font-mono uppercase tracking-widest text-white/60 mb-2 block">
                            {study.subtitle}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                            {study.title}
                        </h1>
                    </div>
                </section>

                {/* Content */}
                <section className="p-8 md:p-16 relative z-10">
                    <div className="max-w-4xl mx-auto space-y-16">
                        {/* Overview */}
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 gradient-text">Overview</h2>
                            <p className="text-lg leading-relaxed opacity-80">{study.overview}</p>
                            {study.liveUrl && (
                                <a
                                    href={study.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                                >
                                    <span className="text-sm font-mono uppercase tracking-wider">View Live Project</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                        </div>

                        {/* Challenge */}
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 gradient-text">The Challenge</h2>
                            <p className="text-lg leading-relaxed opacity-80">{study.challenge}</p>
                        </div>

                        {/* Solution */}
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 gradient-text">The Solution</h2>
                            <p className="text-lg leading-relaxed opacity-80">{study.solution}</p>
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 gradient-text">Tech Stack</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {study.techStack.map((tech) => (
                                    <div
                                        key={tech.name}
                                        className="bg-[#0a0a0a] border border-white/10 p-4 rounded-lg"
                                    >
                                        <span className="text-lg font-bold text-white">{tech.name}</span>
                                        <p className="text-sm opacity-60 mt-1">{tech.purpose}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Key Features */}
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 gradient-text">Key Features</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {study.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <span className="text-green-400 mt-1">✓</span>
                                        <span className="opacity-80">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Results */}
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 gradient-text">Results</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {study.results.map((result) => (
                                    <div
                                        key={result.metric}
                                        className="bg-[#0a0a0a] border border-white/10 p-6 rounded-lg text-center"
                                    >
                                        <span className="text-3xl font-black text-white block">{result.value}</span>
                                        <span className="text-xs font-mono uppercase tracking-wider opacity-60 mt-2 block">{result.metric}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Lessons Learned */}
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 gradient-text">Lessons Learned</h2>
                            <ul className="space-y-4">
                                {study.lessons.map((lesson, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <span className="text-2xl font-black opacity-20">{index + 1}</span>
                                        <p className="text-lg opacity-80 pt-1">{lesson}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
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
