import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Prediction,
  Tag,
  Domain,
  Language,
  PredictionStatus,
} from 'src/database/entities/index.entity';
import { SystemConfig } from 'src/database/entities/system-config.entity';
import { PredictionService } from './prediction.service';
import { PredictionController } from './prediction.controller';
import { PredictionBookmark } from 'src/database/entities/prediction-bookmark.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Prediction,
      Tag,
      Domain,
      Language,
      PredictionStatus,
      PredictionBookmark,
      SystemConfig,
    ]),
  ],
  providers: [PredictionService],
  controllers: [PredictionController],
  exports: [PredictionService],
})
export class PredictionModule { }
