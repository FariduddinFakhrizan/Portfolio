import { notFound } from 'next/navigation'

// Catch-all route to handle 404s gracefully
export default function CatchAllPage() {
  notFound()
}
