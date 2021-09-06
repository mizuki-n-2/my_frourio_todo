import { depend } from 'velona'
import { PrismaClient } from '@prisma/client'
import type { Task, Prisma } from '$prisma/client'

const prisma = new PrismaClient()

export const getTasks = 
  async (user_id: number) =>
    await prisma.task.findMany({ where: { user_id } })

export const createTask = (label: Task['label']) =>
  prisma.task.create({ data: { label } })

export const updateTask = (
  id: Task['id'],
  partialTask: Prisma.TaskUpdateInput
) => prisma.task.update({ where: { id }, data: partialTask })

export const deleteTask = (id: Task['id']) =>
  prisma.task.delete({ where: { id } })
