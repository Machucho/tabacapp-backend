import { Controller, UseGuards, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { ConsumptionEntity } from '../data/entities/consumption.entity';
import {  ConsumptionsService } from './consumptions.service';
import { UserEntity } from '../data/entities/user.entity';
import { UpsertConsumptionDto } from './dtos/upser-consumption.dto';

@Controller('consumptions')
@UseGuards(AuthGuard())
export class ConsumptionsController {

  constructor(private readonly service: ConsumptionsService) {}

  @Get('/')
  async getConsumptions(
        @GetUser() user: UserEntity,
        @Query('since') since: string,
        @Query('until') until: string): Promise<ConsumptionEntity[]> {
    return this.service.getConsumptions(user, since, until);
  }
  
  @Post('/')
  async createConsumption(@Body() dto: UpsertConsumptionDto, @GetUser() user: UserEntity): Promise<ConsumptionEntity> {
    return this.service.createConsumption(user, dto);
  }
  
  @Put('/:id')
  async updatePlace(@Param('id') PlaceId: number, @Body() dto: UpsertConsumptionDto, @GetUser() user: UserEntity): Promise<ConsumptionEntity> {
    return this.service.updateConsumption(PlaceId, user, dto);
  }

  @Delete('/:id')
  async deleteConsumption(@Param('id') consumptionId, @GetUser() user: UserEntity): Promise<ConsumptionEntity> {
    return this.service.deleteConsumption(consumptionId, user);
  }
}