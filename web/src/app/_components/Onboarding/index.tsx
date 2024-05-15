import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { AddModelDialog } from '@/components/Dialogs/addmodeldialog'
import ModelsTable from '@/components/ModelsTable'
import { Text } from '@/components/Base/text'
import { AddWorkspaceDialog } from '../Dialogs/addworkspacedialog'
import { getWorkspaces } from '@/prisma/services/workspace'

export async function Onboarding() {
  const organization = await useCurrentOrganization()
  const workspaces = await getWorkspaces(organization.id)

  return (
    <>
      {organization.llmmodels && organization.llmmodels.length > 0 ? null : (
        <>
          <div className="text-base leading-7 text-gray-700 lg:max-w-lg pb-8">
            <p className="text-base font-semibold leading-7 text-secondary-600 uppercase">
              Add a foundation model
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-normal sm:text-4xl">
              You will need to add an LLM Model to your organization to get started.
            </h2>
            <Text className="mt-4 leading-7 text-lighter">
              LLM models, like OpenAI, are the foundation of your organization's AI capabilities. To
              add an LLM model click the button below.{' '}
            </Text>
            <Text className="mt-4 leading-7 text-lighter">
              You can find your OpenAI model API KEY here;{' '}
              <a
                className="text-primary-100"
                href="https://platform.openai.com/api-keys"
                target="_blank"
              >
                https://platform.openai.com/api-keys
              </a>
            </Text>
            <Text className="mt-4 leading-7 text-lighter">
              Consult your LLM model documentation for other API keys and endpoints.
            </Text>
          </div>
          <AddModelDialog organizationId={organization?.id} />
          <ModelsTable />
        </>
      )}
      {workspaces && workspaces.length > 0 ? null : (
        <>
          <div className="text-base leading-7 text-gray-700 lg:max-w-lg pb-8">
            <p className="text-base font-semibold leading-7 text-secondary-600 uppercase">
              Add a Workspace
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-normal sm:text-4xl">
              Create a Workspace to begin your AI journey.
            </h2>
            <Text className="mt-4 leading-7 text-lighter">
              Workspaces are where you can create and manage your AI projects. Click the button
              below to create a workspace.
            </Text>
          </div>
          <AddWorkspaceDialog />
        </>
      )}
    </>
  )
}
