import type { Task } from '$prisma/client'

export type Methods = {
  get: {
    query: {
      user_id: number
    }

    resBody: Task[]
  }
  post: {
    // reqBody: Pick<Task, 'label'>
    resBody: Task
  }
}
