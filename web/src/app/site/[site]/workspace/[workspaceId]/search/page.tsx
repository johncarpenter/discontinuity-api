import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspace } from '@/prisma/services/workspace'
import ChatPanel from '@/app/_components/ChatPanel'
import { AddModelDialog } from '@/components/Dialogs/addmodeldialog'
import { ChatProvider } from '@/lib/client/chatProvider'
import ControlBar from '@/components/ChatControlBar'

type WorkspaceSearchPageProps = {
  params: {
    siteId: string
    workspaceId: string
  }
}

const WorkspaceSearchPage = async ({ params }: WorkspaceSearchPageProps) => {
  const { orgId, organization } = await useCurrentOrganization()
  const workspace = await getWorkspace(orgId, params.workspaceId)

  const defaultPrompt =
    organization.prompts && organization.prompts[0] ? organization.prompts[0].id : ''
  return (
    <>
      {!organization.llmmodels || organization.llmmodels.length === 0 ? (
        <div className="flex h-[70vh]">
          <div className="p-4 m-auto">
            <div className="flex flex-col text-center">
              <h4 className="text-2xl font-bold mb-2 text-gray-700 dark:text-gray-50">
                We will need a Model configured to start the conversation.
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Click here to create a new Model.
              </p>
              <AddModelDialog organizationId={organization.id} />
            </div>
          </div>
        </div>
      ) : (
        <ChatProvider
          link={`https://discontinuity.ai/workspace/${workspace.slug}/search/`}
          modelId={organization.llmmodels[0].id}
          promptId={defaultPrompt}
        >
          <ControlBar
            organizationId={organization.id}
            models={organization.llmmodels}
            prompts={organization.prompts}
            title={workspace.name}
          />
          <ChatPanel workspace={workspace} threadView={false} />
        </ChatProvider>
      )}
    </>
  )
}

export default WorkspaceSearchPage
