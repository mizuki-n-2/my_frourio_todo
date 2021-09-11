import type { Task, TaskStatus } from '$prisma/client'
import type { CreateTaskRequest, AuthHeader } from '$/types'
 
export type Methods = {
  get: {
    reqHeaders: AuthHeader
    query?: {
      status: TaskStatus
    }

    resBody: Task[]
  }
  post: {
    reqHeaders: AuthHeader
    reqBody: CreateTaskRequest
    resBody: {
      taskId: number
    }
  }
}
