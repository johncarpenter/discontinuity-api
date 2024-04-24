import prisma from '@/prisma/index'

export const createFlowLink = async (workspaceId, name, endpoint, apikey, description) => {
  return await prisma.flows.create({
    data: {
      workspaceId,
      endpoint,
      apikey,
      description,
      name,
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
