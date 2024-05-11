import prisma from '@/prisma/index'

export const createOrganization = async (clerk_id, name, license, flow_endpoint) => {
  return await prisma.organizations.create({
    data: {
      clerk_id,
      name,
      license,
      flow_endpoint,
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

export const addPromptToOrganization = async (organization_id, prompt) => {
  const promptAdd = await prisma.prompts.create({
    data: {
      ...prompt,
    },
  })

  await prisma.organizations.update({
    where: {
      id: organization_id,
    },
    data: {
      prompts: {
        connect: {
          id: promptAdd.id,
        },
      },
    },
  })
}

export const removePromptFromOrganization = async (prompt_id) => {
  await prisma.prompts.update({
    where: {
      id: prompt_id,
    },
    data: {
      deletedAt: new Date(),
    },
  })

  await prisma.organizations.update({
    where: {
      prompts: {
        some: {
          id: prompt_id,
        },
      },
    },
    data: {
      prompts: {
        disconnect: {
          id: prompt_id,
        },
      },
    },
  })
}

export const addLLMModelToOrganization = async (organization_id, llmmodel) => {
  return await prisma.llmmodels.create({
    data: {
      ...llmmodel,
      organization: {
        connect: {
          id: organization_id,
        },
      },
    },
  })
}

export const removeLLMModelFromOrganization = async (llmmodel_id) => {
  await prisma.llmmodels.update({
    where: {
      id: llmmodel_id,
    },
    data: {
      deletedAt: new Date(),
      apikey: null,
    },
  })
}
