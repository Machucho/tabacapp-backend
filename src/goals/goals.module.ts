import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UtilsService } from '../shared/services/utils.service';
import { SecurityService } from '../shared/services/security.service';
import { UserRepository } from '../data/repositories/user.repository';
import { GoalRepository } from '../data/repositories/goal.repository';
import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GoalRepository,
      UserRepository,
    ]),
    AuthModule,
  ],
  controllers: [GoalsController],
  providers: [
    GoalsService,
  
    SecurityService,
    UtilsService,
  ]
})
export class GoalsModule {}
