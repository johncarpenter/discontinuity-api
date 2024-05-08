import prisma from '@/prisma/index'

export const upsertThread = async (workspaceId, name, link) => {
  const thread = await getThreadByLink(link, workspaceId)

  if (thread) {
    return await prisma.threads.update({
      data: { name, link },
      where: { id: thread.id },
    })
  } else {
    return await prisma.threads.create({
      data: {
        workspaceId,
        name,
        link,
      },
    })
  }
}

export const deleteThread = async (id, workspaceId) => {
  const thread = await getThread(id, workspaceId)

  if (thread) {
    await prisma.threads.update({
      data: { deletedAt: new Date() },
      where: { id: id },
    })
    return id
  } else {
    throw new Error('Unable to find thread link in active workspace')
  }
}

export const getThreadByLink = async (link, workspaceId) => {
  return await prisma.threads.findFirst({
    select: {
      id: true,
      name: true,
      link: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      link,
      deletedAt: null,
      workspaces: {
        deletedAt: null,
        id: workspaceId,
      },
    },
  })
}

export const getThread = async (id, workspaceId) => {
  return await prisma.threads.findFirst({
    select: {
      id: true,
      name: true,
      link: true,
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

export const getThreads = async (id, ownerId) => {
  return await prisma.threads.findMany({
    select: {
      id: true,
      name: true,
      link: true,
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
