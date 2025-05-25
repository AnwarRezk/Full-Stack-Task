import { ConflictException, Injectable, UnauthorizedException, Logger, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SigninDto } from './dtos/SigninDto';
import { AuthResponseDto } from './dtos/AuthResponseDto';
import { SignupDto } from './dtos/SignupDto';
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService, 
        private readonly jwtService: JwtService,
        @Inject(Logger) private readonly logger: Logger
    ) {}

    async signIn(signInDto: SigninDto) : Promise<AuthResponseDto> {
      const { email, password } = signInDto;
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        this.logger.warn(`Failed sign in attempt: user not found - ${email}`, AuthService.name);
        throw new UnauthorizedException('The email or password you entered is incorrect. Please try again.');
      }

      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        this.logger.warn(`Failed sign in attempt: invalid password - ${email}`, AuthService.name);
        throw new UnauthorizedException('The email or password you entered is incorrect. Please try again.');
      }

      const payload = { sub: user._id, email: user.email };
      const accessToken = await this.jwtService.signAsync(payload);

      return {
        userId: user._id.toString(),
        email: user.email,
        name: user.name,
        access_token: accessToken,
      };
    }

    async signUp(signUpDto: SignupDto) : Promise<AuthResponseDto> {
        const { email, name, password } = signUpDto;
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            this.logger.warn(`Registration failed: email already exists - ${email}`, AuthService.name);
            throw new ConflictException('An account with this email already exists. Please try signing in instead.');
        }

        const hashedPassword = await hash(password, 10);
        const user = await this.usersService.create({ email, name, password: hashedPassword });

        const payload = { sub: user._id, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload);

        return {
            userId: user._id.toString(),
            email: user.email,
            name: user.name,
            access_token: accessToken,
        };
    }

    async signOut() {
        return {
            success: true,
            message: 'You have been successfully signed out.'
        };
    }
}
