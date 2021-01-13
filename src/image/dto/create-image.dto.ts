import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateImageDto {
    @ApiHideProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiHideProperty()
    @IsString()
    @IsNotEmpty()
    url: string;

    @ApiHideProperty()
    @IsString()
    @IsNotEmpty()
    format: string;

    @ApiProperty({
        example: true
    })
    @IsBoolean()
    @IsNotEmpty()
    public: boolean;

    @ApiProperty({
        example: 20000
    })
    @IsNumber()
    @IsOptional()
    amount: number;

    @ApiProperty({
        example: false
    })
    @IsBoolean()
    @IsOptional()
    discount: boolean;
    
    @ApiProperty({
        example: 0
    })
    @IsNumber()
    @IsOptional()
    discountAmount: number;

    @ApiHideProperty()
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    userId: string;
}
