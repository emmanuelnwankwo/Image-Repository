import { HttpStatus } from "@nestjs/common";

export class ServiceResponse {
    httpStatus: HttpStatus;
    status: string;
    message?: string;
    data?: object;
}
