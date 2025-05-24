import { Controller, Get, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/guards/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Application')
@Controller()
export class AppController {
  
  @ApiOperation({ summary: 'Get application welcome message' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Returns welcome message',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Welcome to the application' },
        status: { type: 'string', example: 'Success' }
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
  @Get()
  getApplication() {
    return {
      message: 'Welcome to the application',
      status: 'Success'
    };
  }
}
