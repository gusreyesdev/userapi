import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtokenService } from './jwtoken/jwtoken.service';
import { TokenDto } from './dto/token.dto';
import { RequestResponse } from './interfaces/response/request.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtokenService: JwtokenService,
  ) {}

  async login(loginDto: LoginDto): Promise<RequestResponse> {
    const { email, password } = loginDto;

    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email or Password is wrong');
    } else {
      const validPassword = bcryptjs.compareSync(password, user.password);

      if (!validPassword) {
        throw new UnauthorizedException('Password is wrong');
      }

      const payload = {
        sub: user.id,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        gender: user.gender,
        image: user.image,
        email: user.email,
      };

      const token = await this.jwtokenService.generate(payload);

      return {
        sub: user.id,
        name: user.name,
        lastname: user.lastname,
        username: user.lastname,
        gender: user.gender,
        image: user.image,
        email: user.email,
        token: token,
      };
    }
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const { email } = registerDto;

    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    return await this.usersService.create(registerDto);
  }

  async checkStatus(tokenDto: TokenDto): Promise<RequestResponse> {
    const { sub, name, lastname, username, gender, image, email } = tokenDto;

    const payload = {
      sub: Number(sub),
      name: name,
      lastname: lastname,
      username: username,
      gender: gender,
      image: image,
      email: email,
    };

    const token = await this.jwtokenService.generate(payload);

    return {
      sub: sub,
      name: name,
      lastname: lastname,
      username: username,
      gender: gender,
      image: image,
      email: email,
      token: token,
    };
  }

  async private(tokenDto: TokenDto) {
    const { email } = tokenDto;

    return await this.usersService.findOneByEmail(email);
  }
}
