import { TaskStatus } from '.prisma/client'

export type CreateUserRequest = {
  name: string
  email: string
  password: string
}

export type CreateTaskRequest = {
  title: string
  status: TaskStatus
}

export type AuthHeader = {
  Authorization: string
}

export type UserInfo = {
  name: string
  email: string
}
