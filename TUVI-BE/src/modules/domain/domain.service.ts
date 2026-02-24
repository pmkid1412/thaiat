import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Domain, Language } from 'src/database/entities/index.entity';
import { ListDomainDto } from './dto/list-domain.dto';
import { LanguageName } from 'src/common/constants/language.constant';
import { LanguageIdRequestDto } from 'src/common/dtos/base-request.dto';

@Injectable()
export class DomainService {
  constructor(
    @InjectRepository(Domain)
    private readonly domainRepository: Repository<Domain>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async findAll(query: LanguageIdRequestDto): Promise<ListDomainDto[]> {
    let { languageId } = query;
    if (!languageId) {
      const language = await this.languageRepository.findOne({
        where: { name: LanguageName.VIETNAMESE },
      });
      languageId = language?.id;
    }

    const qb = this.domainRepository.createQueryBuilder('domain');

    qb.leftJoinAndSelect(
      'domain.domainData',
      'domainData',
      'domainData.language_id = :languageId',
      { languageId },
    );

    const domains = await qb.getMany();

    return domains.map((domain) => ({
      id: domain.id,
      name: domain.domainData?.[0]?.name ?? null,
    }));
  }
}
