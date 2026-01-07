import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Simple counter using a special "download" visitor entry
const DOWNLOAD_KEY = "resume-download-counter"

// Get download count
export async function GET() {
    try {
        if (!prisma) {
            return NextResponse.json({ count: 0, success: false }, { status: 200 })
        }

        const count = await prisma.visitor.count({
            where: {
                userAgent: DOWNLOAD_KEY
            }
        })

        return NextResponse.json({ count, success: true })
    } catch (error) {
        console.error("[GET /api/resume-downloads] Error:", error)
        return NextResponse.json({ count: 0, success: false }, { status: 200 })
    }
}

// Track a download
export async function POST() {
    try {
        if (!prisma) {
            return NextResponse.json({ count: 0, success: false }, { status: 200 })
        }

        await prisma.visitor.create({
            data: {
                ipAddress: "download",
                userAgent: DOWNLOAD_KEY,
            }
        })

        const count = await prisma.visitor.count({
            where: {
                userAgent: DOWNLOAD_KEY
            }
        })

        return NextResponse.json({ count, success: true })
    } catch (error) {
        console.error("[POST /api/resume-downloads] Error:", error)
        return NextResponse.json({ count: 0, success: false }, { status: 200 })
    }
}
