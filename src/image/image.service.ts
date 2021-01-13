import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isEmpty } from 'class-validator';
import { Model } from 'mongoose';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(@InjectModel('Image') private imageModel: Model<Image>) { }

  async create(createImageDto: CreateImageDto): Promise<Image> {
    try {
      return await new this.imageModel(createImageDto).save();
    } catch (error) {
      const message = (!isEmpty(error._message)) ? error._message : ((!isEmpty(error.stringValue)) ? error.stringValue : error.message);
      throw new Error(message);
    }
  }

  async findAll(): Promise<Image[]> {
    return await this.imageModel.find({ public: true, available: true });
  }

  async findOne(id: string) {
    return await this.imageModel.findOne({ _id: id }).exec();
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  async remove(id: string, userId: string) {
    const image = await this.imageModel.findOne({ _id: id });
    if (image === null) {
      throw new HttpException('Image does not exist', HttpStatus.NOT_FOUND)
    }
    if (image.userId.toString() !== userId) {
      throw new HttpException('You are not authorized to delete this image', HttpStatus.UNAUTHORIZED)
    }
    image.deleteOne();
  }
}
