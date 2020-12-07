import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConsumptionsModule } from './consumptions/consumptions.module';
import { GoalsModule } from './goals/goals.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ConsumptionsModule,
    GoalsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
