import Card from '@/components/Card'
import LicenseCard from '@/components/LicenseCard'
import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { BugAntIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import ModelsTable from '@/app/_components/ModelsTable'
import { AddModelDialog } from '@/app/_components/Dialogs/addmodeldialog'
import useCurrentOrganization from '@/app/_lib/client/useCurrentOrganization'
import PromptsTable from '@/app/_components/PromptsTable'
import { AddPromptDialog } from '@/app/_components/Dialogs/addpromptdialog'

export default async function SupportPage() {
  const { organization } = await useCurrentOrganization()

  return (
    <Container>
      <PageHeader title="Support" breadcrumbs={[]} />
      <LicenseCard />
      <Card>
        <Card.Title
          title={'Your Models'}
          subtitle={'Connect Language Models to your workspace to use them in your workflows.'}
        >
          <Card.Action>
            <AddModelDialog organizationId={organization.id} />
          </Card.Action>
        </Card.Title>
        <ModelsTable />
      </Card>
      <Card>
        <Card.Title
          title={'Your Prompts'}
          subtitle={'Prompts are specific instructions for the model to follow.'}
        >
          <Card.Action>
            <AddPromptDialog organizationId={organization.id} />
          </Card.Action>
        </Card.Title>
        <PromptsTable />
      </Card>
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
