import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspace } from '@/prisma/services/workspace'
import SearchPanel from '@/components/SearchPanel'

type WorkspaceSearchPageProps = {
  params: {
    siteId: string
    workspaceId: string
  }
}

const WorkspaceSearchPage = async ({ params }: WorkspaceSearchPageProps) => {
  const organizationId = await useCurrentOrganization()
  const workspace = await getWorkspace(organizationId, params.workspaceId)

  return (
    <div className="">
      <SearchPanel workspaceId={workspace.id} />
    </div>
  )
}
export default WorkspaceSearchPage
