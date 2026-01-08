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

// POST: Toggle reaction on entry
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        if (!prisma) {
            return NextResponse.json(
                { error: 'Database not available' },
                { status: 503 }
            )
        }

        const { id } = await params
        const entryId = parseInt(id)

        if (isNaN(entryId)) {
            return NextResponse.json(
                { error: 'Invalid entry ID' },
                { status: 400 }
            )
        }

        const body = await request.json()
        const { emoji } = body

        // Validate emoji
        const allowedEmojis = ['👍', '❤️', '🎉', '🚀', '💯', '🔥']
        if (!emoji || !allowedEmojis.includes(emoji)) {
            return NextResponse.json(
                { error: 'Invalid emoji' },
                { status: 400 }
            )
        }

        const ipAddress = getClientIp(request)

        // Check if entry exists
        const entry = await prisma.guestbookEntry.findUnique({
            where: { id: entryId },
        })

        if (!entry) {
            return NextResponse.json(
                { error: 'Entry not found' },
                { status: 404 }
            )
        }

        // Check if reaction already exists
        const existingReaction = await prisma.guestbookReaction.findUnique({
            where: {
                entryId_ipAddress_emoji: {
                    entryId,
                    ipAddress,
                    emoji,
                },
            },
        })

        if (existingReaction) {
            // Remove reaction (toggle off)
            await prisma.guestbookReaction.delete({
                where: { id: existingReaction.id },
            })

            return NextResponse.json({ action: 'removed', emoji })
        } else {
            // Add reaction (toggle on)
            await prisma.guestbookReaction.create({
                data: {
                    emoji,
                    entryId,
                    ipAddress,
                },
            })

            return NextResponse.json({ action: 'added', emoji })
        }
    } catch (error) {
        console.error('Error toggling reaction:', error)
        return NextResponse.json(
            { error: 'Failed to toggle reaction' },
            { status: 500 }
        )
    }
}
