import type { Task } from '$prisma/client'

export type Methods = {
  patch: {
    reqBody: Pick<Task, 'status'>
    status: 204
  }
  delete: {
    status: 204
  }
}
