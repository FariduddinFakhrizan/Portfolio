import AnimatedSections from "@/components/AnimatedSections"
import BackgroundEffects from "@/components/BackgroundEffects"
import CursorFollower from "@/components/CursorFollower"
import DragFollowText from "@/components/DragFollowText"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
    title: "Case Studies",
    description: "In-depth breakdowns of Fariduddin Fakhrizan's key projects.",
}

// Ensure this page is included in the build
export const dynamic = 'force-static'
export const revalidate = false

// Generate static params to ensure page is built
export async function generateStaticParams() {
  return []
}

const caseStudies = [
    {
        slug: "reach-journal-hub",
        title: "REACH Journal Hub",
        subtitle: "Academic Publishing Platform",
        description: "A globally recognized, open-access knowledge ecosystem for peer-reviewed journals and research collaboration.",
        image: "/Reach.png",
        tech: ["Laravel 12", "Vue.js 3", "PostgreSQL", "Redis"],
        impact: ["10+ journals hosted", "Multi-language support", "Complex peer review workflow"],
    },
    {
        slug: "iiihws-healthcare",
        title: "IIIHWS Portal",
        subtitle: "Integrative Healthcare Platform",
        description: "World-class institutional portal bridging modern medical advances with traditional wellness practices.",
        image: "/IIIHWS.png",
        tech: ["Next.js", "Tailwind CSS", "Figma", "Mobile-first"],
        impact: ["WHO/UN SDG aligned", "Multi-division structure", "Accessibility compliant"],
    },
    {
        slug: "klibs-portal",
        title: "KLIBS Portal",
        subtitle: "Learning Management System",
        description: "Comprehensive LMS in high-fidelity prototyping phase with 15+ screens covering complete user journey.",
        image: "/Hero.png",
        tech: ["Figma", "UI/UX Design", "Prototyping", "Design System"],
        impact: ["15+ screen designs", "Complete user journey", "Ready for development"],
    },
]

export default function CaseStudiesPage() {
    return (
        <main className="relative bg-gray-500 overflow-hidden">
            <CursorFollower />
            <BackgroundEffects />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
            <AnimatedSections>
                <section className="min-h-screen flex flex-col justify-center p-8 md:p-16 border-b border-white/10 relative z-10 pt-32">
                    <div className="flex justify-between items-baseline mb-12 relative z-10">
                        <span className="text-[10px] font-mono opacity-50 tracking-widest">IN-DEPTH ANALYSIS</span>
                        <DragFollowText as="h1" className="text-4xl md:text-5xl font-black uppercase italic text-white" intensity={0.2}>
                            Case Studies
                        </DragFollowText>
                    </div>

                    <div className="space-y-12 relative z-10">
                        {caseStudies.map((study, index) => (
                            <Link
                                key={study.slug}
                                href={`/case-studies/${study.slug}`}
                                className="group block relative overflow-hidden rounded-lg"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-500">
                                    {/* Image */}
                                    <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                        <Image
                                            src={study.image}
                                            alt={study.title}
                                            fill
                                            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <span className="text-xs font-mono uppercase tracking-widest text-white/50 mb-2">
                                            {study.subtitle}
                                        </span>
                                        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4 text-white group-hover:text-white/90">
                                            {study.title}
                                        </h2>
                                        <p className="text-base md:text-lg opacity-70 mb-6 leading-relaxed">
                                            {study.description}
                                        </p>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {study.tech.map((t) => (
                                                <span
                                                    key={t}
                                                    className="px-3 py-1 text-xs font-mono bg-white/10 rounded-full"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Impact */}
                                        <div className="flex flex-wrap gap-4 text-sm opacity-60">
                                            {study.impact.map((i) => (
                                                <span key={i} className="flex items-center gap-1">
                                                    <span className="text-green-400">✓</span> {i}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <div className="mt-8 flex items-center gap-2 text-sm font-mono uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                                            View Case Study
                                            <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
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
