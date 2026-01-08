import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

// Database migration endpoint - initializes database schema
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

    // Use Prisma Client to push schema directly
    // Note: In production, you should use migrations instead
    try {
      // Test connection first
      await prisma.$connect()

      // Create tables if they don't exist using raw SQL
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "User" (
          id SERIAL PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          name TEXT,
          "createdAt" TIMESTAMP DEFAULT NOW(),
          "updatedAt" TIMESTAMP DEFAULT NOW()
        )
      `)

      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "Project" (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          image TEXT,
          link TEXT,
          index INTEGER DEFAULT 0,
          type TEXT DEFAULT 'DEVELOPMENT',
          "createdAt" TIMESTAMP DEFAULT NOW(),
          "updatedAt" TIMESTAMP DEFAULT NOW()
        )
      `)

      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "Visitor" (
          id SERIAL PRIMARY KEY,
          "ipAddress" TEXT,
          "userAgent" TEXT,
          "visitedAt" TIMESTAMP DEFAULT NOW(),
          "createdAt" TIMESTAMP DEFAULT NOW()
        )
      `)

      // Guestbook tables
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "GuestbookEntry" (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          message TEXT NOT NULL,
          email TEXT,
          "ipAddress" TEXT,
          "createdAt" TIMESTAMP DEFAULT NOW()
        )
      `)

      await prisma.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS "GuestbookEntry_createdAt_idx" 
        ON "GuestbookEntry"("createdAt")
      `)

      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "GuestbookReaction" (
          id SERIAL PRIMARY KEY,
          emoji TEXT NOT NULL,
          "entryId" INTEGER NOT NULL,
          "ipAddress" TEXT NOT NULL,
          "createdAt" TIMESTAMP DEFAULT NOW(),
          CONSTRAINT "GuestbookReaction_entryId_fkey" 
            FOREIGN KEY ("entryId") 
            REFERENCES "GuestbookEntry"(id) 
            ON DELETE CASCADE,
          CONSTRAINT "GuestbookReaction_entryId_ipAddress_emoji_key" 
            UNIQUE ("entryId", "ipAddress", emoji)
        )
      `)

      await prisma.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS "GuestbookReaction_entryId_idx" 
        ON "GuestbookReaction"("entryId")
      `)

      // Playground table
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "Playground" (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          "embedUrl" TEXT NOT NULL,
          platform TEXT NOT NULL,
          tags TEXT[] DEFAULT '{}',
          "createdAt" TIMESTAMP DEFAULT NOW(),
          "updatedAt" TIMESTAMP DEFAULT NOW()
        )
      `)

      await prisma.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS "Playground_createdAt_idx" 
        ON "Playground"("createdAt")
      `)

      // Create enum type if it doesn't exist
      await prisma.$executeRawUnsafe(`
        DO $$ BEGIN
          CREATE TYPE "ProjectType" AS ENUM ('DEVELOPMENT', 'DESIGN');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `)

      return NextResponse.json({
        success: true,
        message: "Database schema initialized successfully",
        tables: ["User", "Project", "Visitor", "GuestbookEntry", "GuestbookReaction", "Playground"]
      })
    } catch (schemaError: any) {
      console.error('Schema creation error:', schemaError)
      return NextResponse.json(
        {
          error: "Failed to initialize schema",
          details: process.env.NODE_ENV === "development" ? schemaError.message : undefined
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
