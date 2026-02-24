import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, IsNull, Repository } from 'typeorm';
import {
  HoroscopePrediction,
  User,
  UserHoroscope,
} from 'src/database/entities/index.entity';
import { SystemConfig } from 'src/database/entities/system-config.entity';
import { RetrieveHoroscopeResponseDto } from './dto/retrieve-horoscope.dto';
import { ErrorResponseMessage } from 'src/common/constants/message.constant';
import { ValidatorUtil } from 'src/common/utils/validator.util';
import { CreateHoroscopeRequestDto } from './dto/create-horoscope.dto';
import { PredictHoroscopeService } from '../task/predict-horoscope.service';
import { UpdateHoroscopeRequestDto } from './dto/update-horoscope.dto';
import { DateTimeUtil } from 'src/common/utils/datetime.utils';
import { UserType } from 'src/common/constants/user.constant';
import {
  HoroscopePredictionMode,
  HoroscopePredictionType,
} from 'src/common/constants/horoscope.constant';
import { SystemConfigCode } from 'src/common/constants/system-config.constant';
import { PredictHoroscopeJob } from '../task/jobs/predict-horoscope.job';
import { LunarCalendarUtil } from 'src/common/utils/lunar-calendar.util';
import {
  DUMMY_DAILY,
  DUMMY_MONTHLY,
  DUMMY_LIFETIME_HTML,
} from 'src/common/constants/dummy-horoscope.data';

