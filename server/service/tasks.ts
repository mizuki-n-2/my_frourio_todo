import dayjs from 'dayjs'
import { PrismaClient } from '@prisma/client'
import { TaskStatus } from '$prisma/client'
import { CreateTaskRequest } from '$/types'

const prisma = new PrismaClient()

export const getTasks = async (userId: number, status?: TaskStatus) =>
  await prisma.task.findMany({ where: { userId, status } })

export const createTask = (userId: number, body: CreateTaskRequest) =>
  body.status === TaskStatus.DONE
    ? prisma.task.create({
        data: {
          userId,
          title: body.title,
          status: body.status,
          finishedAt: dayjs().toDate()
        }
      })
    : prisma.task.create({
        data: {
          userId,
          title: body.title,
          status: body.status
        }
      })

export const updateTask = (id: number, status: TaskStatus) =>
  status === TaskStatus.DONE
    ? prisma.task.update({
        where: { id },
        data: {
          status,
          finishedAt: dayjs().toDate()
        }
      })
    : prisma.task.update({
        where: { id },
        data: { status, finishedAt: null }
      })

export const deleteTask = (id: number) => prisma.task.delete({ where: { id } })
