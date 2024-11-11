import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadDto } from '../dto/token.payload.dto';

@Injectable()
export class JwtokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generate(tokenPayloadDto: TokenPayloadDto): Promise<string> {
    const token = await this.jwtService.signAsync(tokenPayloadDto);

    return token;
  }
}
