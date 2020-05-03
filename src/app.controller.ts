import { Controller, Get, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from './shared/validation.pipe';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly userService: UsersService,
    private readonly authService: AuthService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Post('signup')
  signUp(@Body(new ValidationPipe()) user: CreateUserDto) {
    return this.userService.createUser(user);
  }
}
