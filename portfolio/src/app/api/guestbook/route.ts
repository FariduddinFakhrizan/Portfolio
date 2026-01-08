import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Helper function to get client IP
function getClientIp(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')

    if (forwarded) {
        return forwarded.split(',')[0].trim()
    }

    if (realIp) {
        return realIp
    }

    return 'unknown'
}

// GET: Fetch all guestbook entries with reactions
export async function GET() {
    try {
        if (!prisma) {
            return NextResponse.json(
                { error: 'Database not available' },
                { status: 503 }
            )
        }

        const entries = await prisma.guestbookEntry.findMany({
            include: {
                reactions: {
                    select: {
                        emoji: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        // Count reactions by emoji for each entry
        const entriesWithReactionCounts = entries.map(entry => {
            const reactionCounts: Record<string, number> = {}

            entry.reactions.forEach(reaction => {
                reactionCounts[reaction.emoji] = (reactionCounts[reaction.emoji] || 0) + 1
            })

            return {
                id: entry.id,
                name: entry.name,
                message: entry.message,
                createdAt: entry.createdAt,
                reactions: reactionCounts,
            }
        })

        return NextResponse.json(entriesWithReactionCounts)
    } catch (error) {
        console.error('Error fetching guestbook entries:', error)
        return NextResponse.json(
            { error: 'Failed to fetch guestbook entries' },
            { status: 500 }
        )
    }
}

// POST: Create new guestbook entry
export async function POST(request: NextRequest) {
    try {
        if (!prisma) {
            return NextResponse.json(
                { error: 'Database not available' },
                { status: 503 }
            )
        }

        const body = await request.json()
        const { name, message, email } = body

        // Validation
        if (!name || !message) {
            return NextResponse.json(
                { error: 'Name and message are required' },
                { status: 400 }
            )
        }

        if (name.length > 100) {
            return NextResponse.json(
                { error: 'Name must be 100 characters or less' },
                { status: 400 }
            )
        }

        if (message.length > 500) {
            return NextResponse.json(
                { error: 'Message must be 500 characters or less' },
                { status: 400 }
            )
        }

        const ipAddress = getClientIp(request)

        // Rate limiting: Check if user has posted in the last 5 minutes
        const recentEntry = await prisma.guestbookEntry.findFirst({
            where: {
                ipAddress,
                createdAt: {
                    gte: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
                },
            },
        })

        if (recentEntry) {
            return NextResponse.json(
                { error: 'Please wait a few minutes before posting again' },
                { status: 429 }
            )
        }

        // Create entry
        const entry = await prisma.guestbookEntry.create({
            data: {
                name: name.trim(),
                message: message.trim(),
                email: email?.trim() || null,
                ipAddress,
            },
        })

        return NextResponse.json(
            {
                id: entry.id,
                name: entry.name,
                message: entry.message,
                createdAt: entry.createdAt,
                reactions: {},
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Error creating guestbook entry:', error)
        return NextResponse.json(
            { error: 'Failed to create guestbook entry' },
            { status: 500 }
        )
    }
}
