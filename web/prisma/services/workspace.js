import prisma from '@/prisma/index'
import slugify from 'slugify'
import { createApiKey } from '@/prisma/services/apikey'

export const countWorkspaces = async (slug) =>
  await prisma.workspaces.count({
    where: { slug: { startsWith: slug } },
  })

export const createWorkspace = async (ownerId, name) => {
  let slug = slugify(name, { lower: true })

  const count = await countWorkspaces(slug)

  if (count > 0) {
    slug = `${slug}-${count}`
  }

  const workspace = await prisma.workspaces.create({
    data: {
      ownerId,
      name,
      slug,
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

export const getWorkspaces = async (id) =>
  await prisma.workspaces.findMany({
    select: {
      createdAt: true,
      name: true,
      slug: true,
      id: true,
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

export const deleteWorkspace = async (ownerId, slug) => {
  const workspace = await getWorkspace(ownerId, slug)

  if (workspace) {
    await prisma.workspace.update({
      data: { deletedAt: new Date() },
      where: { id: workspace.id },
    })
    return slug
  } else {
    throw new Error('Unable to find workspace')
  }
}
