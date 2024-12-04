import { IsEmail, MinLength } from "class-validator"

export class CreateUserDto {
    firstName: string
    lastName: string

    @IsEmail()
    email: string

    @MinLength(8, {message: 'Password must be more than 8 sign'})
    password: string
}
