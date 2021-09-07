import { MinLength, IsEmail } from 'class-validator'

export class LoginBody {
  @IsEmail()
  email: string

  @MinLength(8)
  password: string
}
