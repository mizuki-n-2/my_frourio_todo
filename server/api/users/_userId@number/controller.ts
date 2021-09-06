import { defineController } from './$relay'
import { getUserById, UserNotFound } from '$/service/users'

export default defineController({ getUserById }, ({ getUserById }) => ({
  get: async ({ params }) => {
    try {
      const user = await getUserById(params.userId)
      
      return {
        status: 200,
        body: user
      }
    } catch (e) {
      if (e instanceof UserNotFound) {
        return {
          status: 404,
          body: `user not found by id: ${params.userId}`
        }
      }

      return {
        status: 500,
        body: "Something broke!"
      }
    }
  }
}))
