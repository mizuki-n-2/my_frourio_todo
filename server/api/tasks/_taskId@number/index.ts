import type { Task } from '$prisma/client'

export type Methods = {
  patch: {
    reqBody: Pick<Task, 'status'>
    resBody: Task
  }
  delete: {
    status: 204
  }
}
