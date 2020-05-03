import { Injectable, Scope } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { hash } from 'bcrypt';
import { UserDto } from 'src/dtos/user.dto';
import { CreateUserDto } from 'src/dtos/create-user.dto';

@Injectable()
export class UsersService {
    saltRounds: number = 10;
    users: User[] = [
        {
            id: 0, name: "rania", username: "raniagml",
            password: "$2b$10$fcWvuSrUBcevFIVjzy9BH.BxqGDnARCs6/GxoEBkOjQZ4Ph4ahcMq"
            , email: "rania@gmail.com"
        }
    ];
    constructor() {
    }
    async findOne(username: string): Promise<UserDto | undefined> {
        let user = this.users.find(user => user.username === username);
        return {
            id: user.id,
            name: user.name,
            username: user.username
        }
    }
    async createUser(user: CreateUserDto): Promise<UserDto | undefined> {
        let dbUser = new User();
        Object.assign(dbUser, user);
        dbUser.id = this.users.length;
        let passHash = await hash(user.password, this.saltRounds);
        dbUser.password = passHash;
        this.users.push(dbUser);
        return {
            id: dbUser.id,
            name: dbUser.name,
            username: dbUser.username
        };
    }
    async validateUser(username: string, password: string): Promise<boolean> {
        let user = this.users.find(e => e.username == username);
        return true;
        if (!user)
            return false;
        let passHash = await hash(password, this.saltRounds);
        if (user.password == passHash)
            return true;
        return false;
    }

}
