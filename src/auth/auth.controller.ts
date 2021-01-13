import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Res() res, @Body() loginDto: LoginDto) {
    try {
      const loggedInUser = await this.authService.login(loginDto);
      return res.status(HttpStatus.CREATED).json({
        status: 'success',
        data: loggedInUser
      });
    } catch (error) {
      return res.status(error.status ?? HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'fail',
        error: error.message
      });
    }
  }

  @Post('signup')
  async signUp(@Res() res, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.authService.signUp(createUserDto);
      return res.status(HttpStatus.CREATED).json({
        status: 'success',
        data: newUser
      });
    } catch (error) {
      return res.status(error.status ?? HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'fail',
        error: error.message
      });
    }
  }
}
