import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class PredictHoroscopeService {
  constructor(
    @InjectQueue('predict-horoscope')
    private readonly predictHoroscopeQueue: Queue,
  ) {}

  async predict() {
    try {
      await this.predictHoroscopeQueue.add('predict-horoscope', {});
      console.log(`Queued prediction job`);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Prediction failed');
    }
  }
}
