import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImpactLevel, Language } from 'src/database/entities/index.entity';
import { ListImpactLevelDto } from './dto/list-impact-level.dto';
import { LanguageName } from 'src/common/constants/language.constant';
import { LanguageIdRequestDto } from 'src/common/dtos/base-request.dto';

@Injectable()
export class ImpactLevelService {
  constructor(
    @InjectRepository(ImpactLevel)
    private readonly impactLevelRepository: Repository<ImpactLevel>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async findAll(query: LanguageIdRequestDto): Promise<ListImpactLevelDto[]> {
    let { languageId } = query;
    if (!languageId) {
      const language = await this.languageRepository.findOne({
        where: { name: LanguageName.VIETNAMESE },
      });
      languageId = language?.id;
    }

    const qb = this.impactLevelRepository.createQueryBuilder('impactLevel');

    qb.leftJoinAndSelect(
      'impactLevel.impactLevelData',
      'impactLevelData',
      'impactLevelData.language_id = :languageId',
      { languageId },
    );

    const impactLevels = await qb.getMany();

    return impactLevels.map((impactLevel) => ({
      id: impactLevel.id,
      name: impactLevel.impactLevelData?.[0]?.name ?? null,
    }));
  }
}
