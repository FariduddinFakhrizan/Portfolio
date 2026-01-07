import AnimatedSections from "@/components/AnimatedSections"
import BackgroundEffects from "@/components/BackgroundEffects"
import CursorFollower from "@/components/CursorFollower"
import DragFollowText from "@/components/DragFollowText"

export const metadata = {
    title: "Now",
    description: "What Fariduddin Fakhrizan is currently working on, learning, and focusing on.",
}

// Ensure this page is included in the build
export const dynamic = 'force-static'
export const revalidate = false

export default function NowPage() {
    return (
        <main className="relative bg-gray-500 overflow-hidden">
            <CursorFollower />
            <BackgroundEffects />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
            <AnimatedSections>
                <section className="min-h-screen flex flex-col justify-center p-8 md:p-16 border-b border-white/10 relative z-10 pt-32">
                    <div className="flex justify-between items-baseline mb-12 relative z-10">
                        <span className="text-[10px] font-mono opacity-50 tracking-widest">UPDATED JANUARY 2026</span>
                        <DragFollowText as="h1" className="text-4xl md:text-5xl font-black uppercase italic text-white" intensity={0.2}>
                            Now
                        </DragFollowText>
                    </div>

                    <div className="max-w-3xl space-y-12 relative z-10">
                        {/* Availability Status */}
                        <div className="group relative bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 p-6 md:p-8 rounded-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-sm font-mono uppercase tracking-widest text-green-400">Available for Opportunities</span>
                            </div>
                            <p className="text-lg opacity-80">
                                I'm currently open to full-time positions and freelance projects in full-stack development and cloud engineering.
                            </p>
                        </div>

                        {/* Currently Working On */}
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 gradient-text">
                                🔨 Currently Building
                            </h2>
                            <div className="space-y-4">
                                <div className="group relative bg-[#0a0a0a] border border-white/10 p-6 rounded-lg hover:border-white/20 transition-all duration-500">
                                    <h3 className="text-xl font-bold text-white mb-2">Portfolio Enhancements</h3>
                                    <p className="text-base opacity-70">Adding interactive features, case studies, and a blog to showcase my work and thought leadership.</p>
                                </div>
                                <div className="group relative bg-[#0a0a0a] border border-white/10 p-6 rounded-lg hover:border-white/20 transition-all duration-500">
                                    <h3 className="text-xl font-bold text-white mb-2">REACH Journal Hub Maintenance</h3>
                                    <p className="text-base opacity-70">Ongoing improvements and feature additions to the academic publishing platform.</p>
                                </div>
                            </div>
                        </div>

                        {/* Learning */}
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 gradient-text">
                                📚 Currently Learning
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {['Next.js 16 App Router', 'AWS Solutions Architect', 'System Design', 'Three.js'].map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 border border-white/20 text-sm font-mono opacity-70 hover:opacity-100 hover:border-white/40 transition-all duration-300 rounded-lg"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Reading */}
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 gradient-text">
                                📖 Currently Reading
                            </h2>
                            <div className="group relative bg-[#0a0a0a] border border-white/10 p-6 rounded-lg">
                                <p className="text-lg text-white">"Designing Data-Intensive Applications"</p>
                                <p className="text-sm opacity-60 mt-1">by Martin Kleppmann</p>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="pt-8 border-t border-white/10">
                            <p className="text-sm font-mono opacity-50">
                                📍 Based in Kuala Lumpur, Malaysia • Open to remote work worldwide
                            </p>
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
