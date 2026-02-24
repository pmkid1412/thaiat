import { Processor, WorkerHost } from '@nestjs/bullmq';
import { PredictHoroscopeJob } from './predict-horoscope.job';
import { Job } from 'bullmq';

@Processor('predict-horoscope')
export class PredictHoroscopeProcessor extends WorkerHost {
  constructor(private readonly predictHoroscopeJob: PredictHoroscopeJob) {
    super();
  }

  async process(job: Job) {
    console.log('Received job:', job.data);

    return await this.predictHoroscopeJob.predict();
  }
}
