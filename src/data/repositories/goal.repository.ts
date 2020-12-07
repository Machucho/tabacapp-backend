import { EntityRepository, Repository } from 'typeorm';
import { GoalEntity } from '../entities/goal.entity';

@EntityRepository(GoalEntity)
export class GoalRepository extends Repository<GoalEntity> {}
