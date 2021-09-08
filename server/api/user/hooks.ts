import jwt from 'express-jwt'
import { defineHooks } from './$relay'

export type AdditionalRequest = {
  user: {
    userId: number,
    iat: number
  }
}

export default defineHooks(() => ({
  // TODO: JWT_SECRETは仮置き
  onRequest: jwt({ secret: process.env.JWT_SECRET ?? 'jwt-secret', algorithms: ['HS256'] })
  })
)
