import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area, Language } from 'src/database/entities/index.entity';
import { ListAreaDto } from './dto/list-area.dto';
import { LanguageName } from 'src/common/constants/language.constant';
import { LanguageIdRequestDto } from 'src/common/dtos/base-request.dto';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async findAll(query: LanguageIdRequestDto): Promise<ListAreaDto[]> {
    let { languageId } = query;
    if (!languageId) {
      const language = await this.languageRepository.findOne({
        where: { name: LanguageName.VIETNAMESE },
      });
      languageId = language?.id;
    }

    const qb = this.areaRepository.createQueryBuilder('area');

    qb.leftJoinAndSelect(
      'area.areaData',
      'areaData',
      'areaData.language_id = :languageId',
      { languageId },
    );

    const areas = await qb.getMany();

    return areas.map((area) => ({
      id: area.id,
      name: area.areaData?.[0]?.name ?? null,
    }));
  }
}
