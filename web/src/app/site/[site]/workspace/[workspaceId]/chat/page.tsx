import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspace } from '@/prisma/services/workspace'
import ChatPlusPanel from '@/components/ChatPlusPanel'
import { ChatProvider } from '@/lib/client/chatProvider'
import ControlBar from '@/components/ChatControlBar'
import { AddModelDialog } from '@/components/Dialogs/addmodeldialog'

type WorkspaceChatPageProps = {
  params: {
    siteId: string
    workspaceId: string
  }
}

const WorkspaceChatPage = async ({ params }: WorkspaceChatPageProps) => {
  const { organization, orgId } = await useCurrentOrganization()
  const workspace = await getWorkspace(orgId, params.workspaceId)

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
          link={`https://discontinuity.ai/workspace/${workspace.slug}/chat/`}
          modelId={organization.llmmodels[0].id}
          promptId={''}
        >
          <ControlBar
            models={organization.llmmodels}
            prompts={organization.prompts}
            title={workspace.name}
          />
          <ChatPlusPanel workspace={workspace} />
        </ChatProvider>
      )}
    </>
  )
}

export default WorkspaceChatPage
