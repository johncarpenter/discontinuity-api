import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspace } from '@/prisma/services/workspace'
import { AddModelDialog } from '@/app/_components/Dialogs/addmodeldialog'
import { ChatProvider } from '@/app/_lib/client/chatProvider'
import ControlBar from '@/app/_components/ChatControlBar'
import ChatPlusPanel from '@/app/_components/ChatPlusPanel'
import { getThreadByLink } from '@/prisma/services/threads'

type WorkspaceChatSinglePageProps = {
  params: {
    siteId: string
    workspaceId: string
    chatId: string
  }
}

const WorkspaceChatSinglePage = async ({ params }: WorkspaceChatSinglePageProps) => {
  const { orgId, organization } = await useCurrentOrganization()
  const workspace = await getWorkspace(orgId, params.workspaceId)

  const shareLink = `https://discontinuity.ai/workspace/${workspace.slug}/chat/${params.chatId}`
  const thread = await getThreadByLink(shareLink, workspace.id)

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
          link={thread.link}
          modelId={thread.llmmodel.id}
          promptId={''}
          threadId={thread.id}
        >
          <ControlBar
            models={organization.llmmodels}
            prompts={organization.prompts}
            title={thread.name}
          />
          <ChatPlusPanel workspace={workspace} />
        </ChatProvider>
      )}
    </>
  )
}

export default WorkspaceChatSinglePage
