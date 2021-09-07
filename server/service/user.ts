import { PrismaClient } from '@prisma/client'
import { CreateUserRequest } from '$/types'

const prisma = new PrismaClient()

export const validateUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email }
  })
  
  if (!user) throw new UserNotFound()
  
  // TODO: パスワードはハッシュにしてDBに保存予定なのでそこに合わせる
  if (user.password === password) return user.id
}

export const getUserById = 
  async (userId: number) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) throw new UserNotFound()

    return {
      name: user.name,
      email: user.email
    }
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