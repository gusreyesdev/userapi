import { Transform } from 'class-transformer';
import {
  IsString,
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  
} from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  lastname: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  username: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  gender: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  image?: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  password: string;
}
