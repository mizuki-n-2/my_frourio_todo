import { defineController } from './$relay'
import { getTasks, createTask } from '$/service/tasks'

export default defineController({ getTasks }, ({ getTasks }) => ({
  get: async ({ query }) => {
    return { status: 200, body: await getTasks(query.userId) }
  },
  post: async ({ body }) => ({
    status: 201,
    body: await createTask(body)
  })
}))
