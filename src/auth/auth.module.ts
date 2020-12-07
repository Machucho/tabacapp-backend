import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../data/repositories/user.repository';
import { jwtConfig } from './jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { SecurityService } from '../shared/services/security.service';
import { UtilsService } from '../shared/services/utils.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: jwtConfig.secret
    }),
    TypeOrmModule.forFeature([
      UserRepository,
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService,

    JwtStrategy,

    SecurityService,
    UtilsService,
  ],
  exports: [
    JwtStrategy,
    PassportModule,
  ]
})
export class AuthModule {}
