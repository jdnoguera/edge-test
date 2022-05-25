import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtPayload } from '../users/models/JwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
  ) {}

  async login({
    Email,
    Password,
  }: LoginDto): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.validateUser(Email, Password);
    return this.tokenService.generateTokens(user);
  }

  register(dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  refreshToken(
    token: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    return this.validateRefreshToken(token);
  }

  async validateRefreshToken(
    token: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const tokenDecoded = this.jwtService.decode(token) as JwtPayload;

      await this.jwtService.verify(token, {
        secret: process.env.REFRESH_SECRET,
      });
      const user = await this.userService.findOne(Number(tokenDecoded.sub));
      return this.tokenService.generateTokens(user);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async validateUser(email: string, pass: string): Promise<User> {
    try {
      const user = await this.userService.findByEmail(email);
      this.userService.validatePassword(pass, user.Password);
      return user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
