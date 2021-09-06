import type { Task, TaskStatus } from '$prisma/client'

export interface CreateTaskRequest {
  userId: number
  title: string
  status: TaskStatus
}

export type Methods = {
  get: {
    query: {
      userId: number
    }

    resBody: Task[]
  }
  post: {
    reqBody: CreateTaskRequest
    resBody: Task
  }
}
