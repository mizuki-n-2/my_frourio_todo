import { defineController } from './$relay'
import { createUser } from '$/service/users'

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: (await createUser(body)).id
  })
}))
