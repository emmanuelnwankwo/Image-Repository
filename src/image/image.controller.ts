import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, Res, UseInterceptors, UploadedFiles, Req, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Image } from './entities/image.entity';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('image')
export class ImageController {
  constructor(
    private readonly imageService: ImageService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  @Post('upload')
  @ApiBearerAuth()
  @UseInterceptors(FilesInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  async create(@Res() res, @Req() req, @UploadedFiles() files, @Body() createImageDto: CreateImageDto) {
    try {
      const data: Array<Image> = Array<Image>();
      const { userId, username } = req.user;
      for (const file of files) {
        const cloudinaryResponse = await this.cloudinaryService.upload(username, file);
        if (!cloudinaryResponse.existing) {
          createImageDto.url = cloudinaryResponse.secure_url;
          createImageDto.name = file.originalname.split('.')[0];
          createImageDto.format = cloudinaryResponse.format;
          createImageDto.userId = userId;
          const image = await this.imageService.create(createImageDto);
          data.push(image);
        }
      }
      if (data.length > 0) {
        return res.status(HttpStatus.CREATED).json({
          status: 'success',
          data
        });
      } else {
        return res.status(HttpStatus.CONFLICT).json({
          status: 'fail',
          error: 'Selected file(s) already uploaded. Kindly select new ones'
        });
      }
    } catch (error) {
      return res.status(error.status ?? HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'fail',
        error: error.message
      });
    }
  }

  @Get('publicImages')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findAll(@Res() res) {
    try {
      const images = await this.imageService.findAll();
      if (images.length > 0) {
        return res.status(HttpStatus.OK).json({
          status: 'success',
          data: images
        });
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: 'fail',
          error: 'No record found'
        });
      }
    } catch (error) {
      return res.status(error.status ?? HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'fail',
        error: error.message
      });
    }
  }

  @Get('purchased/:userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findAllPurchasedByUser(@Res() res, @Param('userId') userId: string) {
    try {
      const images = await this.imageService.findAllPurchasedByUser(userId);
      if (images.length > 0) {
        return res.status(HttpStatus.OK).json({
          status: 'success',
          data: images
        });
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: 'fail',
          error: 'No record found'
        });
      }
    } catch (error) {
      return res.status(error.status ?? HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'fail',
        error: error.message
      });
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@Res() res, @Param('id') id: string) {
    try {
      const image = await this.imageService.findOne(id);;
      if (image !== null) {
        return res.status(HttpStatus.OK).json({
          status: 'success',
          data: image
        });
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: 'fail',
          error: 'No record found'
        });
      }
    } catch (error) {
      return res.status(error.status ?? HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'fail',
        error: error.message
      });
    }
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Res() res, @Req() req, @Param('id') id: string) {
    try {
      const { userId } = req.user;
      await this.imageService.remove(id, userId);
      return res.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Image successfully deleted'
      });
    } catch (error) {
      return res.status(error.status ?? HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'fail',
        error: error.message
      });
    }
  }
}
