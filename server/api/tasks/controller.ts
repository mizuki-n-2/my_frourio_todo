import { defineController } from './$relay'
import { getTasks, createTask } from '$/service/tasks'

export default defineController({ getTasks }, ({ getTasks }) => ({
  get: async ({ user, query }) => {
    return { status: 200, body: await getTasks(user.userId, query?.status) }
  },
  post: async ({ user, body }) => ({
    status: 201,
    body: {
      taskId: (await createTask(user.userId, body)).id
    }
  })
}))
