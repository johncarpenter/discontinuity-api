import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspace } from '@/prisma/services/workspace'
import ChatPanel from '@/app/_components/ChatPanel'
import { AddModelDialog } from '@/components/Dialogs/addmodeldialog'
import { getThreadByThreadId } from '@/prisma/services/threads'

type WorkspaceChatSinglePageProps = {
  params: {
    siteId: string
    workspaceId: string
    chatId: string
  }
}

const WorkspaceChatSinglePage = async ({ params }: WorkspaceChatSinglePageProps) => {
  const organization = await useCurrentOrganization()
  const workspace = await getWorkspace(organization.id, params.workspaceId)
  const thread = await getThreadByThreadId(params.chatId, workspace.id)

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
        <ChatPanel workspace={workspace} chatThread={thread} />
      )}
    </>
  )
}

export default WorkspaceChatSinglePage
