import prisma from '@/prisma/index'

export const createOrganization = async (user_clerk_id, clerk_id, name, license) => {
  let query = {
    data: {
      name,
      license,
    },
  }
  if (clerk_id) {
    query.data.clerk_id = clerk_id
  } else {
    query.data.user_clerk_id = user_clerk_id
  }

  return await prisma.organizations.create(query)
}

export const getOrganizationIdByIds = async (clerk_id, user_clerk_id) => {
  let query = {
    select: {
      id: true,
    },
    where: {
      deletedAt: null,
    },
  }
  if (clerk_id) {
    query.where.clerk_id = clerk_id
  } else {
    query.where.user_clerk_id = user_clerk_id
  }

  return await prisma.organizations.findFirst(query)
}

export const getOrganizationByIds = async (clerk_id, user_clerk_id) => {
  let query = {
    select: {
      id: true,
      name: true,
      clerk_id: true,
      user_clerk_id: true,
      license: true,
      flow_endpoint: true,
      prompts: {
        select: {
          id: true,
          name: true,
          prompt: true,
          createdAt: true,
          isPrivate: true,
          creator: {
            select: {
              fullName: true,
              imageUrl: true,
            },
          },
        },
        where: {
          deletedAt: null,
        },
      },
      llmmodels: {
        select: {
          id: true,
          name: true,
          source: true,
          replicate_url: true,
          createdAt: true,
          creator: {
            select: {
              fullName: true,
              imageUrl: true,
            },
          },
        },
        where: {
          deletedAt: null,
        },
      },
    },
    where: {
      deletedAt: null,
    },
  }
  if (clerk_id) {
    query.where.clerk_id = clerk_id
  } else {
    query.where.user_clerk_id = user_clerk_id
  }

  return await prisma.organizations.findFirst(query)
}

export const getOrganizationById = async (clerk_id) =>
  await prisma.organizations.findFirst({
    select: {
      id: true,
      name: true,
      clerk_id: true,
      license: true,
      flow_endpoint: true,
      prompts: {
        select: {
          id: true,
          name: true,
          prompt: true,
          createdAt: true,
          isPrivate: true,
          creator: {
            select: {
              fullName: true,
              imageUrl: true,
            },
          },
        },
        where: {
          deletedAt: null,
        },
      },
      llmmodels: {
        select: {
          id: true,
          name: true,
          source: true,
          replicate_url: true,
          createdAt: true,
          creator: {
            select: {
              fullName: true,
              imageUrl: true,
            },
          },
        },
        where: {
          deletedAt: null,
        },
      },
    },
    where: {
      deletedAt: null,
      clerk_id,
    },
  })

export const addPromptToOrganization = async (organization_id, creatorId, prompt) => {
  return await prisma.prompts.create({
    data: {
      ...prompt,
      organization: {
        connect: {
          id: organization_id,
        },
      },
      creator: {
        connect: {
          id: creatorId,
        },
      },
    },
  })
}

export const removePromptFromOrganization = async (organization_id, prompt_id) => {
  await prisma.prompts.update({
    where: {
      id: prompt_id,
      organization: {
        id: organization_id,
      },
    },
    data: {
      deletedAt: new Date(),
    },
  })
}

export const updatePrompt = async (organization_id, promptUpdate) => {
  const promptCheck = await prisma.prompts.findFirst({
    where: {
      id: promptUpdate.id,
      deletedAt: null,
      organization: {
        id: organization_id,
        deletedAt: null,
      },
    },
  })

  if (promptCheck) {
    return await prisma.prompts.update({
      data: {
        name: promptUpdate.name,
        prompt: promptUpdate.prompt,
        isPrivate: promptUpdate.isPrivate,
        updatedAt: new Date(),
      },
      where: { id: promptUpdate.id },
    })
  } else {
    throw new Error('Unable to find prompt in the organization')
  }
}

export const addLLMModelToOrganization = async (organization_id, creatorId, llmmodel) => {
  return await prisma.llmmodels.create({
    data: {
      ...llmmodel,
      organization: {
        connect: {
          id: organization_id,
        },
      },
      creator: {
        connect: {
          id: creatorId,
        },
      },
    },
  })
}

export const removeLLMModelFromOrganization = async (organization_id, llmmodel_id) => {
  await prisma.llmmodels.update({
    where: {
      id: llmmodel_id,
      organization: {
        id: organization_id,
      },
    },
    data: {
      deletedAt: new Date(),
      apikey: null,
    },
  })
}
