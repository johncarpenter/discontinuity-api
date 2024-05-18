import prisma from '@/prisma/index'

export const upsertThread = async (
  workspaceId,
  name,
  link,
  threadId,
  creatorId,
  llmmodelId,
  promptId
) => {
  const thread = await getThreadByThreadId(threadId, workspaceId)

  if (thread) {
    return await prisma.threads.update({
      data: {
        name,
        link,
        threadId,
        llmmodel: {
          connect: {
            id: llmmodelId,
          },
        },
        prompt: {
          connect: {
            id: promptId,
          },
        },
        updatedAt: new Date(),
      },
      where: { id: thread.id },
    })
  } else {
    return await prisma.threads.create({
      data: {
        workspaceId,
        name,
        link,
        threadId,
        llmmodelId,
        promptId,
        creatorId,
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

export const getThreadByThreadId = async (threadId, workspaceId) => {
  return await prisma.threads.findFirst({
    select: {
      id: true,
      name: true,
      link: true,
      threadId: true,
      createdAt: true,
      updatedAt: true,
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
      threadId,
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
      threadId: true,
      createdAt: true,
      updatedAt: true,
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
      threadId: true,
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
