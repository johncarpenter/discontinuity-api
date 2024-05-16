import prisma from '@/prisma/index'
import { getWorkspaces, archiveWorkspace } from './workspace'

export const createOrganization = async (clerk_id, name, license) => {
  let query = {
    data: {
      name,
      license,
      clerk_id,
    },
  }

  return await prisma.organizations.create(query)
}

export const getOrganizationIdById = async (clerk_id) =>
  await prisma.organizations.findFirst({
    select: {
      id: true,
    },
    where: {
      deletedAt: null,
      clerk_id,
    },
  })

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
  console.log('Removing LLM Model:', llmmodel_id)
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

export const archiveOrganization = async (organization_id) => {
  const org = await getOrganizationById(organization_id)

  if (org) {
    console.log('Archiving Organization:', organization_id)
    for (const model of org.llmmodels) {
      removeLLMModelFromOrganization(organization_id, model.id)
    }

    const workspaces = await getWorkspaces(organization_id)
    for (const workspace of workspaces) {
      await archiveWorkspace(organization_id, workspace.id)
    }

    await prisma.organizations.update({
      data: { deletedAt: new Date() },
      where: { id: organization_id },
    })
    return organization_id
  } else {
    throw new Error('Unable to find organization')
  }
}
