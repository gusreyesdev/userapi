import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength,  } from 'class-validator';

export class RegisterDto {
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
