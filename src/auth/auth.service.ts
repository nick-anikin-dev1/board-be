import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../types/types';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    const passwordIsMatch = await argon2.verify(user.password, password);
    if (user && passwordIsMatch) {
      delete user.password;
      return user;
    }
    throw new UnauthorizedException('User or password is incorrect');
  }

  async login(user: IUser) {
    const { id, email, lastName, firstName } = user;
    return {
      id,
      email,
      lastName,
      firstName,
      token: this.jwtService.sign({
        id: user.id,
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
      }),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
