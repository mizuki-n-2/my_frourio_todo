import { MinLength, IsEmail, Length } from 'class-validator'

export class LoginBody {
  @IsEmail()
  email: string

  @MinLength(8)
  password: string
}

export class RegisterBody {
  @Length(1, 15)
  name: string

  @IsEmail()
  email: string

  @MinLength(8)
  password: string
}