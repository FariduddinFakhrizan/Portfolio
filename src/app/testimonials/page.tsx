import AnimatedSections from "@/components/AnimatedSections"
import BackgroundEffects from "@/components/BackgroundEffects"
import CursorFollower from "@/components/CursorFollower"
import DragFollowText from "@/components/DragFollowText"

export const metadata = {
    title: "Testimonials",
    description: "What colleagues and managers say about working with Fariduddin Fakhrizan.",
}

// Ensure this page is included in the build
export const dynamic = 'force-static'
export const revalidate = false

const testimonials = [
    {
        quote: "Fariduddin's technical expertise and attention to detail made him invaluable to the REACH Hub project. His ability to translate complex requirements into elegant solutions is remarkable.",
        author: "Project Manager",
        role: "REACH Journal Hub",
        avatar: "PM",
    },
    {
        quote: "Working with Fariduddin was a pleasure. He consistently delivered high-quality work under tight deadlines and brought innovative ideas to improve our healthcare portal.",
        author: "Team Lead",
        role: "IIIHWS Project",
        avatar: "TL",
    },
    {
        quote: "His understanding of both frontend and backend technologies, combined with his UI/UX sensibilities, makes him a rare full-stack talent.",
        author: "Senior Developer",
        role: "Olympia Education",
        avatar: "SD",
    },
    {
        quote: "Fariduddin demonstrated exceptional problem-solving skills and took ownership of critical features. His code quality and documentation are exemplary.",
        author: "Technical Advisor",
        role: "Academic Projects",
        avatar: "TA",
    },
]

export default function TestimonialsPage() {
    return (
        <main className="relative bg-gray-500 overflow-hidden">
            <CursorFollower />
            <BackgroundEffects />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
            <AnimatedSections>
                <section className="min-h-screen flex flex-col justify-center p-8 md:p-16 border-b border-white/10 relative z-10 pt-32">
                    <div className="flex justify-between items-baseline mb-12 relative z-10">
                        <span className="text-[10px] font-mono opacity-50 tracking-widest">WHAT THEY SAY</span>
                        <DragFollowText as="h1" className="text-4xl md:text-5xl font-black uppercase italic text-white" intensity={0.2}>
                            Testimonials
                        </DragFollowText>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="group relative bg-[#0a0a0a] border border-white/10 p-8 rounded-lg hover:border-white/20 transition-all duration-500 hover:translate-y-[-4px]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg" />

                                {/* Quote Mark */}
                                <div className="absolute top-4 right-4 text-6xl font-serif opacity-10 text-white">"</div>

                                <div className="relative z-10">
                                    {/* Quote */}
                                    <p className="text-lg leading-relaxed opacity-80 mb-6 italic">
                                        "{testimonial.quote}"
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">{testimonial.author}</p>
                                            <p className="text-sm opacity-60">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Voice Notes Section - Placeholder */}
                    <div className="mt-16 relative z-10">
                        <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 gradient-text">
                            🎤 Voice Notes
                        </h2>
                        <p className="text-base opacity-60 mb-6">
                            Hear directly from colleagues about their experience working with me.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-lg text-center opacity-50">
                                <span className="text-4xl mb-2 block">🎙️</span>
                                <p className="text-sm font-mono">Voice notes coming soon...</p>
                            </div>
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
