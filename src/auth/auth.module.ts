import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthMiddleware } from './auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { Env } from 'src/util/env';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: Env.JwtSecret,
      signOptions: { expiresIn: '1h' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .forRoutes({ path: 'auth/signup', method: RequestMethod.POST })
  }
}
