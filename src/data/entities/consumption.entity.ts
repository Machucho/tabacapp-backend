import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';


@Entity({name: 'consumptions'})
export class ConsumptionEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  user: number;

  @OneToOne(type => UserEntity)
  @JoinColumn({name: 'user', referencedColumnName: 'id'})
  userE: UserEntity;
}
