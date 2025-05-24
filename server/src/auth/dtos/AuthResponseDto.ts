import { ApiProperty } from "@nestjs/swagger";

export class AuthResponseDto {
    @ApiProperty({
        description: 'Unique identifier of the user',
        example: '507f1f77bcf86cd799439011'
    })
    userId: string;
    
    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com'
    })
    email: string;

    @ApiProperty({
        description: 'User full name',
        example: 'John Doe'
    })
    name: string;
    
    @ApiProperty({
        description: 'JWT access token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    })
    access_token: string;
}