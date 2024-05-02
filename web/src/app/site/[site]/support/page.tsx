import Card from '@/components/Card'
import LicenseCard from '@/components/LicenseCard'
import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { BugAntIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

export default function SupportPage() {
  return (
    <Container>
      <PageHeader title="Support" breadcrumbs={[]} />
      <LicenseCard />
      <Card>
        <Card.Title title="Contact Support" subtitle="Get help with your account" />
        <div className="isolate  px-6 py-8 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-lg space-y-16">
            <div className="flex gap-x-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-600">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-semibold leading-7 text-normal">
                  Email priority support
                </h3>
                <p className="mt-2 leading-7 text-lighter">
                  For customers with active licenses, we offer email support with a 24 hour response
                </p>
                <p className="mt-4">
                  <a
                    href="mailto:support@discontinuity.ai"
                    className="text-sm font-semibold leading-6 text-primary-600"
                  >
                    Contact us <span aria-hidden="true">&rarr;</span>
                  </a>
                </p>
              </div>
            </div>
            <div className="flex gap-x-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-600">
                <BugAntIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-semibold leading-7 text-normal">Sales support</h3>
                <p className="mt-2 leading-7 text-lighter">
                  Do you want to learn more about our products? We are happy to help you with any
                  questions you may have.
                </p>
                <p className="mt-4">
                  <a
                    href="mailto:hello@discontinuity.ai"
                    className="text-sm font-semibold leading-6 text-primary-600"
                  >
                    Contact sales <span aria-hidden="true">&rarr;</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  )
}
