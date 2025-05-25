import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, Logger, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos/SigninDto';
import { SignupDto } from './dtos/SignupDto';
import { AuthGuard } from './guards/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthResponseDto } from './dtos/AuthResponseDto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        @Inject(Logger) private readonly logger: Logger
    ) {}

    @ApiOperation({ summary: 'Sign in with email and password' })
    @ApiResponse({ 
        status: HttpStatus.OK, 
        description: 'User successfully signed in',
        type: AuthResponseDto 
    })
    @ApiResponse({ 
        status: HttpStatus.UNAUTHORIZED, 
        description: 'Invalid credentials' 
    })
    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    async signIn(@Body() signInDto: SigninDto): Promise<AuthResponseDto> {
        this.logger.log(`Sign in attempt for user: ${signInDto.email}`, AuthController.name);
        return this.authService.signIn(signInDto);
    }

    @ApiOperation({ summary: 'Create a new user account' })
    @ApiResponse({ 
        status: HttpStatus.CREATED, 
        description: 'User successfully created',
        type: AuthResponseDto 
    })
    @ApiResponse({ 
        status: HttpStatus.CONFLICT, 
        description: 'User with this email already exists' 
    })
    @HttpCode(HttpStatus.CREATED)
    @Post('sign-up')
    async signUp(@Body() signUpDto: SignupDto): Promise<AuthResponseDto> {
        this.logger.log(`New user registration: ${signUpDto.email}`, AuthController.name);
        return this.authService.signUp(signUpDto);
    }

    @ApiOperation({ summary: 'Get current user profile' })
    @ApiResponse({ 
        status: HttpStatus.OK, 
        description: 'Returns the current user profile',
        schema: {
            type: 'object',
            properties: {
                _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                email: { type: 'string', example: 'user@example.com' },
                name: { type: 'string', example: 'John Doe' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
            }
        }
    })
    @ApiResponse({ 
        status: HttpStatus.UNAUTHORIZED, 
        description: 'User not authenticated' 
    })
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('me')
    async getProfile(@Request() request) {
        this.logger.log(`Profile accessed by user: ${request.user.email}`, AuthController.name);
        return request.user;
    }
    
    @ApiOperation({ summary: 'Sign out current user' })
    @ApiResponse({ 
        status: HttpStatus.OK, 
        description: 'User successfully signed out',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                message: { type: 'string', example: 'Logged out successfully' }
            }
        }
    })
    @ApiResponse({ 
        status: HttpStatus.UNAUTHORIZED, 
        description: 'User not authenticated' 
    })
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('sign-out')
    async signOut(@Request() request) {
        this.logger.log(`User signed out: ${request.user.email}`, AuthController.name);
        return this.authService.signOut();
    }
}
