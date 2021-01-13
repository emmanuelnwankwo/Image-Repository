import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './image.schema';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }])
  ],
  controllers: [ImageController],
  providers: [ImageService, CloudinaryService, JwtStrategy]
})
export class ImageModule { }
