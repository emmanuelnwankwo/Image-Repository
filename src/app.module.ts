import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ImageModule } from './image/image.module';
import { Env } from 'src/util/env';
import { CloudinaryService } from './service/cloudinary/cloudinary.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(Env.MongoUrl,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }),
    UserModule, 
    ImageModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule {}
