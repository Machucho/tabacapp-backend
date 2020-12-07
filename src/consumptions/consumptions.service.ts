
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsumptionRepository } from '../data/repositories/consumption.repository';
import { SecurityService } from '../shared/services/security.service';
import { UtilsService } from '../shared/services/utils.service';
import { ConsumptionEntity } from '../data/entities/consumption.entity';
import { UpsertConsumptionDto } from './dtos/upser-consumption.dto';
import { UserEntity } from '../data/entities/user.entity';
import { UserRepository } from '../data/repositories/user.repository';

@Injectable()
export class ConsumptionsService {

  constructor(
    @InjectRepository(ConsumptionRepository) private readonly consumptions: ConsumptionRepository,
    private readonly users: UserRepository,
    private readonly security: SecurityService,
    private readonly utils: UtilsService,
  ) {}

  async getConsumptions(user: UserEntity, since: string, until: string): Promise<ConsumptionEntity[]> {

    if (user.rol != 'admin'){
      throw new ForbiddenException('El ususario no es administrador');
    }
    const query = this.consumptions.createQueryBuilder('consumption')
      .leftJoinAndSelect('consumption.user', 'user')
      .andWhere('DATE(consumption.date) >= DATE(:since)', {since})
      .andWhere('DATE(consumption.date) < DATE(:today)', {until});

      
    let items = await query.getMany();
    items.map(item => this.security.cleanUser(item.userE));

    return items;
  }

  async createConsumption(user: UserEntity, dto: UpsertConsumptionDto): Promise<ConsumptionEntity> {
    const item = this.consumptions.create();

    this.utils.fillEntityFromDto(item, dto);

    item.user = user.id;

    console.log('received cons');

    return item.save();
  }

  async updateConsumption(consumptuionId: number, user: UserEntity, dto: UpsertConsumptionDto): Promise<ConsumptionEntity> {

    if (user.rol != 'admin'){
      throw new ForbiddenException('El ususario no es administrador');
    }

    const item = await this.consumptions.findOne(consumptuionId);

    if (!item) {
      throw new NotFoundException();
    }

    this.utils.fillEntityFromDto(item, dto);


    return item.save();
  }

  public async deleteConsumption(consumptionId: number, user: UserEntity): Promise<ConsumptionEntity> {

    if (user.rol != 'admin'){
      throw new ForbiddenException('El ususario no es administrador');
    }

    const item = await this.consumptions.findOne(consumptionId);

    if (!item) {
      throw new NotFoundException();
    }

    // if (user.role.name != 'professional') {
    //   throw new ForbiddenException();
    // }

    return await this.consumptions.remove(item);
  }
}
