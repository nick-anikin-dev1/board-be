import { Controller, UsePipes, Post, Get, Request, UseGuards, ValidationPipe, Body }  from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { CreateUserDto } from "src/user/dto/create-user.dto";

@Controller('auth') 
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('signUp')
    @UsePipes(new ValidationPipe())
    async signUp(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
        return req.user;
    }
}