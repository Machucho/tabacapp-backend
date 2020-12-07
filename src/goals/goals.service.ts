
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoalRepository } from '../data/repositories/goal.repository';
import { SecurityService } from '../shared/services/security.service';
import { UtilsService } from '../shared/services/utils.service';
import { GoalEntity } from '../data/entities/goal.entity';
import { UpsertGoalDto } from './dtos/upser-goal.dto';
import { UserEntity } from '../data/entities/user.entity';
import { UserRepository } from '../data/repositories/user.repository';

@Injectable()
export class GoalsService {

  constructor(
    @InjectRepository(GoalRepository) private readonly goals: GoalRepository,
    private readonly users: UserRepository,
    private readonly security: SecurityService,
    private readonly utils: UtilsService,
  ) {}

  async getGoals(user: UserEntity, since: string, until: string): Promise<GoalEntity[]> {

    if (user.rol != 'admin'){
      throw new ForbiddenException('El ususario no es administrador');
    }
    const query = this.goals.createQueryBuilder('goal')
      .leftJoinAndSelect('goal.userE', 'user')
      .andWhere('DATE(goal.date) >= DATE(:since)', {since})
      .andWhere('DATE(goal.date) < DATE(:today)', {until});


    let items = await query.getMany();
    items.map(item => this.security.cleanUser(item.userE));

    return items;
  }

  async createGoal(user: UserEntity, dto: UpsertGoalDto): Promise<GoalEntity> {
    const item = this.goals.create();

    this.utils.fillEntityFromDto(item, dto);

    item.user = user.id;

    console.log('received goal');

    return item.save();
  }

  async updateGoal(consumptuionId: number, user: UserEntity, dto: UpsertGoalDto): Promise<GoalEntity> {
    if (user.rol != 'admin'){
      throw new ForbiddenException('El ususario no es administrador');
    }

    const item = await this.goals.findOne(consumptuionId);

    if (!item) {
      throw new NotFoundException();
    }

    this.utils.fillEntityFromDto(item, dto);


    return item.save();
  }

  public async deleteGoal(goalId: number, user: UserEntity): Promise<GoalEntity> {

    if (user.rol != 'admin'){
      throw new ForbiddenException('El ususario no es administrador');
    }

    const item = await this.goals.findOne(goalId);

    if (!item) {
      throw new NotFoundException();
    }

    // if (user.role.name != 'professional') {
    //   throw new ForbiddenException();
    // }

    return await this.goals.remove(item);
  }
}
