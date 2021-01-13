import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { Helper } from 'src/util/helper';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

const { comparePassword } = Helper;

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
        private jwtService: JwtService) { }

    async login(loginDto: LoginDto) {
        const user = await this.userService.findOne(loginDto.email, true);
        if (user === null) {
            throw new HttpException(`${loginDto.email} is not a registered account`, HttpStatus.NOT_FOUND)
        }
        if (!comparePassword(user.password, loginDto.password)) {
            throw new HttpException('Password is not correct', HttpStatus.BAD_REQUEST)
        }
        const payload = { username: user.username, userId: user._id };
        return { access_token: this.jwtService.sign(payload), ...payload };
    }

    async signUp(createUserDto: CreateUserDto) {
        const newUser = await this.userService.create(createUserDto);
        const payload = { username: newUser.username, userId: newUser._id };
        return { access_token: this.jwtService.sign(payload), ...payload };
    }
}
