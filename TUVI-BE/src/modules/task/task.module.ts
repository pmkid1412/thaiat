import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  HoroscopePrediction,
  HoroscopePredictionLog,
  SystemConfig,
  User,
  UserHoroscope,
} from 'src/database/entities/index.entity';
import { PredictHoroscopeJob } from './jobs/predict-horoscope.job';
import { BullModule } from '@nestjs/bullmq';
import { env } from 'src/config/env.config';
import { PredictHoroscopeProcessor } from './jobs/predict-horoscope.processor';
import { PredictHoroscopeService } from './predict-horoscope.service';
import { ExtendProPlanJob } from './jobs/extend-pro-plan.job';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'predict-horoscope',
      connection: {
        host: env.REDIS.HOST,
        port: env.REDIS.PORT,
      },
    }),
    TypeOrmModule.forFeature([
      User,
      UserHoroscope,
      HoroscopePrediction,
      HoroscopePredictionLog,
      SystemConfig,
    ]),
    FirebaseModule,
  ],
  providers: [
    PredictHoroscopeJob,
    PredictHoroscopeProcessor,
    PredictHoroscopeService,
    ExtendProPlanJob,
  ],
  exports: [PredictHoroscopeService, PredictHoroscopeJob],
})
export class TaskModule {}
