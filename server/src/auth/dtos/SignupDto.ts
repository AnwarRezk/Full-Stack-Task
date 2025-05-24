import { IsEmail, IsString, MinLength, Matches, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignupDto {
    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com'
    })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsString()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;
  
    @ApiProperty({
        description: 'User full name',
        example: 'John Doe',
        minLength: 3
    })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;
  
    @ApiProperty({
        description: 'User password - must contain at least one letter, one number, and one special character',
        example: 'Password123!',
        minLength: 8
    })
    @Matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
      {
        message: 'Password must contain at least one letter, one number, and one special character',
      }
    )
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}