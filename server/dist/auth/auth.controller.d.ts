import { AuthService } from './auth.service';
import { SigninDto } from './dtos/SigninDto';
import { SignupDto } from './dtos/SignupDto';
import { AuthResponseDto } from './dtos/AuthResponseDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signInDto: SigninDto): Promise<AuthResponseDto>;
    signUp(signUpDto: SignupDto): Promise<AuthResponseDto>;
    getProfile(request: any): Promise<any>;
    signOut(): Promise<{
        success: boolean;
        message: string;
    }>;
}
