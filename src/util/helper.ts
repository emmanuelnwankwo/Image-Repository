import { HttpStatus, Res } from "@nestjs/common";
import { ServiceResponse } from "src/model/service-response";
import * as bcrypt from 'bcrypt';

export class Helper {

    static errorResponse(message = 'Some error occurred while processing your request', code: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR) {
        const response: ServiceResponse = {
            httpStatus: code,
            status: 'fail',
            message
        };
        return response;
    }

    static successResponse(data: object, code: HttpStatus = HttpStatus.OK): ServiceResponse {
        const response: ServiceResponse = {
            httpStatus: code,
            status: 'success',
            data: data
        };
        return response;
    }

    static comparePassword(hashedPassword: string, plainPassword: string): boolean {
        return bcrypt.compareSync(plainPassword, hashedPassword);
    }
}
