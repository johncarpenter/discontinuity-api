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
    },
    where: {
      deletedAt: null,
      clerk_id,
    },
  })
