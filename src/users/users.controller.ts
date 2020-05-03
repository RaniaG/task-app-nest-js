import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService) {
    }

}
