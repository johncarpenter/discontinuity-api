import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspaces } from '@/prisma/services/workspace'
import { workspaces } from '@prisma/client'
import { Field, Label } from '@/components/Base/fieldset'
import { Select } from '@/components/Base/select'

export default async function WorkspaceSwitcher() {
  const { id } = await useCurrentOrganization()

  const workspaces = await getWorkspaces(id)

  return (
    <>
      <Field>
        <Label>Project status</Label>
        <Select name="status">
          {workspaces.map((workspace: workspaces) => (
            <option key={workspace.name}>{workspace.name}</option>
          ))}
        </Select>
      </Field>
    </>
  )
}
