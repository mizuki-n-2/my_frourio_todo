import jwt from 'jsonwebtoken'
import { defineController } from './$relay'
import { UserNotFound, validateUser } from '$/service/user'

export default defineController(() => ({
  post: async ({ body }) => {
    try {
      // TODO: JWT SECRETは仮置き
      // TODO: 関数名と変数名が合ってなくて気持ち悪い
      const userId = await validateUser(body.email, body.password)
      return userId
        ? { status: 201, body: { token: jwt.sign({ userId }, process.env.JWT_SECRET ?? 'jwt-secret') } }
        : { status: 401 } 
    } catch (e) {
      if (e instanceof UserNotFound)
        return { status: 404 }
      
      return { status: 500 }
    }
  }
}))
