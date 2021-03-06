import { defineController } from './$relay'
import { createUser } from '$/service/user'

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: {
      userId: (await createUser(body)).id
    }
  })
}))
