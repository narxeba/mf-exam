import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticatedRequest } from '../common/auth-request.interface';
import { UpdatePipe } from './pipes/update.pipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':userId')
  @UseGuards(AuthGuard('basic'))
  public async detail(@Param() params) {
    return await this.usersService.detail(params.userId);
  }

  @Patch(':userId')
  @UseGuards(AuthGuard('basic'))
  public async update(
    @Request() request: AuthenticatedRequest,
    @Param() params,
    @Body(new UpdatePipe()) body: UpdateUserDto,
  ) {
    return await this.usersService.update(request.user, params.userId, body);
  }
}
