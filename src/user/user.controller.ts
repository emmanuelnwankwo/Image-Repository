import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, Res, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':email')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@Res() res, @Param('email') email: string) {
    try {
      const user = await this.userService.findOne(email);
      if (user === null) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: 'fail',
          message: `User with email ${email} does not exist`
        });
      } else {
        return res.status(HttpStatus.OK).json({
          status: 'success',
          data: user
        });
      }
    } catch (error) {
      return res.status(error.status ?? HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'fail',
        error: error.message
      });
    }
  }

  @Put(':email')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+email, updateUserDto);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userService.remove(+email);
  }
}
