import type { Task } from '$prisma/client'
import { AuthHeader } from '$/types'

export type Methods = {
  patch: {
    reqHeaders: AuthHeader
    reqBody: Pick<Task, 'status'>
    resBody: string
  }
  delete: {
    reqHeaders: AuthHeader
    resBody: string
  }
}
