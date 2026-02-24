import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language, PredictionStatus } from 'src/database/entities/index.entity';
import { PredictionStatusService } from './prediction-status.service';
import { PredictionStatusController } from './prediction-status.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PredictionStatus, Language])],
  providers: [PredictionStatusService],
  controllers: [PredictionStatusController],
  exports: [PredictionStatusService],
})
export class PredictionStatusModule {}
