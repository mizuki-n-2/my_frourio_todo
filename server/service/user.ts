import { PrismaClient } from '@prisma/client'
import { CreateUserRequest } from '$/types'
import bcrypt from 'bcrypt' 

const prisma = new PrismaClient()

export const validateUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email }
  })
  
  if (!user) throw new UserNotFound()
  
  const match = await bcrypt.compare(password, user.password);

  if(match) return user.id
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

const saltRounds = 10;

export const createUser = (body: CreateUserRequest) => 
  bcrypt.hash(body.password, saltRounds).then(function(hash) {
      return prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: hash
        }
      })
  });

export class UserNotFound extends Error {}