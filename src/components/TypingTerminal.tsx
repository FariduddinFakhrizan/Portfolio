'use client'

import { useState, useEffect } from 'react'

interface TypingTerminalProps {
    className?: string
}

const commands = [
    { prompt: '> whoami', output: 'Fariduddin Fakhrizan' },
    { prompt: '> cat role.txt', output: 'Full-Stack Developer & Cloud Engineer' },
    { prompt: '> ls skills/', output: 'Laravel  Next.js  React  AWS  TypeScript  Figma' },
    { prompt: '> echo $STATUS', output: '✓ Available for opportunities' },
]

export default function TypingTerminal({ className = '' }: TypingTerminalProps) {
    const [currentCommand, setCurrentCommand] = useState(0)
    const [displayedPrompt, setDisplayedPrompt] = useState('')
    const [displayedOutput, setDisplayedOutput] = useState('')
    const [showCursor, setShowCursor] = useState(true)
    const [phase, setPhase] = useState<'prompt' | 'output' | 'pause'>('prompt')

    // Cursor blink effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev)
        }, 530)
        return () => clearInterval(cursorInterval)
    }, [])

    // Typing animation
    useEffect(() => {
        const cmd = commands[currentCommand]

        if (phase === 'prompt') {
            if (displayedPrompt.length < cmd.prompt.length) {
                const timeout = setTimeout(() => {
                    setDisplayedPrompt(cmd.prompt.slice(0, displayedPrompt.length + 1))
                }, 50 + Math.random() * 50)
                return () => clearTimeout(timeout)
            } else {
                // Prompt complete, show output
                const timeout = setTimeout(() => {
                    setPhase('output')
                }, 300)
                return () => clearTimeout(timeout)
            }
        }

        if (phase === 'output') {
            if (displayedOutput.length < cmd.output.length) {
                const timeout = setTimeout(() => {
                    setDisplayedOutput(cmd.output.slice(0, displayedOutput.length + 1))
                }, 20 + Math.random() * 30)
                return () => clearTimeout(timeout)
            } else {
                // Output complete, pause then move to next
                const timeout = setTimeout(() => {
                    setPhase('pause')
                }, 1500)
                return () => clearTimeout(timeout)
            }
        }

        if (phase === 'pause') {
            const nextCommand = (currentCommand + 1) % commands.length
            const timeout = setTimeout(() => {
                setCurrentCommand(nextCommand)
                setDisplayedPrompt('')
                setDisplayedOutput('')
                setPhase('prompt')
            }, nextCommand === 0 ? 3000 : 500)
            return () => clearTimeout(timeout)
        }
    }, [phase, displayedPrompt, displayedOutput, currentCommand])

    return (
        <div className={`font-mono text-sm ${className}`}>
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-2 bg-black/60 rounded-t-lg border border-white/10 border-b-0">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] text-white/40 uppercase tracking-widest ml-2">terminal</span>
            </div>

            {/* Terminal Body */}
            <div className="bg-black/80 backdrop-blur-md rounded-b-lg border border-white/10 p-4 min-h-[140px]">
                {/* Previous commands (faded) */}
                {commands.slice(0, currentCommand).map((cmd, i) => (
                    <div key={i} className="mb-2 opacity-40">
                        <div className="text-green-400">{cmd.prompt}</div>
                        <div className="text-white/80 pl-2">{cmd.output}</div>
                    </div>
                ))}

                {/* Current command */}
                <div>
                    <div className="text-green-400">
                        {displayedPrompt}
                        {phase === 'prompt' && (
                            <span className={`inline-block w-2 h-4 bg-green-400 ml-0.5 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                        )}
                    </div>
                    {displayedOutput && (
                        <div className="text-white pl-2 mt-1">
                            {displayedOutput}
                            {phase === 'output' && displayedOutput.length < commands[currentCommand].output.length && (
                                <span className={`inline-block w-2 h-4 bg-white ml-0.5 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
