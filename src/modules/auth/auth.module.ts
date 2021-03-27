import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { BasicStrategy } from './basic.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, BasicStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
