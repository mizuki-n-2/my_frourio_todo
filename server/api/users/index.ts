import { CreateUserRequest } from "$/types";

export type Methods = {
  post: {
    reqBody: CreateUserRequest
    resBody: number
  }
}
