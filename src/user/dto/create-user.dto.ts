import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        example: 'mike'
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ 
        example: 'mike@example.com'
     })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'password123'
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
