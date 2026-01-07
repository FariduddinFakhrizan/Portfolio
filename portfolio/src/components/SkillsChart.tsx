'use client'

interface SkillsChartProps {
    className?: string
}

const skills = [
    { name: 'Laravel', level: 90, category: 'Backend' },
    { name: 'Next.js', level: 85, category: 'Frontend' },
    { name: 'React', level: 85, category: 'Frontend' },
    { name: 'TypeScript', level: 80, category: 'Languages' },
    { name: 'PostgreSQL', level: 75, category: 'Database' },
    { name: 'AWS', level: 70, category: 'Cloud' },
    { name: 'Figma', level: 85, category: 'Design' },
    { name: 'Tailwind CSS', level: 90, category: 'Frontend' },
]

export default function SkillsChart({ className = '' }: SkillsChartProps) {
    return (
        <div className={`space-y-4 ${className}`}>
            {skills.map((skill) => (
                <div key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-mono uppercase tracking-wider text-white">
                            {skill.name}
                        </span>
                        <span className="text-xs font-mono opacity-60">
                            {skill.level}%
                        </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-white/80 to-white/60 rounded-full transition-all duration-1000 ease-out group-hover:from-white group-hover:to-white/80"
                            style={{ width: `${skill.level}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}
