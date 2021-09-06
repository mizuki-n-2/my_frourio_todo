import { PrismaClient } from '@prisma/client'
import { CreateUserRequest } from '$/types'

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

export const createUser = (body: CreateUserRequest) =>
  prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password
    }
  })

export class UserNotFound extends Error {}