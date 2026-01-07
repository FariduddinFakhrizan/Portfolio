import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

// Database migration endpoint - runs Prisma db push
export async function POST(request: Request) {
  try {
    // Check authorization (optional - you can add API key check here)
    const authHeader = request.headers.get("authorization")
    const apiKey = request.headers.get("x-api-key")
    
    // Allow if API key matches or in development
    const isAuthorized = 
      apiKey === process.env.API_KEY || 
      authHeader === `Bearer ${process.env.API_KEY}` ||
      process.env.NODE_ENV === "development"

    if (!isAuthorized && process.env.API_KEY) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "DATABASE_URL not configured" },
        { status: 503 }
      )
    }

    if (!prisma) {
      return NextResponse.json(
        { error: "Prisma client not initialized" },
        { status: 503 }
      )
    }

    // Run Prisma db push to sync schema
    const { execSync } = require('child_process')
    
    try {
      execSync('npx prisma db push --skip-generate', {
        stdio: 'inherit',
        env: {
          ...process.env,
          DATABASE_URL: process.env.DATABASE_URL,
        }
      })

      return NextResponse.json({
        success: true,
        message: "Database schema pushed successfully"
      })
    } catch (pushError: any) {
      console.error('Prisma db push error:', pushError)
      return NextResponse.json(
        {
          error: "Failed to push schema",
          details: process.env.NODE_ENV === "development" ? pushError.message : undefined
        },
        { status: 500 }
      )
    }
  } catch (error: unknown) {
    console.error("Migration error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    
    return NextResponse.json(
      {
        error: "Migration failed",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}
