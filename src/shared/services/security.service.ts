import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../../data/entities/user.entity';

@Injectable()
export class SecurityService {

  public async generateSalt(): Promise<string> {
    return await bcrypt.genSalt();
  }

  public async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  public generateToken(length): string {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 public generateCode() {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < 6; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
 }

 public toBase64(value: string): string {
   return Buffer.from(value).toString('base64');
 }

 public fromBase64(value: string): string {
   return Buffer.from(value).toString('ascii');
 }

 public converObjectToUrlEncoded(item: any): string {
  return Object.keys(item).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(item[k])).join('&')
 }

 public cleanUser(user: UserEntity): UserEntity {
   delete user.passwordHash;
   delete user.passwordSalt;
   delete user.activeToken;
   return user;
 }

}