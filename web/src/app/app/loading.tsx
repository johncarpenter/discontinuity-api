import Container from '@/components/Container'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

export default function Loading() {
  return (
    <Container>
      <div>
        <div>
          <nav className="hidden sm:flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <div className="flex">
                  <div className="h-5 w-12 animate-pulse rounded bg-gray-400" />
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="mt-2 md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <div className="h-8 w-full animate-pulse rounded bg-gray-400" />
          </div>
        </div>
      </div>
    </Container>
  )
}
