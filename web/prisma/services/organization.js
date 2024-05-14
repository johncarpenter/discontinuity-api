import prisma from '@/prisma/index'

export const createOrganization = async (clerk_id, name, license) => {
  return await prisma.organizations.create({
    data: {
      clerk_id,
      name,
      license,
    },
  })
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
  const organization = await getOrganizationFromClerkId(organization_id)
  return await prisma.prompts.create({
    data: {
      ...prompt,
      organization: {
        connect: {
          id: organization.id,
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
  const organization = await getOrganizationFromClerkId(organization_id)

  await prisma.prompts.update({
    where: {
      id: prompt_id,
      organization: {
        id: organization.id,
      },
    },
    data: {
      deletedAt: new Date(),
    },
  })
}

export const updatePrompt = async (organization_id, promptUpdate) => {
  const organization = await getOrganizationFromClerkId(organization_id)

  const promptCheck = await prisma.prompts.findFirst({
    where: {
      id: promptUpdate.id,
      deletedAt: null,
      organization: {
        id: organization.id,
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
  const organization = await getOrganizationFromClerkId(organization_id)

  return await prisma.llmmodels.create({
    data: {
      ...llmmodel,
      organization: {
        connect: {
          id: organization.id,
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
  const organization = await getOrganizationFromClerkId(organization_id)

  await prisma.llmmodels.update({
    where: {
      id: llmmodel_id,
      organization: {
        id: organization.id,
      },
    },
    data: {
      deletedAt: new Date(),
      apikey: null,
    },
  })
}

const getOrganizationFromClerkId = async (clerk_id) => {
  return await prisma.organizations.findFirst({
    select: {
      id: true,
    },
    where: {
      clerk_id,
    },
  })
}
