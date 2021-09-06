import type { Task } from '$prisma/client'
import type { CreateTaskRequest } from '$/types'  
 
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
