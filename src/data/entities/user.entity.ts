import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import * as bcrypt from 'bcryptjs';


@Entity({name: 'users'})
@Unique(['name'])
export class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  passwordHash: string;

  @Column()
  passwordSalt: string;

  @Column()
  activeToken: string;

  @Column()
  age: number;

  @Column()
  sex: string;

  @Column()
  rol: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.passwordSalt);
    return hash === this.passwordHash;
  }

}
