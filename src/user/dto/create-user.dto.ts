import { IsEmail, MinLength, IsNotEmpty } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    firstName: string

    @IsNotEmpty()
    lastName: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(8, {message: 'Password must be more than 8 sign'})
    password: string
}
