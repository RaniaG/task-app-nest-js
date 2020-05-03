import { IsString, IsEmail } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;
    @IsString()
    username: string;
    @IsString()
    password: string;
    @IsEmail()
    email: string;
}