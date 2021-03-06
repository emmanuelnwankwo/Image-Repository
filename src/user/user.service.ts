import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isEmpty } from 'class-validator';
import { Model } from 'mongoose';
import { ServiceResponse } from 'src/model/service-response';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Helper } from 'src/util/helper';

const { successResponse, errorResponse } = Helper;

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
     const newUser = await new this.userModel(createUserDto).save();
      return { username: createUserDto.username, email: createUserDto.email, _id: newUser._id};
    } catch (error) {
      const message = (!isEmpty(error._message)) ? error._message : ((!isEmpty(error.stringValue)) ? error.stringValue : error.message);
      throw new Error(message);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(email: string, showPassword: boolean = false): Promise<User> {
    if (showPassword) {
      return await this.userModel.findOne({ email }).select('+password').exec();
    } else {
      return await this.userModel.findOne({ email }).exec();
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
