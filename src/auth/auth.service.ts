import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { UserRepository } from '../data/repositories/user.repository';
import { SecurityService } from '../shared/services/security.service';
import { UtilsService } from '../shared/services/utils.service';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../data/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { ProfileDto } from './dtos/profile-dto';

@Injectable()
export class AuthService {

    constructor(
    private readonly jwt: JwtService,

    @InjectRepository(UserRepository) private readonly users: UserRepository,

    private readonly security: SecurityService,
    private readonly utils: UtilsService,
  ) {}


  public async login(dto: LoginDto): Promise<{user: UserEntity, accessToken: string}> {

    console.log(dto);

    const item = await this.users.findOne({name: dto.name});

    if (!item) {
      throw new UnauthorizedException('No exite ningún ususario con los datos proporcionados');
    }

    if (!(await this.validatePassword(item, dto.password))) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    if (item.activeToken != null) {
      item.activeToken = null;
      await item.save();
    }

    const { accessToken } = await this.generateAccessToken(item);
    
    return {user: this.security.cleanUser(item), accessToken};
  }

  public async getProfile(user: UserEntity): Promise<UserEntity> {
    const item = await this.users.findOne(user.id);
    if (!item) {
      throw new UnauthorizedException('No se encontró al user');
    }

    console.log(item);
    return this.security.cleanUser(item);
  }

  public async updateProfile(user: UserEntity, dto: ProfileDto): Promise<{user: UserEntity, accessToken: string}> {
    const item = await this.users.findOne(user.id);

    console.log(dto);
    for (let f of Object.keys(dto)) {
      if (dto[f] != null) {
        if (f == 'password') {
          item.passwordSalt = await this.security.generateSalt();
          item.passwordHash = await this.security.hashPassword(dto.password, item.passwordSalt);
        } else {
          item[f] = dto[f];
        }
      }
    }
    await item.save();

    const { accessToken } = await this.generateAccessToken(item);
    return {user: this.security.cleanUser(item), accessToken};;
  }

  public async register(dto: RegisterDto): Promise<{user: UserEntity, accessToken: string}> {
    const users = await this.users.createQueryBuilder('user')
      .where('user.name = :name', {name: dto.name})
      .getMany();
    
    if (users && users.length > 0) {
      throw new ForbiddenException('Ya existe un usuario con ese nombre');
    }
    
    const item = this.users.create();
    item.name = dto.name;
    item.passwordSalt = await this.security.generateSalt();
    item.passwordHash = await this.security.hashPassword(dto.password, item.passwordSalt);
    item.age = dto.age;
    item.sex = dto.sex;
    item.rol = dto.rol;

    await item.save();

    return {user: this.security.cleanUser(item), ...(await this.generateAccessToken(item))};
  }

  private async validatePassword(user: UserEntity, password: string): Promise<boolean> {
    const hash = await this.security.hashPassword(password, user.passwordSalt);
    return hash === user.passwordHash;
  }

  private async generateAccessToken(user: UserEntity) {
    const payload: JwtPayload = {
      id: user.id,
      name: user.name,
    };

    return {accessToken: this.jwt.sign(payload)};
  }
}
