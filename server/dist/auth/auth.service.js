"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signIn(signInDto) {
        const { email, password } = signInDto;
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isPasswordValid = await (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
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
    async signUp(signUpDto) {
        const { email, name, password } = signUpDto;
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map