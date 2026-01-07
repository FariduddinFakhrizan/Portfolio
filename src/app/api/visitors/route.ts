import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Get visitor count from database
export async function GET() {
  try {
    const count = await prisma.visitor.count()

    console.log(`[GET /api/visitors] Retrieved count: ${count}`)
    return NextResponse.json({
      count,
      success: true
    })
  } catch (error) {
    console.error("[GET /api/visitors] Error fetching visitor count:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"

    return NextResponse.json(
      {
        count: 0,
        error: "Failed to fetch count",
        fallback: true,
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 200 } // Return 200 with fallback count
    )
  }
}

// Track a new visitor
export async function POST(request: Request) {
  try {
    // Get IP address for logging
    const forwarded = request.headers.get("x-forwarded-for")
    const ipAddress = forwarded ? forwarded.split(",")[0].trim() :
      request.headers.get("x-real-ip") ||
      request.headers.get("cf-connecting-ip") ||
      "unknown"

    const userAgent = request.headers.get("user-agent") || "unknown"

    console.log(`[POST /api/visitors] Tracking visitor - IP: ${ipAddress.substring(0, 20)}...`)

    // Create a new visitor record
    await prisma.visitor.create({
      data: {
        ipAddress: ipAddress.substring(0, 100), // Limit length
        userAgent: userAgent.substring(0, 500), // Limit length
      }
    })

    // Get the new count
    const count = await prisma.visitor.count()

    console.log(`[POST /api/visitors] Visitor tracked. New count: ${count}`)
    return NextResponse.json({
      count,
      success: true
    })
  } catch (error) {
    console.error("[POST /api/visitors] Error tracking visitor:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"

    // Try to get current count as fallback
    try {
      const count = await prisma.visitor.count()
      return NextResponse.json({
        count,
        success: false,
        error: "Failed to track but got count",
        fallback: true,
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      })
    } catch (countError) {
      console.error("[POST /api/visitors] Fallback count also failed:", countError)
    }

    return NextResponse.json(
      {
        count: 0,
        success: false,
        error: "Failed to track visitor",
        fallback: true,
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 200 } // Return 200 with fallback
    )
  }
}
