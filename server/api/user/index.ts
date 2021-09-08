import { AuthHeader, UserInfo } from "$/types"

export type Methods = {
  get: {
    reqHeaders: AuthHeader
    resBody: UserInfo
  }
}
