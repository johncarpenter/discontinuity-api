import prisma from '@/prisma/index'

export const createUser = async (clerk_id, fullName, imageUrl, email) => {
  const user = await getUserById(clerk_id)
  if (user) {
    return user
  }

  return await prisma.users.create({
    data: {
      clerk_id,
      fullName,
      imageUrl,
      email,
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
      email: true,
    },
    where: {
      deletedAt: null,
      clerk_id,
    },
  })

export const updateUser = async (clerk_id, fullName, imageUrl, email) =>
  await prisma.users.update({
    where: {
      clerk_id,
    },
    data: {
      fullName,
      imageUrl,
      email,
    },
  })
