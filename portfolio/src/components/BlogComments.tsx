'use client'

import { useEffect, useRef } from 'react'

interface BlogCommentsProps {
    slug: string
    title: string
}

export default function BlogComments({ slug, title }: BlogCommentsProps) {
    const commentsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!commentsRef.current) return

        // Clear any existing giscus iframe
        commentsRef.current.innerHTML = ''

        // Create script element
        const script = document.createElement('script')
        script.src = 'https://giscus.app/client.js'
        script.async = true
        script.crossOrigin = 'anonymous'

        // Configure Giscus
        // TODO: Update these values with your actual repository details
        script.setAttribute('data-repo', 'FariduddinFakhrizan/Portfolio')
        script.setAttribute('data-repo-id', 'YOUR_REPO_ID') // Get this from giscus.app
        script.setAttribute('data-category', 'Blog Comments')
        script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID') // Get this from giscus.app
        script.setAttribute('data-mapping', 'specific')
        script.setAttribute('data-term', slug)
        script.setAttribute('data-strict', '0')
        script.setAttribute('data-reactions-enabled', '1')
        script.setAttribute('data-emit-metadata', '0')
        script.setAttribute('data-input-position', 'top')
        script.setAttribute('data-theme', 'transparent_dark')
        script.setAttribute('data-lang', 'en')
        script.setAttribute('data-loading', 'lazy')

        commentsRef.current.appendChild(script)

        return () => {
            // Cleanup
            if (commentsRef.current) {
                commentsRef.current.innerHTML = ''
            }
        }
    }, [slug])

    return (
        <div className="mt-16 pt-16 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Comments</h2>
            <div ref={commentsRef} className="giscus-container" />

            <style jsx global>{`
        .giscus {
          color-scheme: dark;
        }
        .giscus-frame {
          width: 100%;
          border: none;
        }
      `}</style>
        </div>
    )
}
