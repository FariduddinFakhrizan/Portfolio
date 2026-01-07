import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

// Complete database initialization endpoint - creates schema and seeds data
export async function POST(request: Request) {
  try {
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

    const results: Record<string, any> = {
      timestamp: new Date().toISOString(),
      steps: []
    }

    try {
      // Step 1: Test connection
      results.steps.push({ step: "Connection Test", status: "starting" })
      await prisma.$connect()
      results.steps.push({ step: "Connection Test", status: "success" })

      // Step 2: Create ProjectType enum if it doesn't exist
      results.steps.push({ step: "Create ProjectType Enum", status: "starting" })
      try {
        await prisma.$executeRawUnsafe(`
          DO $$ BEGIN
            CREATE TYPE "ProjectType" AS ENUM ('DEVELOPMENT', 'DESIGN');
          EXCEPTION
            WHEN duplicate_object THEN null;
          END $$;
        `)
        results.steps.push({ step: "Create ProjectType Enum", status: "success" })
      } catch (enumError: any) {
        // Enum might already exist or not supported - continue
        results.steps.push({ step: "Create ProjectType Enum", status: "skipped", note: enumError.message })
      }

      // Step 3: Create Project table
      results.steps.push({ step: "Create Project Table", status: "starting" })
      try {
        await prisma.$executeRawUnsafe(`
          CREATE TABLE IF NOT EXISTS "Project" (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            image TEXT,
            link TEXT,
            index INTEGER DEFAULT 0,
            type VARCHAR(20) DEFAULT 'DEVELOPMENT',
            "createdAt" TIMESTAMP DEFAULT NOW(),
            "updatedAt" TIMESTAMP DEFAULT NOW()
          )
        `)
        results.steps.push({ step: "Create Project Table", status: "success" })
      } catch (tableError: any) {
        if (tableError?.message?.includes('already exists')) {
          results.steps.push({ step: "Create Project Table", status: "exists" })
        } else {
          throw tableError
        }
      }

      // Step 4: Add type column if it doesn't exist (for existing tables)
      results.steps.push({ step: "Add Type Column", status: "starting" })
      try {
        await prisma.$executeRawUnsafe(`
          DO $$ 
          BEGIN
            IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns 
              WHERE table_name = 'Project' AND column_name = 'type'
            ) THEN
              ALTER TABLE "Project" ADD COLUMN type VARCHAR(20) DEFAULT 'DEVELOPMENT';
            END IF;
          END $$;
        `)
        results.steps.push({ step: "Add Type Column", status: "success" })
      } catch (colError: any) {
        results.steps.push({ step: "Add Type Column", status: "skipped", note: colError.message })
      }

      // Step 5: Clear existing projects
      results.steps.push({ step: "Clear Existing Projects", status: "starting" })
      try {
        await prisma.$executeRawUnsafe('DELETE FROM "Project"')
        results.steps.push({ step: "Clear Existing Projects", status: "success" })
      } catch (deleteError: any) {
        results.steps.push({ step: "Clear Existing Projects", status: "skipped", note: deleteError.message })
      }

      // Step 6: Seed projects
      results.steps.push({ step: "Seed Projects", status: "starting" })
      const projectsData = [
        {
          title: "REACH Journal Hub",
          description: "A globally recognized, open-access knowledge ecosystem. Engineered to host peer-reviewed journals, expert directories, and consultancy activities. Features a high-performance search engine for articles and researchers, a multilingual interface, and a 'Hub of Excellence' for academic collaboration. Tech Highlight: Built with Laravel 12 and Vue.js 3, featuring complex database relations and secure knowledge-sharing protocols.",
          image: "/Reach.png",
          link: "https://reach-hub.org/",
          index: 0,
          type: "DEVELOPMENT",
        },
        {
          title: "IIIHWS - Integrative Healthcare",
          description: "A world-class institutional portal for the International Institute of Integrative Healthcare and Wellness Sciences. Designed to bridge modern medical advances with traditional wisdom. Features include accredited program management (Diploma to Doctorate), a translational research ecosystem, and a national certification framework for wellness practitioners. Tech Highlight: Mobile-first responsive design using Tailwind CSS, focusing on accessibility and seamless academic navigation.",
          image: "/IIIHWS.png",
          link: "https://integrative-care.org/",
          index: 1,
          type: "DEVELOPMENT",
        },
        {
          title: "KLIBS Portal",
          description: "A comprehensive learning management system currently in high-fidelity prototyping phase. The design encompasses a complete user journey with 15+ screens including hero landing, secure authentication flows, course management, and community features. Built with modern UI/UX principles focusing on intuitive navigation and engaging user experience. Tech Highlight: Figma-based design system ready for Next.js implementation.",
          image: "/Hero.png",
          link: "https://www.figma.com/proto/zIYS9dwnUHgrBE04orOxi2/PORTFOLIO?node-id=0-1&t=5kHfSCjBqZsEg51V-1",
          index: 2,
          type: "DESIGN",
        },
      ]

      // Insert projects using Prisma createMany for better compatibility
      for (const project of projectsData) {
        try {
          await prisma.$executeRawUnsafe(
            `INSERT INTO "Project" (title, description, image, link, index, type, "createdAt", "updatedAt")
             VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())`,
            project.title,
            project.description,
            project.image,
            project.link,
            project.index,
            project.type
          )
        } catch (insertError: any) {
          // Try without type if it fails
          try {
            await prisma.$executeRawUnsafe(
              `INSERT INTO "Project" (title, description, image, link, index, "createdAt", "updatedAt")
               VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
              project.title,
              project.description,
              project.image,
              project.link,
              project.index
            )
          } catch (retryError: any) {
            console.error(`Failed to insert ${project.title}:`, retryError)
          }
        }
      }

      // Verify projects were created
      const projectCount = await prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
        'SELECT COUNT(*) as count FROM "Project"'
      )
      const count = Number(projectCount[0]?.count || 0)

      results.steps.push({ 
        step: "Seed Projects", 
        status: "success", 
        projectsCreated: count 
      })

      return NextResponse.json({
        success: true,
        message: "Database initialized and seeded successfully",
        projectsCreated: count,
        steps: results.steps,
        timestamp: results.timestamp
      }, { status: 200 })

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      console.error("Initialization error:", error)
      
      return NextResponse.json({
        success: false,
        error: "Initialization failed",
        details: errorMessage,
        steps: results.steps,
        timestamp: results.timestamp
      }, { status: 500 })
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    
    return NextResponse.json({
      error: "Failed to initialize database",
      details: errorMessage
    }, { status: 500 })
  }
}

// GET endpoint to check status
export async function GET() {
  try {
    if (!process.env.DATABASE_URL || !prisma) {
      return NextResponse.json({
        status: "not_configured",
        message: "DATABASE_URL not configured"
      }, { status: 503 })
    }

    try {
      await prisma.$connect()
      const projectCount = await prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
        'SELECT COUNT(*) as count FROM "Project"'
      )
      const count = Number(projectCount[0]?.count || 0)

      return NextResponse.json({
        status: "connected",
        projectsCount: count,
        databaseUrl: process.env.DATABASE_URL ? "Set" : "Not set"
      })
    } catch (error: unknown) {
      return NextResponse.json({
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error"
      }, { status: 500 })
    }
  } catch (error: unknown) {
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
