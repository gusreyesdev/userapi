import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { Token } from './interfaces/token/token.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @UseGuards(AuthGuard)
  @Get('/check-status')
  async checkStatus(@Req() req: Token) {
    return await this.authService.checkStatus(req.user);
  }

  @UseGuards(AuthGuard)
  @Get('/private')
  async private(@Req() req: Token) {
    return await this.authService.private(req.user);
  }
}
