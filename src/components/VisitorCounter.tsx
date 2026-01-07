"use client"

import { useEffect, useState } from "react"

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const trackAndFetchVisitor = async () => {
      try {
        // Track this visitor
        const trackResponse = await fetch("/api/visitors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        })

        if (trackResponse.ok) {
          const trackData = await trackResponse.json()
          const apiCount = trackData.count || 0
          setCount(apiCount)
          console.log("Visitor tracked, count:", apiCount)
        } else {
          // If tracking fails, just get the count
          const getResponse = await fetch("/api/visitors", {
            cache: "no-store",
          })
          if (getResponse.ok) {
            const getData = await getResponse.json()
            setCount(getData.count || 0)
          } else {
            setCount(0)
          }
        }
      } catch (error) {
        console.error("Error tracking visitor:", error)
        // Try to just get the count
        try {
          const getResponse = await fetch("/api/visitors", {
            cache: "no-store",
          })
          if (getResponse.ok) {
            const getData = await getResponse.json()
            setCount(getData.count || 0)
          } else {
            setCount(0)
          }
        } catch {
          setCount(0)
        }
      } finally {
        setIsLoading(false)
      }
    }

    trackAndFetchVisitor()
  }, [])

  if (isLoading) {
    return (
      <div className="reveal-up">
        <span className="text-[10px] font-mono opacity-40 mb-2 tracking-widest">
          VISITOR COUNT
        </span>
        <div className="text-2xl md:text-4xl font-mono opacity-70">
          <span className="inline-block w-16 h-8 bg-white/10 animate-pulse"></span>
        </div>
      </div>
    )
  }

  return (
    <div className="reveal-up">
      <span className="text-[10px] font-mono opacity-40 mb-2 tracking-widest block">
        VISITOR COUNT
      </span>
      <div className="text-2xl md:text-4xl font-mono font-bold text-white">
        {count !== null ? count.toLocaleString() : "0"}
      </div>
      <p className="text-xs font-mono opacity-30 mt-2 tracking-wider">
        Total page visits
      </p>
    </div>
  )
}
