import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.db_host,
      username: process.env.db_user,
      password: process.env.db_password,
      database: process.env.db_name,
      ssl: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
