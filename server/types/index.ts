import { TaskStatus } from ".prisma/client"

export type CreateUserRequest = {
  name: string
  email: string
  password: string
}

export type CreateTaskRequest = {
  userId: number
  title: string
  status: TaskStatus
}