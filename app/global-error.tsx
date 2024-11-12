'use client' // Error boundaries must be Client Components
 import EventNotFound from '@/app/not-found'
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <EventNotFound />
        {/* <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button> */}
      </body>
    </html>
  )
}