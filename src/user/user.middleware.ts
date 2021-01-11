import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { IsEmail } from 'class-validator';
import { stringify } from 'querystring';
import { UserService } from './user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private userService: UserService,) {

  }

 async use(req: any, res: any, next: () => void) {
    const { email } = req.body;
    const user = await this.userService.findOne(email);
    if (user !== null) {
      return res.status(HttpStatus.CONFLICT).json({
        status: 'fail',
        message: `User with email ${email} already exists`
      });
    }
    next();
  }
}
