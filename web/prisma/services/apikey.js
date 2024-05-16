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

export const deleteApiKey = async (workspace_id, apikey_id) => {
  console.log('Removing API Key:', apikey_id)
  await prisma.apikeys.update({
    where: {
      id: apikey_id,
      workspaces: {
        deletedAt: null,
        id: workspace_id,
      },
    },
    data: {
      deletedAt: new Date(),
      client_secret: '****',
    },
  })
}

export const getApiKeys = async (id, ownerId) => {
  return await prisma.apikeys.findMany({
    select: {
      id: true,
      name: true,
      client_id: true,
      client_secret: true,
      permissions: true,
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
