import { Injectable, UnauthorizedException } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt} from 'passport-jwt';
import { UserRepository } from '../data/repositories/user.repository';
import { JwtPayload } from "./jwt-payload.interface";
import { UserEntity } from "../data/entities/user.entity";
import { jwtConfig } from "./jwt.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectRepository(UserRepository) 
    private readonly usuarios: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const {id} = payload;
    const user = this.usuarios.findOne(id);
    
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

}