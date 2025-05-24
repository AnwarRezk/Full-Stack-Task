import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
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
        private readonly jwtService: JwtService
    ) {}

    async signIn(signInDto: SigninDto) : Promise<AuthResponseDto> {
      const { email, password } = signInDto;
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
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
            throw new ConflictException('User with this email already exists');
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
            message: 'Logged out successfully'
        };
    }
}
