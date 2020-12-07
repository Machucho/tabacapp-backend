import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { GetUser } from './get-user.decorator';
import { AuthService } from './auth.service';
import { UserEntity } from '../data/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dtos/register.dto';
import { ProfileDto } from './dtos/profile-dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly service: AuthService) {}


    @Post('/login')
    public async login(
        @Body() dto: LoginDto
    ): Promise<{user: UserEntity, accessToken: string}> {
        return this.service.login(dto);
    }

    @Get('/profile')
    @UseGuards(AuthGuard())
    public async getProfile(
        @GetUser() user: UserEntity
    ): Promise<UserEntity> {
        return this.service.getProfile(user);
    }

    @Post('/profile')
    @UseGuards(AuthGuard())
    public async updatePerfil(
        @GetUser() user: UserEntity,
        @Body() dto: ProfileDto
    ): Promise<{user: UserEntity, accessToken: string}> {
        return this.service.updateProfile(user, dto);
    }

    @Post('/register')
    public async register(
        @Body() dto: RegisterDto
    ): Promise<{accessToken: string}> {
        console.log(dto);
        return this.service.register(dto);
    }

}
