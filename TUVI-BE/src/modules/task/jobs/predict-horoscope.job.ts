import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CalendarType,
  HoroscopePredictionMode,
  HoroscopePredictionStatus,
  HoroscopePredictionType,
} from 'src/common/constants/horoscope.constant';
import { Gender, UserRole } from 'src/common/constants/user.constant';
import { HoroscopePredictionLog } from 'src/database/entities/horoscope-prediction-log.entity';
import { HoroscopePrediction } from 'src/database/entities/horoscope-prediction.entity';
import { SystemConfig } from 'src/database/entities/system-config.entity';
import { UserHoroscope } from 'src/database/entities/user-horoscope.entity';
import { In, Repository } from 'typeorm';

import { spawn } from 'child_process';
import { SystemConfigCode } from 'src/common/constants/system-config.constant';
import { DateTimeUtil } from 'src/common/utils/datetime.utils';
import { LunarCalendarUtil } from 'src/common/utils/lunar-calendar.util';

@Injectable()
export class PredictHoroscopeJob {
  private isRunning = false;

  constructor(
    @InjectRepository(UserHoroscope)
    private readonly userHoroscopeRepository: Repository<UserHoroscope>,
    @InjectRepository(HoroscopePrediction)
    private readonly horoscopePredictionRepository: Repository<HoroscopePrediction>,
    @InjectRepository(HoroscopePredictionLog)
    private readonly horoscopePredictionLogRepository: Repository<HoroscopePredictionLog>,
    @InjectRepository(SystemConfig)
    private readonly systemConfigRepository: Repository<SystemConfig>,
  ) { }

  async handle() {
    if (this.isRunning) {
      console.warn('Previous job still running, skipping this interval');
      return; // skip this run
    }

    this.isRunning = true;

    await this.predict();

    this.isRunning = false;
  }

  async predict() {
    const startTime = new Date().getTime();
    const env = await this.getEnv();
    console.log('env', env);

    console.log('Start predict horoscope');
    const now = new Date();
    // Daily prediction
    await this.predictDaily(env, now);

    // Monthly prediction
    const thisMonth = now.getUTCMonth() + 1;
    const thisYear = now.getUTCFullYear();
    await this.predictMonthly(env, thisMonth, thisYear);

    // Yearly prediction
    await this.predictYearly(env, thisYear);

    const endTime = new Date().getTime();
    console.log(`Finished predict horoscope in ${endTime - startTime}ms`);
  }

  private getEnv = async () => {
    const configs = await this.systemConfigRepository.find({
      where: {
        code: In([
          SystemConfigCode.AI_API_KEY,
          SystemConfigCode.OPENAI_API_KEY,
          SystemConfigCode.AI_PROVIDER_DEFAULT,
        ]),
      },
    });

    return {
      GEMINI_API_KEY:
        configs.find((config) => config.code === SystemConfigCode.AI_API_KEY)
          ?.value || '',
      OPENAI_API_KEY:
        configs.find(
          (config) => config.code === SystemConfigCode.OPENAI_API_KEY,
        )?.value || '',
      AI_PROVIDER:
        configs.find(
          (config) => config.code === SystemConfigCode.AI_PROVIDER_DEFAULT,
        )?.value || 'gemini',
    };
  };

  async singlePredict(userId: number, predictionTypes: string[] = []) {
    const startTime = new Date().getTime();
    const env = await this.getEnv();
    console.log('env', env);

    console.log('Start predict horoscope');
    const now = new Date();
    // Daily prediction
    if (predictionTypes.includes(HoroscopePredictionType.DAILY)) {
      await this.predictDaily(env, now, userId);
    }

    // Monthly prediction
    const thisMonth = now.getUTCMonth() + 1;
    const thisYear = now.getUTCFullYear();
    if (predictionTypes.includes(HoroscopePredictionType.MONTHLY)) {
      await this.predictMonthly(env, thisMonth, thisYear, userId);
    }

    // Yearly prediction
    if (predictionTypes.includes(HoroscopePredictionType.LIFETIME)) {
      await this.predictYearly(env, thisYear, userId);
    }

    const endTime = new Date().getTime();
    console.log(`Finished predict horoscope in ${endTime - startTime}ms`);
  }

  private predictDaily = async (
    env: Record<string, any>,
    now: Date,
    userId?: number,
  ) => {
    const today = now.toISOString().split('T')[0];
    console.log(`Start predict daily horoscope for ${today}`);

    const horoscopes = await this.getDailyHoroscopes(userId);

    for (const horoscope of horoscopes) {
      const timezoneOffset = parseFloat(horoscope.timezone);
      const userLocalDate = DateTimeUtil.getUserLocalDate(timezoneOffset);
      const { year, month, day } = userLocalDate;
      const lunarDateData = LunarCalendarUtil.convertSolar2Lunar(
        day,
        month,
        year,
        timezoneOffset,
      );
      const { lunarDay, lunarMonth, lunarYear, lunarLeap } = lunarDateData;
      const userLocalDateStr = `${lunarYear}-${lunarMonth}-${lunarDay}`;
      if (
        horoscope.horoscopePredictions.find(
          (hp) => hp.date === userLocalDateStr && hp.isLeapMonth === lunarLeap,
        )
      ) {
        console.log(
          `Horoscope already predicted for today for user horoscope ${horoscope.id}`,
        );
        continue;
      }

      const input = this.prepareInput(horoscope, HoroscopePredictionMode.DAILY);

      try {
        await this.runBinary(env, input, horoscope, lunarDateData);
        console.log('Horoscope prediction for today finished');
      } catch (err) {
        console.log('Error running horoscope binary', err);
      }
    }
  };

