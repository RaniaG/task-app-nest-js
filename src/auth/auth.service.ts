import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/dtos/user.dto';

@Injectable()
export class AuthService {
    /**
     *
     */
    constructor(private userService: UsersService,
        private jwtService: JwtService) {

    }
    async validateUser(username: string, pass: string): Promise<UserDto> {
        let userIsValid = await this.userService.validateUser(username, pass);
        if (!userIsValid) {
            throw new UnauthorizedException();
        }
        let user = await this.userService.findOne(username);
        return user;
    }

    async login(user: UserDto) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
