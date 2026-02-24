import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Area,
  Language,
  PredictionStatus,
} from 'src/database/entities/index.entity';
import { ListPredictionStatusDto } from './dto/list-prediction-status.dto';
import { LanguageName } from 'src/common/constants/language.constant';
import { LanguageIdRequestDto } from 'src/common/dtos/base-request.dto';

@Injectable()
export class PredictionStatusService {
  constructor(
    @InjectRepository(PredictionStatus)
    private readonly predictionStatusRepository: Repository<PredictionStatus>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async findAll(
    query: LanguageIdRequestDto,
  ): Promise<ListPredictionStatusDto[]> {
    let { languageId } = query;
    if (!languageId) {
      const language = await this.languageRepository.findOne({
        where: { name: LanguageName.VIETNAMESE },
      });
      languageId = language?.id;
    }

    const qb =
      this.predictionStatusRepository.createQueryBuilder('predictionStatus');

    qb.leftJoinAndSelect(
      'predictionStatus.predictionStatusData',
      'predictionStatusData',
      'predictionStatusData.language_id = :languageId',
      { languageId },
    );

    const predictionStatus = await qb.getMany();

    return predictionStatus.map((ps) => ({
      id: ps.id,
      name: ps.predictionStatusData?.[0]?.name ?? null,
    }));
  }
}