  private predictMonthly = async (
    env: Record<string, any>,
    thisMonth: number,
    thisYear: number,
    userId?: number,
  ) => {
    console.log(`Start predict monthly horoscope for ${thisMonth}/${thisYear}`);

    const horoscopes = await this.getMonthlyHoroscopes(userId);

    for (const horoscope of horoscopes) {
      const timezoneOffset = parseFloat(horoscope.timezone);
      const userLocalDate = DateTimeUtil.getUserLocalDate(timezoneOffset);
      const { year, month, day } = userLocalDate;
      const lunarDateData = LunarCalendarUtil.convertSolar2Lunar(
        day,
        month,
        year,
        timezoneOffset,
      );
      const { lunarMonth, lunarYear, lunarLeap } = lunarDateData;
      if (
        horoscope.horoscopePredictions.find(
          (hp) =>
            hp.month === lunarMonth &&
            hp.year === lunarYear &&
            hp.isLeapMonth === lunarLeap,
        )
      ) {
        console.log(
          `Horoscope already predicted this month for user horoscope ${horoscope.id}`,
        );
        continue;
      }

      const input = this.prepareInput(
        horoscope,
        HoroscopePredictionMode.MONTHLY,
      );

      try {
        await this.runBinary(env, input, horoscope, lunarDateData);
        console.log('Horoscope prediction for month finished');
      } catch (err) {
        console.log('Error running horoscope binary', err);
      }
    }
  };

  private predictYearly = async (
    env: Record<string, any>,
    thisYear: number,
    userId?: number,
  ) => {
    console.log(`Start predict yearly horoscope for ${thisYear}`);

    const horoscopes = await this.getYearlyHoroscopes(userId);

    for (const horoscope of horoscopes) {
      const timezoneOffset = parseFloat(horoscope.timezone);
      const userLocalDate = DateTimeUtil.getUserLocalDate(timezoneOffset);
      const { year, month, day } = userLocalDate;
      const lunarDateData = LunarCalendarUtil.convertSolar2Lunar(
        day,
        month,
        year,
        timezoneOffset,
      );
      const { lunarYear } = lunarDateData;
      if (horoscope.horoscopePredictions.find((hp) => hp.year === lunarYear)) {
        console.log(
          `Horoscope already predicted this year for user horoscope ${horoscope.id}`,
        );
        continue;
      }

      const input = this.prepareInput(
        horoscope,
        HoroscopePredictionMode.LIFETIME,
      );

      try {
        await this.runBinary(env, input, horoscope, lunarDateData);
        console.log('Horoscope prediction for year finished');
      } catch (err) {
        console.log('Error running horoscope binary', err);
      }
    }
  };

  prepareInput = (horoscope: UserHoroscope, mode: string): Input => {
    const timeOfBirth = horoscope.timeOfBirth.split(':');

    return {
      name: horoscope.name,
      gender: horoscope.gender === Gender.MALE ? 'Nam' : 'Nu',
      dob: horoscope.solarDateOfBirth
        ? horoscope.solarDateOfBirth
        : horoscope.lunarDateOfBirth,
      isLeapMonth: horoscope.isLunarLeapMonth,
      hour: Number(timeOfBirth[0]),
      minute: Number(timeOfBirth[1]),
      timeZone: Number(horoscope.timezone),
      calendarType: horoscope.solarDateOfBirth
        ? CalendarType.SOLAR
        : CalendarType.LUNAR,
      mode,
    };
  };

  private getDailyHoroscopes = async (userId?: number) => {
    const horoscopes = this.userHoroscopeRepository
      .createQueryBuilder('userHoroscope')
      .leftJoinAndSelect(
        'userHoroscope.horoscopePredictions',
        'horoscopePredictions',
        'horoscopePredictions.date is not null and horoscopePredictions.month is null and horoscopePredictions.year is null',
      )
      .innerJoin(
        'userHoroscope.user',
        'user',
        'user.userRole = :userRole and user.emailVerifiedAt is not null and user.deletedAt is null and user.isActive = :isActive',
        {
          userRole: UserRole.USER,
          isActive: true,
        },
      )
      .where('userHoroscope.isUsing = :isUsing', { isUsing: true });

    if (userId) {
      horoscopes.andWhere('userHoroscope.user.id = :userId', { userId });
    }

    return await horoscopes.getMany();
  };

