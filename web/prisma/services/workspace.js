import prisma from '@/prisma/index'
import slugify from 'slugify'

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

  await prisma.workspaces.create({
    data: {
      ownerId,
      name,
      slug,
    },
  })
}

export const getWorkspace = async (ownerId, slug) =>
  await prisma.workspaces.findFirst({
    select: {
      ownerId: true,
      name: true,
      slug: true,
      id: true,
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