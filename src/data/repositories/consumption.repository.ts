import { EntityRepository, Repository } from 'typeorm';
import { ConsumptionEntity } from '../entities/consumption.entity';

@EntityRepository(ConsumptionEntity)
export class ConsumptionRepository extends Repository<ConsumptionEntity> {}