  private getMonthlyHoroscopes = async (userId?: number) => {
    const horoscopes = this.userHoroscopeRepository
      .createQueryBuilder('userHoroscope')
      .leftJoinAndSelect(
        'userHoroscope.horoscopePredictions',
        'horoscopePredictions',
        'horoscopePredictions.date is null and horoscopePredictions.month is not null and horoscopePredictions.year is not null',
      )
      .innerJoin(
        'userHoroscope.user',
        'user',
        'user.userRole = :userRole and user.emailVerifiedAt is not null and user.deletedAt is null and user.isActive = :isActive',
        {
          userRole: UserRole.USER,
          isActive: true,
        },
      )
      .where('userHoroscope.isUsing = :isUsing', { isUsing: true });

    if (userId) {
      horoscopes.andWhere('userHoroscope.user.id = :userId', { userId });
    }
    return await horoscopes.getMany();
  };

  private getYearlyHoroscopes = async (userId?: number) => {
    const horoscopes = this.userHoroscopeRepository
      .createQueryBuilder('userHoroscope')
      .leftJoinAndSelect(
        'userHoroscope.horoscopePredictions',
        'horoscopePredictions',
        'horoscopePredictions.date is null and horoscopePredictions.month is null and horoscopePredictions.year is not null',
      )
      .innerJoin(
        'userHoroscope.user',
        'user',
        'user.userRole = :userRole and user.emailVerifiedAt is not null and user.deletedAt is null and user.isActive = :isActive',
        {
          userRole: UserRole.USER,
          isActive: true,
        },
      )
      .where('userHoroscope.isUsing = :isUsing', { isUsing: true });

    if (userId) {
      horoscopes.andWhere('userHoroscope.user.id = :userId', { userId });
    }
    return await horoscopes.getMany();
  };

  private runBinary = (
    env: Record<string, any>,
    input: Input,
    horoscope: UserHoroscope,
    userLocalDate: {
      lunarYear: number;
      lunarMonth: number;
      lunarDay: string;
      lunarLeap: boolean;
    },
  ) => {
    return new Promise<void>((resolve, reject) => {
      const child = spawn(
        process.env.PREDICTION_TOOL_PATH || '',
        [JSON.stringify(input)],
        { env, shell: false },
      );

      child.stdout.on('data', async (data: Buffer) => {
        const stringData = data.toString('utf-8');
        try {
          const parsedData = JSON.parse(stringData);
          if (!parsedData.success) {
            await this.horoscopePredictionLogRepository.save(
              this.horoscopePredictionLogRepository.create({
                userHoroscopeId: horoscope.id,
                input: JSON.stringify(input),
                output: stringData,
                status: HoroscopePredictionStatus.FAILED,
              }),
            );

            return;
          }
        } catch (err) {
          console.log('Error running horoscope binary', err);
          return;
        }

        const horoscopePredictionData: Record<string, any> = {
          userHoroscope: horoscope,
          type: input.mode,
          details: stringData,
        };
        if (input.mode === HoroscopePredictionMode.DAILY) {
          const userLocalDateStr = `${userLocalDate.lunarYear}-${userLocalDate.lunarMonth}-${userLocalDate.lunarDay}`;
          horoscopePredictionData['date'] = userLocalDateStr;
          horoscopePredictionData['isLeapMonth'] = userLocalDate.lunarLeap;
        } else if (input.mode === HoroscopePredictionMode.MONTHLY) {
          horoscopePredictionData['month'] = userLocalDate.lunarMonth;
          horoscopePredictionData['year'] = userLocalDate.lunarYear;
          horoscopePredictionData['isLeapMonth'] = userLocalDate.lunarLeap;
        } else if (input.mode === HoroscopePredictionMode.LIFETIME) {
          horoscopePredictionData['year'] = userLocalDate.lunarYear;
        }
        await this.horoscopePredictionRepository.save(
          this.horoscopePredictionRepository.create(horoscopePredictionData),
        );
      });

      child.stderr.on('data', (data) => {
        console.log(`STDERR: ${data}`);
      });

      child.on('close', (code) => {
        console.log(`Process exited with code ${code}`);
        if (code === 0) resolve();
        else reject(new Error(`Binary exited with code ${code}`));
      });

      child.on('error', (err) => {
        console.log(`Failed to start process: ${err.message}`);
        reject(err);
      });
    });
  };

  runChartOnly = (input: Input): Promise<any> => {
    return new Promise((resolve, reject) => {
      const child = spawn(
        process.env.PREDICTION_TOOL_PATH || '',
        [JSON.stringify(input)],
        { env: {}, shell: false },
      );

      let outputData = '';

      child.stdout.on('data', (data: Buffer) => {
        outputData += data.toString('utf-8');
      });

      child.stderr.on('data', (data) => {
        console.log(`CHART_ONLY STDERR: ${data}`);
      });

      child.on('close', (code) => {
        if (code === 0) {
          try {
            const parsed = JSON.parse(outputData);
            resolve(parsed);
          } catch (err) {
            reject(new Error('Failed to parse chart output'));
          }
        } else {
          reject(new Error(`Chart binary exited with code ${code}`));
        }
      });

      child.on('error', (err) => {
        reject(err);
      });
    });
  };
}

class Input {
  name: string;
  gender: string;
  dob: string;
  isLeapMonth: boolean;
  hour: number;
  minute: number;
  timeZone: number;
  calendarType: string;
  mode: string;
}
