import prisma from '@/prisma/index'
import { getWorkspace } from './workspace'

export const createFlowLink = async (
  workspaceId,
  name,
  endpoint,
  apikey,
  description,
  tags,
  type
) => {
  return await prisma.flows.create({
    data: {
      workspaceId,
      endpoint,
      apikey,
      description,
      name,
      tags,
      type,
    },
  })
}

export const deleteFlowLink = async (id, workspaceId) => {
  const flowLink = await getFlowLink(id, workspaceId)

  if (flowLink) {
    await prisma.flows.update({
      data: { deletedAt: new Date() },
      where: { id: id },
    })
    return id
  } else {
    throw new Error('Unable to find flow link in active workspace')
  }
}

export const getFlowLink = async (id, workspaceId) => {
  return await prisma.flows.findFirst({
    select: {
      id: true,
      name: true,
      description: true,
      tags: true,
      type: true,
      endpoint: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      id,
      deletedAt: null,
      workspaces: {
        deletedAt: null,
        id: workspaceId,
      },
    },
  })
}

export const getFlowLinks = async (id, ownerId) => {
  return await prisma.flows.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      tags: true,
      type: true,
      endpoint: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      deletedAt: null,
      workspaces: {
        deletedAt: null,
        id,
        ownerId,
      },
    },
  })
}

export const updateFlowLink = async (
  flowId,
  orgId,
  workspaceSlug,
  name,
  endpoint,
  description,
  tags,
  type
) => {
  const workspace = getWorkspace(orgId, workspaceSlug)
  const flowLink = await getFlowLink(flowId, workspace.id)

  if (flowLink) {
    return await prisma.flows.update({
      data: {
        name,
        endpoint,
        description,
        tags,
        type,
      },
      where: { id: flowId },
    })
  } else {
    throw new Error('Unable to find flow link in active workspace')
  }
}

export const updateApiKey = async (flowId, orgId, workspaceSlug, apikey) => {
  const workspace = getWorkspace(orgId, workspaceSlug)
  const flowLink = await getFlowLink(flowId, workspace.id)

  if (flowLink) {
    return await prisma.flows.update({
      data: {
        apikey,
      },
      where: { id: flowId },
    })
  } else {
    throw new Error('Unable to find flow link in active workspace')
  }
}
