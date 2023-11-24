'use client' // Error components must be Client Components

import Card from '@/components/Card'
import { useEffect } from 'react'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="mt-16">
      <Card>
        <div className="m-8">
          <p className="text-base font-semibold leading-8 text-primary-600">Sorry</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Something Went Wrong
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            We've been alerted to the problem but if it persists please
            <a href="/support" className="font-semibold leading-7 text-primary-600">
              {' '}
              contact us
            </a>
          </p>
          <div className="mt-10">
            <a href="/" className="text-sm font-semibold leading-7 text-primary-600">
              <span aria-hidden="true">&larr;</span> Back to home
            </a>
          </div>
        </div>
      </Card>
    </div>
  )
}
