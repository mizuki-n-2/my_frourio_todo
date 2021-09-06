import { PrismaClient } from '@prisma/client'
import type { Task } from '$prisma/client'
import { CreateTaskRequest } from '$/api/tasks'

const prisma = new PrismaClient()

export const getTasks = 
  async (user_id: number) =>
    await prisma.task.findMany({ where: { user_id } })

export const createTask = (body: CreateTaskRequest) =>
  prisma.task.create({
    data: {
      user_id: body.user_id,
      title: body.title,
      status: body.status
    }
  })

export const updateTask = (
  id: Task['id'],
  status: Task['status']
) => prisma.task.update({ where: { id }, data: { status } })

export const deleteTask = (id: Task['id']) =>
  prisma.task.delete({ where: { id } })
