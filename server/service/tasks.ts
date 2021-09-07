import dayjs from 'dayjs'
import { PrismaClient } from '@prisma/client'
import { Task, TaskStatus } from '$prisma/client'
import { CreateTaskRequest } from '$/types'

const prisma = new PrismaClient()

export const getTasks = 
  async (userId: number) =>
    await prisma.task.findMany({ where: { userId } })

export const createTask = (body: CreateTaskRequest) => {
  if (body.status === TaskStatus.DONE) {
    const now = dayjs().toDate()
    return prisma.task.create({
      data: {
        userId: body.userId,
        title: body.title,
        status: body.status,
        finishedAt: now
      }
    })
  } else {
    return prisma.task.create({
      data: {
        userId: body.userId,
        title: body.title,
        status: body.status
      }
    })
  }
}

export const updateTask = (
  id: Task['id'],
  status: Task['status']
) => {
  if (status === TaskStatus.DONE) {
    const now = dayjs().toDate()
    return prisma.task.update({ where: { id }, data: { status, finishedAt: now } })
  } else {
    return prisma.task.update({ where: { id }, data: { status, finishedAt: null } })
  }
}

export const deleteTask = (id: Task['id']) =>
  prisma.task.delete({ where: { id } })
