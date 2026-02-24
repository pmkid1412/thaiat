import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  HoroscopePrediction,
  UserHoroscope,
} from 'src/database/entities/index.entity';
import { SystemConfig } from 'src/database/entities/system-config.entity';
import { HoroscopeService } from './horoscope.service';
import { HoroscopeController } from './horoscope.controller';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserHoroscope, HoroscopePrediction, SystemConfig]),
    TaskModule,
  ],
  providers: [HoroscopeService],
  controllers: [HoroscopeController],
  exports: [HoroscopeService],
})
export class HoroScopeModule { }
