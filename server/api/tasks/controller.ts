import { defineController } from './$relay'
import { getTasks, createTask } from '$/service/tasks'

// const print = (text: string) => console.log(text)

export default defineController({ getTasks }, ({ getTasks }) => ({
  get: async ({ query }) => {
    return { status: 200, body: await getTasks(query.user_id) }
  },
  post: async ({ body }) => ({
    status: 201,
    body: await createTask(body.label)
  })
}))
