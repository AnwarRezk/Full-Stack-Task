import { IsEmail, IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SigninDto {
    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com'
    })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty({ message: 'Password is required' })
    email: string;
  
    @ApiProperty({
        description: 'User password',
        example: 'Password123!',
        minLength: 8
    })
    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    password: string;
}