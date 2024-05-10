import prisma from '@/prisma/index'
import crypto from 'crypto'

export const createApiKey = async (workspaceId, permissions, name, creatorId) => {
  return await prisma.apikeys.create({
    data: {
      workspaceId,
      client_id: crypto.randomUUID(),
      client_secret: crypto.randomUUID(),
      name,
      permissions,
      creatorId,
    },
  })
}

export const deleteApiKey = async (id) => {
  return await prisma.apikeys.delete({
    where: { id },
  })
}

export const getApiKeys = async (id, ownerId) => {
  return await prisma.apikeys.findMany({
    select: {
      name: true,
      client_id: true,
      client_secret: true,
      permissions: true,
    },
    where: {
      workspaces: {
        deletedAt: null,
        id,
        ownerId,
      },
    },
  })
}
