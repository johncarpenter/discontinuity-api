import prisma from '@/prisma/index'

export const createUser = async (clerk_id, fullName, imageUrl) => {
  const user = await getUserById(clerk_id)
  if (user) {
    return user
  }

  return await prisma.users.create({
    data: {
      clerk_id,
      fullName,
      imageUrl,
    },
  })
}

export const getUserById = async (clerk_id) =>
  await prisma.users.findFirst({
    select: {
      id: true,
      fullName: true,
      clerk_id: true,
      imageUrl: true,
    },
    where: {
      deletedAt: null,
      clerk_id,
    },
  })
