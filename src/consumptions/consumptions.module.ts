import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UtilsService } from '../shared/services/utils.service';
import { SecurityService } from '../shared/services/security.service';
import { UserRepository } from '../data/repositories/user.repository';
import { ConsumptionRepository } from '../data/repositories/consumption.repository';
import { ConsumptionsController } from './consumptions.controller';
import { ConsumptionsService } from './consumptions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConsumptionRepository,
      UserRepository,
    ]),
    AuthModule,
  ],
  controllers: [ConsumptionsController],
  providers: [
    ConsumptionsService,
  
    SecurityService,
    UtilsService,
  ]
})
export class ConsumptionsModule {}
