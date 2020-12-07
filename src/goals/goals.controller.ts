import { Controller, UseGuards, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { GoalEntity } from '../data/entities/goal.entity';
import {  GoalsService } from './goals.service';
import { UserEntity } from '../data/entities/user.entity';
import { UpsertGoalDto } from './dtos/upser-goal.dto';

@Controller('goals')
@UseGuards(AuthGuard())
export class GoalsController {

  constructor(private readonly service: GoalsService) {}

  @Get('/')
  async getGoals(
        @GetUser() user: UserEntity,
        @Query('since') since: string,
        @Query('until') until: string): Promise<GoalEntity[]> {
    return this.service.getGoals(user, since, until);
  }
  
  @Post('/')
  async createGoal(@Body() dto: UpsertGoalDto, @GetUser() user: UserEntity): Promise<GoalEntity> {
    return this.service.createGoal(user, dto);
  }
  
  @Put('/:id')
  async updateGoal(@Param('id') goalId: number, @Body() dto: UpsertGoalDto, @GetUser() user: UserEntity): Promise<GoalEntity> {
    return this.service.updateGoal(goalId, user, dto);
  }

  @Delete('/:id')
  async deleteGoal(@Param('id') goalId, @GetUser() user: UserEntity): Promise<GoalEntity> {
    return this.service.deleteGoal(goalId, user);
  }
}