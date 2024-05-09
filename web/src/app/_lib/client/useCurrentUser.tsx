import { currentUser } from '@clerk/nextjs/server'
import { getUserById, createUser } from '@/prisma/services/user'

export default async function useCurrentUser() {
  const user = await currentUser()

  if (!user) {
    return null
  }

  const localUser = await getUserById(user.id)

  if (!localUser) {
    return await createUser(user.id, user.firstName + ' ' + user.lastName, user.imageUrl)
  }

  return localUser
}