@Injectable()
export class HoroscopeService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(UserHoroscope)
    private readonly userHoroscopeRepository: Repository<UserHoroscope>,
    @InjectRepository(HoroscopePrediction)
    private readonly horoscopePredictionRepository: Repository<HoroscopePrediction>,
    @InjectRepository(SystemConfig)
    private readonly systemConfigRepository: Repository<SystemConfig>,
    private readonly predictHoroscopeService: PredictHoroscopeService,
    private readonly predictHoroscopeJob: PredictHoroscopeJob,
  ) { }

  private async isDummyMode(): Promise<boolean> {
    const config = await this.systemConfigRepository.findOne({
      where: { code: SystemConfigCode.DUMMY_DATA_ENABLED },
    });
    return config?.value === 'true';
  }

  async run() {
    await this.predictHoroscopeService.predict();
  }

  async findOne(currentUser: User) {
    // temporary prevent get horoscope
    // throw new InternalServerErrorException('Tính năng đang phát triển'); // UNLOCKED

    const horoscope = await this.userHoroscopeRepository.findOne({
      where: { isUsing: true, user: { id: currentUser.id } },
      select: [
        'id',
        'name',
        'solarDateOfBirth',
        'lunarDateOfBirth',
        'isLunarLeapMonth',
        'timeOfBirth',
        'timezone',
        'gender',
      ],
    });

    if (!horoscope) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    return horoscope;
  }

  async create(dto: CreateHoroscopeRequestDto, currentUser: User) {
    // temporary prevent create horoscope
    // throw new InternalServerErrorException('Tính năng đang phát triển'); // UNLOCKED

    const horoscope = await this.userHoroscopeRepository.findOne({
      where: { isUsing: true, user: { id: currentUser.id } },
    });

    if (horoscope) {
      const error = ValidatorUtil.addCustomError('horoscope', {
        isDuplicate: ErrorResponseMessage.DATA_EXISTED,
      });
      throw new BadRequestException({ errors: [error] });
    }

    const userHoroscope = this.userHoroscopeRepository.create({
      ...dto,
      user: { id: currentUser.id },
      isUsing: true,
    });

    await this.userHoroscopeRepository.save(userHoroscope);
  }

  async update(dto: UpdateHoroscopeRequestDto, currentUser: User) {
    // temporary prevent update horoscope
    // throw new InternalServerErrorException('Tính năng đang phát triển'); // UNLOCKED

    const horoscope = await this.userHoroscopeRepository.findOne({
      where: { user: { id: currentUser.id }, ...dto },
    });

    await this.dataSource.transaction(async (manager) => {
      await manager.update(
        UserHoroscope,
        { user: { id: currentUser.id } },
        { isUsing: false },
      );

      if (horoscope) {
        await manager.update(
          UserHoroscope,
          { id: horoscope.id },
          { isUsing: true },
        );
      } else {
        const userHoroscope = manager.create(UserHoroscope, {
          ...dto,
          user: { id: currentUser.id },
          isUsing: true,
        });
        console.log('run here');

        await manager.save(UserHoroscope, userHoroscope);
      }
    });
  }

  async getHoroscopeToday(currentUser: any) {
    // Dummy mode: return generic self-help data for Apple review
    if (await this.isDummyMode()) {
      return { ...DUMMY_DAILY, date: new Date().toISOString().split('T')[0] };
    }

    const horoscope = await this.userHoroscopeRepository.findOne({
      where: {
        isUsing: true,
        user: { id: currentUser.id },
      },
    });

    if (!horoscope) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    const timezoneOffset = parseFloat(horoscope!.timezone);
    const userLocalDate = DateTimeUtil.getUserLocalDate(timezoneOffset);
    const { year, month, day } = userLocalDate;

    const { lunarDay, lunarMonth, lunarYear, lunarLeap } =
      LunarCalendarUtil.convertSolar2Lunar(day, month, year, timezoneOffset);

    const predictionDate = `${lunarYear}-${lunarMonth}-${lunarDay}`;

    const findDailyPrediction = () =>
      this.horoscopePredictionRepository.findOne({
        where: {
          userHoroscope: { id: horoscope!.id },
          type: HoroscopePredictionMode.DAILY,
          date: predictionDate,
          isLeapMonth: lunarLeap,
        },
      });

    let horoscopePrediction = await findDailyPrediction();

    if (!horoscopePrediction) {
      await this.predictHoroscopeJob.singlePredict(currentUser.id, [
        HoroscopePredictionType.DAILY,
      ]);

      horoscopePrediction = await findDailyPrediction();
      if (!horoscopePrediction) {
        return {};
      }
    }

    return horoscopePrediction?.details?.data?.daily_advice ?? {};
  }

  async getHoroscopeThisMonth(currentUser: any) {
    // Dummy mode: return generic self-help data for Apple review
    if (await this.isDummyMode()) {
      return DUMMY_MONTHLY;
    }

    if (currentUser.type !== UserType.PRO) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    const horoscope = await this.userHoroscopeRepository.findOne({
      where: {
        isUsing: true,
        user: {
          id: currentUser.id,
          userType: UserType.PRO,
        },
      },
    });

    if (!horoscope) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    const timezoneOffset = parseFloat(horoscope!.timezone);
    const userLocalDate = DateTimeUtil.getUserLocalDate(timezoneOffset);
    const { year, month, day } = userLocalDate;

    const { lunarMonth, lunarYear, lunarLeap } =
      LunarCalendarUtil.convertSolar2Lunar(day, month, year, timezoneOffset);

    const findMonthlyPrediction = () =>
      this.horoscopePredictionRepository.findOne({
        where: {
          userHoroscope: { id: horoscope!.id },
          type: HoroscopePredictionMode.MONTHLY,
          date: IsNull(),
          month: lunarMonth,
          year: lunarYear,
          isLeapMonth: lunarLeap,
        },
      });

    let horoscopePrediction = await findMonthlyPrediction();

    if (!horoscopePrediction) {
      await this.predictHoroscopeJob.singlePredict(currentUser.id, [
        HoroscopePredictionType.MONTHLY,
      ]);

      horoscopePrediction = await findMonthlyPrediction();
      if (!horoscopePrediction) {
        return {};
      }
    }

    return horoscopePrediction?.details?.data?.monthly_advice ?? {};
  }

  async getHoroscopeThisYear(currentUser: any) {
    // Dummy mode: return generic self-help data for Apple review
    if (await this.isDummyMode()) {
      return { html_report: DUMMY_LIFETIME_HTML };
    }

    if (currentUser.type !== UserType.PRO) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    const horoscope = await this.userHoroscopeRepository.findOne({
      where: {
        isUsing: true,
        user: {
          id: currentUser.id,
          userType: UserType.PRO,
        },
      },
    });

    if (!horoscope) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    const timezoneOffset = parseFloat(horoscope!.timezone);
    const userLocalDate = DateTimeUtil.getUserLocalDate(timezoneOffset);
    const { year, month, day } = userLocalDate;

    const { lunarYear } = LunarCalendarUtil.convertSolar2Lunar(
      day,
      month,
      year,
      timezoneOffset,
    );

    const findYearlyPrediction = () =>
      this.horoscopePredictionRepository.findOne({
        where: {
          userHoroscope: { id: horoscope!.id },
          type: HoroscopePredictionMode.LIFETIME,
          date: IsNull(),
          month: IsNull(),
          year: lunarYear,
        },
      });

    let horoscopePrediction = await findYearlyPrediction();

    if (!horoscopePrediction) {
      await this.predictHoroscopeJob.singlePredict(currentUser.id, [
        HoroscopePredictionType.LIFETIME,
      ]);

      horoscopePrediction = await findYearlyPrediction();
      if (!horoscopePrediction) {
        return {};
      }
    }

    return {
      html_report: horoscopePrediction?.details?.html_report ?? null,
    };
  }
}
