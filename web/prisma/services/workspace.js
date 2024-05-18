import prisma from '@/prisma/index'
import slugify from 'slugify'
import { createApiKey, deleteApiKey } from '@/prisma/services/apikey'

export const countWorkspaces = async (slug) =>
  await prisma.workspaces.count({
    where: { slug: { startsWith: slug } },
  })

export const createWorkspace = async (ownerId, name, description, creatorId, isPrivate) => {
  let slug = slugify(name, { lower: true })

  const count = await countWorkspaces(slug)

  if (count > 0) {
    slug = `${slug}-${count}`
  }

  const workspace = await prisma.workspaces.create({
    data: {
      ownerId,
      name,
      description,
      slug,
      creatorId,
      isPrivate,
    },
  })

  await createApiKey(workspace.id, '*', 'default')
}

export const getWorkspace = async (ownerId, slug) =>
  await prisma.workspaces.findFirst({
    select: {
      ownerId: true,
      name: true,
      slug: true,
      id: true,
      description: true,
      isPrivate: true,
      creator: {
        select: {
          fullName: true,
          imageUrl: true,
        },
      },
      threads: {
        select: {
          id: true,
          name: true,
          link: true,
          llmmodel: {
            select: {
              id: true,
              name: true,
            },
          },
          prompt: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        where: {
          deletedAt: null,
        },
      },
      apikeys: {
        select: {
          name: true,
          client_id: true,
          client_secret: true,
          permissions: true,
        },
        where: {
          name: 'default',
        },
      },
    },
    where: {
      deletedAt: null,
      slug,
      ownerId,
    },
  })

export const getWorkspaceById = async (ownerId, id) =>
  await prisma.workspaces.findFirst({
    select: {
      ownerId: true,
      name: true,
      slug: true,
      id: true,
      createdAt: true,
      deletedAt: true,
      description: true,
      isPrivate: true,
      creator: {
        select: {
          fullName: true,
          imageUrl: true,
        },
      },
      apikeys: {
        select: {
          name: true,
          client_id: true,
          client_secret: true,
          permissions: true,
        },
        where: {
          name: 'default',
        },
      },
    },
    where: {
      deletedAt: null,
      id,
      ownerId,
    },
  })

export const getWorkspaces = async (id) =>
  await prisma.workspaces.findMany({
    select: {
      createdAt: true,
      deletedAt: true,
      name: true,
      slug: true,
      id: true,
      description: true,
      isPrivate: true,
      creator: {
        select: {
          fullName: true,
          imageUrl: true,
        },
      },
      apikeys: {
        select: {
          name: true,
          client_id: true,
          client_secret: true,
          permissions: true,
        },
      },
    },
    where: {
      deletedAt: null,
      ownerId: id,
    },
  })

export const archiveWorkspace = async (ownerId, id) => {
  const workspace = await getWorkspaceById(ownerId, id)

  if (workspace) {
    console.log('Archiving Workspace:', id)
    await prisma.workspaces.update({
      data: { deletedAt: new Date(), slug: `${workspace.slug}-deleted` },
      where: { id: workspace.id },
    })
    return id
  } else {
    throw new Error('Unable to find workspace')
  }
}

export const unarchiveWorkspace = async (ownerId, id) => {
  const workspace = await getWorkspaceById(ownerId, id)

  if (workspace) {
    for (const key of workspace.apikeys) {
      await deleteApiKey(id, key.id)
    }

    await prisma.workspaces.update({
      data: { deletedAt: null, slug: `${workspace.slug.replace('-deleted', '')}` },
      where: { id: workspace.id },
    })
    return id
  } else {
    throw new Error('Unable to find workspace')
  }
}
