import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUserById = 
  async (userId: number) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      throw new UserNotFound()
    }

    return user
  }

export class UserNotFound extends Error {}