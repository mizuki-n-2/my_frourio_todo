import { RegisterBody } from '$/validators'

export type Methods = {
  post: {
    reqBody: RegisterBody
    resBody: {
      userId: number
    }
  }
}
