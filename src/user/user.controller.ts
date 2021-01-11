import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserMiddleware } from './user.middleware';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // private readonly userMiddleware: UserMiddleware
  ) { }

  @Post()
  // @UsePipes(new ValidationPipe())
  @ApiBearerAuth()
  async create(@Res() res, @Body() createUserDto: CreateUserDto) {
    try {
      const response = await this.userService.create(createUserDto);
      return res.status(response.httpStatus).json({
        status: response.status,
        data: response.data
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'fail',
        error: error.message
      });
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':email')
  @ApiBearerAuth()
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
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'fail',
        error: error.message
      });
    }
  }

  @Put(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+email, updateUserDto);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userService.remove(+email);
  }
}
