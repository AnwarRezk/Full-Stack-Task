import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SigninDto } from './dtos/SigninDto';
import { AuthResponseDto } from './dtos/AuthResponseDto';
import { SignupDto } from './dtos/SignupDto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(signInDto: SigninDto): Promise<AuthResponseDto>;
    signUp(signUpDto: SignupDto): Promise<AuthResponseDto>;
    signOut(): Promise<{
        success: boolean;
        message: string;
    }>;
}
