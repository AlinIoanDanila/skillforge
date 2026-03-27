import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';

import { UsersService } from '@/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @HttpCode(HttpStatus.OK)
  // @Get('')
  // getUsers() {
  //   return this.usersService.getAllUsers();
  // }

  // @HttpCode(HttpStatus.CREATED)
  // @Post('register')
  // registerNewUser(@Request() request){
  //   const user = request.user;
  //   console.log(user);
  //   return
  // }
}
