import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(user.password, salt);

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log("data", updateUserDto)
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
