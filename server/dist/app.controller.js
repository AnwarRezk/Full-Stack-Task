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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("./auth/guards/auth.guard");
const swagger_1 = require("@nestjs/swagger");
let AppController = class AppController {
    getApplication() {
        return {
            message: 'Welcome to the application',
            status: 'Success'
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get application welcome message' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Returns welcome message',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Welcome to the application' },
                status: { type: 'string', example: 'Success' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'User not authenticated'
    }),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getApplication", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiTags)('Application'),
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=app.controller.js.map