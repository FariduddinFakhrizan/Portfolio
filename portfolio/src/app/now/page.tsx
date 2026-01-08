import AnimatedSections from "@/components/AnimatedSections"
import BackgroundEffects from "@/components/BackgroundEffects"
import CursorFollower from "@/components/CursorFollower"
import DragFollowText from "@/components/DragFollowText"

export const metadata = {
    title: "Now",
    description: "What Fariduddin Fakhrizan is currently working on, learning, and focusing on.",
}

// Ensure this page is included in the build as static
export const dynamic = 'force-static'
export const revalidate = false

export default function NowPage() {
    return (
        <main className="relative bg-gray-500 overflow-hidden">
            <CursorFollower />
            <BackgroundEffects />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
            
            <AnimatedSections>
                <section className="relative min-h-screen flex flex-col items-center justify-center p-8">
                    <div className="max-w-4xl w-full space-y-12">
                        <DragFollowText 
                            className="text-8xl md:text-9xl font-black text-white/10 select-none"
                        >
                            NOW
                        </DragFollowText>
                        
                        <div className="space-y-8 text-white/90">
                            <div>
                                <h2 className="text-2xl font-bold mb-4 font-mono uppercase tracking-wider">Currently Working On</h2>
                                <ul className="space-y-3 list-disc list-inside ml-4">
                                    <li>Building scalable web applications with Next.js and Laravel</li>
                                    <li>Implementing cloud infrastructure solutions on AWS</li>
                                    <li>Contributing to open-source projects</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 font-mono uppercase tracking-wider">Learning</h2>
                                <ul className="space-y-3 list-disc list-inside ml-4">
                                    <li>Advanced TypeScript patterns and best practices</li>
                                    <li>Serverless architecture and edge computing</li>
                                    <li>Performance optimization techniques</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 font-mono uppercase tracking-wider">Focusing On</h2>
                                <ul className="space-y-3 list-disc list-inside ml-4">
                                    <li>Writing clean, maintainable code</li>
                                    <li>Building user-centric products</li>
                                    <li>Continuous learning and growth</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSections>
        </main>
    )
}
