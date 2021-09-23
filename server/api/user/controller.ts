import { defineController } from './$relay'
import { getUserById, UserNotFound } from '$/service/user'

export default defineController(() => ({
  get: async ({ user }) => {
    try {
      const resUser = await getUserById(user.userId)

      return { status: 200, body: resUser }
    } catch (e) {
      if (e instanceof UserNotFound) return { status: 404 }

      return { status: 500 }
    }
  }
}))
