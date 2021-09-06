import type { Task, Task_status } from '$prisma/client'

export interface CreateTaskRequest {
  user_id: number
  title: string
  status: Task_status
}

export type Methods = {
  get: {
    query: {
      user_id: number
    }

    resBody: Task[]
  }
  post: {
    reqBody: CreateTaskRequest
    resBody: Task
  }
}
