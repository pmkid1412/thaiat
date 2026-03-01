import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  DataSource,
  EntityManager,
  In,
  Not,
  Repository,
} from 'typeorm';
import { Prediction } from 'src/database/entities/prediction.entity';
import {
  CreatePredictionRequestDto,
  PredictionDataRequestDto,
} from './dto/create-prediction.dto';
import {
  Evidence,
  PredictionTag,
  Tag,
  User,
  Domain,
  Language,
  PredictionData,
  AreaPrediction,
  PredictionStatus,
} from 'src/database/entities/index.entity';
import {
  LanguageName,
  Ordering,
  PredictionCategory,
  PredictionStatusName,
  PredictionType,
  UserType,
  PredictionStatusEnum,
} from 'src/common/constants/index.constant';
import {
  ListBookmarkedPredictionRequestDto,
  ListPredictionDto,
  ListPredictionRequestDto,
  ManageListPredictionRequestDto,
  RecentPrediction,
} from './dto/list-prediction.dto';
import { DateTimeUtil, ValueUtil } from 'src/common/utils/index.util';
import { UpdatePredictionRequestDto } from './dto/update-prediction.dto';
import { OverviewPredictionResponseDto } from './dto/overview-prediction.dto';
import {
  StatsPredictionByConfidenceItemDto,
  StatsPredictionByDomainItemDto,
  StatsPredictionByStatusItemDto,
} from './dto/stats-prediction.dto';
import { LanguageIdRequestDto } from 'src/common/dtos/index.dto';
import { PredictionBookmark } from 'src/database/entities/prediction-bookmark.entity';

@Injectable()
export class PredictionService {
  constructor(
    @InjectRepository(Prediction)
    private readonly predictionRepository: Repository<Prediction>,
    @InjectRepository(Domain)
    private readonly domainRepository: Repository<Domain>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
    @InjectRepository(PredictionStatus)
    private readonly predictionStatusRepository: Repository<PredictionStatus>,
    @InjectRepository(PredictionBookmark)
    private readonly predictionBookmarkRepository: Repository<PredictionBookmark>,
    private readonly dataSource: DataSource,
  ) { }

  async create(
    createPredictionDto: CreatePredictionRequestDto,
    currentUser: User,
  ): Promise<void> {
    const currentUserId = currentUser.id;
    const {
      tags,
      areas,
      domainId,
      impactLevelId,
      predictionStatusId,
      predictionData: predictionDataPayload,
      ...predictionPayload
    } = createPredictionDto;
    await this.dataSource.transaction(async (manager) => {
      const prediction = manager.create(Prediction, {
        ...predictionPayload,
        createdBy: currentUserId,
        lastModifiedBy: currentUserId,
        domain: { id: domainId },
        impactLevel: { id: impactLevelId },
        predictionStatus: { id: predictionStatusId },
      });
      await manager.save(prediction);

      await this.createPredictionData(
        manager,
        predictionDataPayload,
        prediction,
      );

      await this.createPredictionTags(manager, tags, prediction);

      await this.createAreaPredictions(manager, areas, prediction);

      return prediction;
    });
  }

  async adminGetAll(query: ManageListPredictionRequestDto) {
    const {
      languageId,
      statusId,
      search,
      type,
      page = 1,
      pageSize = 10,
    } = query;
    let filterLanguageId = await this.getDefaultLanguageId(languageId);

    const qb = this.predictionRepository.createQueryBuilder('prediction');
    qb.leftJoinAndSelect('prediction.domain', 'domain');
    qb.innerJoinAndSelect(
      'prediction.predictionData',
      'predictionData',
      'predictionData.language_id = :filterLanguageId',
      { filterLanguageId },
    );
    qb.leftJoinAndSelect(
      'domain.domainData',
      'domainData',
      'domainData.language_id = :filterLanguageId',
      {
        filterLanguageId,
      },
    );
    qb.leftJoinAndSelect('prediction.predictionStatus', 'predictionStatus');
    qb.leftJoinAndSelect(
      'predictionStatus.predictionStatusData',
      'predictionStatusData',
      'predictionStatusData.language_id = :filterLanguageId',
      {
        filterLanguageId,
      },
    );
    qb.loadRelationCountAndMap(
      'prediction.evidenceCount',
      'prediction.evidences',
    );

    qb.select([
      'prediction.id',
      'prediction.confidenceScore',
      'prediction.createdAt',
      'domain.id',
      'domainData.name',
      'predictionData.id',
      'predictionData.title',
      'predictionData.description',
      'predictionData.summary',
      'predictionStatus.id',
      'predictionStatusData.name',
      'prediction.status',
      'prediction.type',
    ]);
    qb.where('prediction.deletedAt IS NULL');

    if (ValueUtil.isNotUndefined(statusId)) {
      qb.andWhere('predictionStatus.id = :statusId', { statusId });
    }

    if (search) {
      qb.andWhere('(predictionData.title LIKE :search)', {
        search: `%${search}%`,
      });
    }

    if (type) {
      qb.andWhere('prediction.type = :type', { type });
    }

    qb.orderBy('prediction.id', Ordering.DESC)
      .skip((page - 1) * pageSize)
      .take(pageSize);

    const [data, total] = await qb.getManyAndCount();

    const dtoData: ListPredictionDto[] = data.map((prediction) => ({
      id: prediction.id,
      confidenceScore: prediction.confidenceScore,
      domainName: prediction.domain?.domainData?.[0]?.name ?? null,
      predictionStatus:
        prediction.predictionStatus?.predictionStatusData?.[0]?.name ?? null,
      title: prediction.predictionData?.[0]?.title ?? null,
      summary: prediction.predictionData?.[0]?.summary ?? null,
      description: prediction.predictionData?.[0]?.description ?? null,
      evidenceCount: prediction.evidenceCount ?? 0,
      status: prediction.status,
      type: prediction.type,
      createdAt: DateTimeUtil.convertToVNTime(prediction.createdAt),
    }));

    return {
      data: dtoData,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async freeGetAll(query: ListPredictionRequestDto) {
    const page = 1;
    const pageSize = 10;
    const { languageId, predictionType = PredictionType.DAILY } = query;
    const qb = await this.getBasePredictionListQuery({
      languageId,
    });

    qb.orderBy('prediction.predictionDate', Ordering.DESC)
      .addOrderBy('prediction.id', Ordering.DESC)
      .skip((page - 1) * pageSize)
      .take(pageSize);

    const [data, _] = await qb.getManyAndCount();
    let result: Record<string, any> = {};
    if (predictionType === PredictionType.MONTHLY) {
      result = this.convertMonthlyPredictions(data);
    } else {
      result = this.convertDailyPredictions(data);
    }

    return {
      data: result,
      total: data.length,
      page,
      pageSize,
      totalPages: page,
    };
  }

  async proGetAll(query: ListPredictionRequestDto, currentUser: User) {
    const {
      languageId,
      predictionType = PredictionType.DAILY,
      page = 1,
      pageSize = 10,
      search,
      areas,
      domains,
      status,
      confidenceScore,
      predictionFromDate,
      predictionToDate,
    } = query;
    const qb = await this.getBasePredictionListQuery(
      {
        languageId,
      },
      currentUser?.id,
    );

    if (search) {
      qb.andWhere(
        '(predictionData.title LIKE :search OR predictionData.description LIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }

    if (areas) {
      const areaIds = areas.split(',').map((areaId) => Number(areaId));
      qb.andWhere('areaPredictions.areaId IN (:areaIds)', {
        areaIds,
      });
    }

    if (domains) {
      const domainIds = domains.split(',').map((domainId) => Number(domainId));
      qb.andWhere('prediction.domain_id IN (:domainIds)', {
        domainIds,
      });
    }

    if (status) {
      const statusIds = status.split(',').map((statusId) => Number(statusId));
      qb.andWhere('predictionStatus.id IN (:statusIds)', {
        statusIds,
      });
    }

    if (confidenceScore) {
      qb.andWhere('prediction.confidenceScore >= (:confidenceScore)', {
        confidenceScore,
      });
    }

    try {
      if (predictionFromDate) {
        let predictionFromDateFilter = predictionFromDate;
        if (predictionType === PredictionType.MONTHLY) {
          const splitDate = predictionFromDate.split('-');
          predictionFromDateFilter = DateTimeUtil.getFirstDayOfMonthString(
            splitDate[0],
            splitDate[1],
          );
        }
        qb.andWhere('prediction.predictionDate >= :predictionFromDate', {
          predictionFromDate: predictionFromDateFilter,
        });
      }

      if (predictionToDate) {
        let predictionToDateFilter = predictionToDate;
        if (predictionType === PredictionType.MONTHLY) {
          const splitDate = predictionToDateFilter.split('-');
          predictionToDateFilter = DateTimeUtil.getLastDayOfMonthString(
            splitDate[0],
            splitDate[1],
          );
        }
        qb.andWhere('prediction.predictionDate <= :predictionToDate', {
          predictionToDate: predictionToDateFilter,
        });
      }
    } catch (error) {
      console.log(error);
    }

    qb.orderBy('prediction.predictionDate', Ordering.DESC)
      .addOrderBy('prediction.id', Ordering.DESC)
      .skip((page - 1) * pageSize)
      .take(pageSize);

    const [data, total] = await qb.getManyAndCount();
    let result: Record<string, any> = {};
    if (predictionType === PredictionType.MONTHLY) {
      result = this.convertMonthlyPredictions(data);
    } else {
      result = this.convertDailyPredictions(data);
    }

    return {
      data: result,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async getBookmarkedPredictions(
    query: ListBookmarkedPredictionRequestDto,
    currentUser: any,
  ) {
    if (currentUser.type !== UserType.PRO) {
      return {
        data: [],
        total: 0,
        page: 1,
        pageSize: 10,
        totalPages: 1,
      };
    }

    const { languageId, page = 1, pageSize = 10 } = query;
    const qb = await this.getBasePredictionListQuery({
      languageId,
    });
    qb.innerJoinAndSelect(
      'prediction.predictionBookmarks',
      'predictionBookmarks',
      'predictionBookmarks.userId = :user_id',
      { user_id: currentUser.id },
    );

    qb.orderBy('predictionBookmarks.createdAt', Ordering.DESC)
      .addOrderBy('prediction.predictionDate', Ordering.DESC)
      .addOrderBy('prediction.id', Ordering.DESC)
      .skip((page - 1) * pageSize)
      .take(pageSize);

    const [data, _] = await qb.getManyAndCount();
    const result = data.map((prediction) => ({
      id: prediction.id,
      confidenceScore: prediction.confidenceScore,
      domainName: prediction.domain?.domainData?.[0]?.name ?? null,
      predictionStatus:
        prediction.predictionStatus?.predictionStatusData?.[0]?.name ?? null,
      title: prediction.predictionData?.[0]?.title ?? null,
      summary: prediction.predictionData?.[0]?.summary ?? null,
      description: prediction.predictionData?.[0]?.description ?? null,
      startDate: prediction.startDate,
      endDate: prediction.endDate,
      areas: prediction.areaPredictions.map(
        (areaPrediction) => areaPrediction.area?.areaData?.[0]?.name ?? null,
      ),
      predictionDate: prediction.predictionDate,
    }));

    return {
      data: result,
      total: data.length,
      page,
      pageSize,
      totalPages: page,
    };
  }

  async findById(id: number) {
    const prediction = await this.predictionRepository.findOne({
      where: { id },
      relations: [
        'domain.domainData',
        'domain.domainData.language',
        'predictionTags.tag',
        'areaPredictions.area.areaData',
        'areaPredictions.area.areaData.language',
        'predictionStatus.predictionStatusData',
        'predictionStatus.predictionStatusData.language',
        'predictionData',
        'predictionData.language',
        'impactLevel.impactLevelData',
        'impactLevel.impactLevelData.language',
      ],
    });
    if (!prediction) {
      throw new NotFoundException('Prediction not found');
    }

    const languages = await this.languageRepository.find();

    let predictionDate: Date | string = prediction.predictionDate;
    predictionDate = `${predictionDate.getFullYear()}-${predictionDate.getMonth() + 1}-${predictionDate.getDate()}`;

    const result = {
      id: prediction.id,
      predictionDate,
      startDate: prediction.startDate,
      endDate: prediction.endDate,
      confidenceScore: prediction.confidenceScore,
      predictionStatusId: prediction.predictionStatus.id,
      domainId: prediction.domain.id,
      impactLevelId: prediction.impactLevel.id,
      type: prediction.type,
      status: prediction.status,
    };

    const predictionData = prediction.predictionData.map((pd) => {
      const language = languages.find((l) => l.id === pd.language.id);
      return {
        id: pd.id,
        title: pd.title,
        description: pd.description,
        summary: pd.summary,
        languageId: pd.language.id,
        languageName: language?.name,
      };
    });

    const domainData = prediction.domain.domainData.map((dd) => {
      const language = languages.find((l) => l.id === dd.language.id);
      return {
        id: dd.id,
        name: dd.name,
        languageId: dd.language.id,
        languageName: language?.name,
      };
    });

    const impactLevelData = prediction.impactLevel.impactLevelData.map(
      (ild) => {
        const language = languages.find((l) => l.id === ild.language.id);
        return {
          id: ild.id,
          name: ild.name,
          languageId: ild.language.id,
          languageName: language?.name,
        };
      },
    );

    const predictionStatusData =
      prediction.predictionStatus.predictionStatusData.map((psd) => {
        const language = languages.find((l) => l.id === psd.language.id);
        return {
          id: psd.id,
          name: psd.name,
          languageId: psd.language.id,
          languageName: language?.name,
        };
      });

    result['areas'] = prediction.areaPredictions.map((ap) =>
      ap.area.areaData.map((ad) => ({
        id: ad.id,
        name: ad.name,
        areaId: ap.areaId,
        languageId: ad.language.id,
        languageName: ad.language.name,
      })),
    );

    result['tags'] = prediction.predictionTags.map((pt) => pt.tag.name);
    result['predictionData'] = predictionData;
    result['domainData'] = domainData;
    result['impactLevelData'] = impactLevelData;
    result['predictionStatusData'] = predictionStatusData;

    return result;
  }

  async findByIdConverted(id: number, currentUser: User, languageId?: number) {
    const filterLanguageId = await this.getDefaultLanguageId(languageId);
    const qb = this.predictionRepository.createQueryBuilder('prediction');
    qb.leftJoinAndSelect('prediction.domain', 'domain');
    qb.leftJoinAndSelect(
      'prediction.predictionData',
      'predictionData',
      'predictionData.language_id = :filterLanguageId',
      { filterLanguageId },
    );
    qb.leftJoinAndSelect(
      'domain.domainData',
      'domainData',
      'domainData.language_id = :filterLanguageId',
      {
        filterLanguageId,
      },
    );
    qb.leftJoinAndSelect('prediction.predictionStatus', 'predictionStatus');
    qb.leftJoinAndSelect(
      'predictionStatus.predictionStatusData',
      'predictionStatusData',
      'predictionStatusData.language_id = :filterLanguageId',
      {
        filterLanguageId,
      },
    );
    qb.leftJoinAndSelect('prediction.areaPredictions', 'areaPredictions');
    qb.leftJoinAndSelect('areaPredictions.area', 'area');
    qb.leftJoinAndSelect(
      'area.areaData',
      'areaData',
      'areaData.language_id = :filterLanguageId',
      {
        filterLanguageId,
      },
    );
    qb.leftJoinAndSelect(
      'prediction.predictionBookmarks',
      'predictionBookmarks',
      'predictionBookmarks.userId = :userId',
      { userId: currentUser.id },
    );
    qb.leftJoinAndSelect('prediction.impactLevel', 'impactLevel');
    qb.leftJoinAndSelect(
      'impactLevel.impactLevelData',
      'impactLevelData',
      'impactLevelData.language_id = :filterLanguageId',
      {
        filterLanguageId,
      },
    );
    qb.leftJoinAndSelect('prediction.predictionTags', 'predictionTags');
    qb.leftJoinAndSelect('predictionTags.tag', 'tag');
    qb.leftJoinAndSelect('prediction.evidences', 'evidences');
    const selections: string[] = [
      'prediction.id',
      'prediction.confidenceScore',
      'prediction.startDate',
      'prediction.endDate',
      'domain.id',
      'domainData.name',
      'predictionData.id',
      'predictionData.title',
      'predictionData.description',
      'predictionData.summary',
      'predictionStatus.id',
      'predictionStatusData.name',
      'areaPredictions.predictionId',
      'areaPredictions.areaId',
      'area.id',
      'areaData.id',
      'areaData.name',
      'prediction.predictionDate',
      'predictionBookmarks.predictionId',
      'impactLevel.id',
      'impactLevelData.name',
      'predictionTags.predictionId',
      'predictionTags.tagId',
      'tag.id',
      'tag.name',
      'evidences.id',
      'evidences.title',
      'evidences.source',
      'evidences.link',
      'evidences.publishedDate',
      'evidences.confidenceScore',
      'evidences.quote',
      'prediction.type',
    ];
    qb.select(selections);
    qb.where('prediction.deletedAt IS NULL');
    qb.andWhere('prediction.id = :id', { id });
    qb.andWhere('prediction.status = :status', {
      status: PredictionStatusEnum.PUBLISHED,
    });
    const prediction = await qb.getOne();
    if (!prediction) {
      throw new NotFoundException('Prediction not found');
    }

    return {
      id: prediction.id,
      title: prediction.predictionData?.[0]?.title ?? null,
      domainName: prediction.domain?.domainData?.[0]?.name ?? null,
      predictionStatus:
        prediction.predictionStatus?.predictionStatusData?.[0]?.name ?? null,
      startDate: prediction.startDate,
      endDate: prediction.endDate,
      areas: prediction.areaPredictions.map(
        (areaPrediction) => areaPrediction.area?.areaData?.[0]?.name ?? null,
      ),
      confidenceScore: prediction.confidenceScore,
      summary: prediction.predictionData?.[0]?.summary ?? null,
      description: prediction.predictionData?.[0]?.description ?? null,
      impactLevel: prediction.impactLevel?.impactLevelData?.[0]?.name ?? null,
      isBookmarked: prediction.predictionBookmarks?.length > 0,
      tags: prediction.predictionTags.map((pt) => pt.tag?.name ?? null),
      evidences: prediction.evidences,
      type: prediction.type,
    };
  }

  async destroy(id: number) {
    const prediction = await this.predictionRepository.findOne({
      where: { id },
    });
    if (!prediction) {
      throw new NotFoundException('Prediction not found');
    }

    await this.dataSource.transaction(async (manager) => {
      // Delete prediction tags are not belongs to any prediction
      const predictionTags = await manager.find(PredictionTag, {
        where: { predictionId: id },
      });
      await manager.softRemove(predictionTags);

      // Delete tags are not belongs to any prediction
      const tagIds = predictionTags.map((pt) => pt.tagId);
      const tagsUsage = await manager.find(PredictionTag, {
        where: { predictionId: Not(id), tagId: In(tagIds) },
      });
      const tagIdsToDelete = tagIds.filter(
        (tagId) => !tagsUsage.find((u) => u.tagId === tagId),
      );
      await manager.softDelete(Tag, { id: In(tagIdsToDelete) });

      // Delete evidences
      await manager.softDelete(Evidence, { prediction: { id } });

      // Delete area predictions
      await manager.softDelete(AreaPrediction, { predictionId: id });

      // Delete predictions
      await manager.softDelete(Prediction, { id });
    });
  }

  async update(
    id: number,
    updatePredictionDto: UpdatePredictionRequestDto,
    currentUser: User,
  ): Promise<void> {
    const prediction = await this.predictionRepository.findOne({
      where: { id },
    });
    if (!prediction) {
      throw new NotFoundException('Prediction not found');
    }

    const currentUserId = currentUser.id;
    const {
      tags,
      areas,
      domainId,
      impactLevelId,
      predictionStatusId,
      predictionData: predictionDataPayload,
      ...predictionPayload
    } = updatePredictionDto;
    let countryNames: string[] | null = null;

    await this.dataSource.transaction(async (manager) => {
      // Update prediction
      Object.assign(prediction, {
        ...predictionPayload,
        countries: countryNames,
        createdBy: currentUserId,
        lastModifiedBy: currentUserId,
        domain: { id: domainId },
        impactLevel: { id: impactLevelId },
        predictionStatus: { id: predictionStatusId },
      });
      await manager.save(prediction);

      // Delete predictionData first
      await manager.delete(PredictionData, { prediction });

      // Create new predictionData
      await this.createPredictionData(
        manager,
        predictionDataPayload,
        prediction,
      );

      // Delete prediction_tags first
      await manager.delete(PredictionTag, { prediction });

      // Update prediction_tags
      await this.createPredictionTags(manager, tags, prediction);

      // Delete area_predictions first
      await manager.delete(AreaPrediction, { predictionId: id });

      // Create new area_predictions
      await this.createAreaPredictions(manager, areas, prediction);

      return prediction;
    });
  }

  async overview(): Promise<OverviewPredictionResponseDto> {
    const total = await this.predictionRepository.count();
    const active = await this.predictionRepository.count({
      where: {
        predictionStatus: {
          predictionStatusData: { name: PredictionStatusName.PREDICTING },
        },
      },
    });
    const occurred = await this.predictionRepository.count({
      where: {
        predictionStatus: {
          predictionStatusData: { name: PredictionStatusName.OCCURRED },
        },
      },
    });
    let accuracy = 0;
    if (total > 0) {
      accuracy = (occurred / total) * 100;
      accuracy = Math.round(accuracy * 100) / 100;
    }

    const avgConfidenceResult = await this.predictionRepository
      .createQueryBuilder('prediction')
      .select('AVG(prediction.confidenceScore)', 'average')
      .getRawOne();

    const averageConfidence = Number(avgConfidenceResult.average);

    return {
      total,
      active,
      occurred,
      accuracy,
      averageConfidence,
    };
  }

  async recentPredictions(
    query: LanguageIdRequestDto,
  ): Promise<RecentPrediction[]> {
    const { languageId } = query;
    let filterLanguageId = await this.getDefaultLanguageId(languageId);

    const qb = this.predictionRepository.createQueryBuilder('prediction');
    qb.leftJoinAndSelect('prediction.domain', 'domain');
    qb.innerJoinAndSelect(
      'prediction.predictionData',
      'predictionData',
      'predictionData.language_id = :filterLanguageId',
      { filterLanguageId },
    );
    qb.leftJoinAndSelect(
      'domain.domainData',
      'domainData',
      'domainData.language_id = :filterLanguageId',
      {
        filterLanguageId,
      },
    );
    qb.leftJoinAndSelect('prediction.predictionStatus', 'predictionStatus');
    qb.leftJoinAndSelect(
      'predictionStatus.predictionStatusData',
      'predictionStatusData',
      'predictionStatusData.language_id = :filterLanguageId',
      {
        filterLanguageId,
      },
    );
    qb.leftJoinAndSelect('prediction.areaPredictions', 'areaPredictions');
    qb.leftJoinAndSelect('areaPredictions.area', 'area');
    qb.leftJoinAndSelect(
      'area.areaData',
      'areaData',
      'areaData.language_id = :filterLanguageId',
      {
        filterLanguageId,
      },
    );

    qb.select([
      'prediction.id',
      'prediction.confidenceScore',
      'prediction.createdAt',
      'domain.id',
      'domainData.name',
      'predictionData.id',
      'predictionData.title',
      'predictionStatus.id',
      'predictionStatusData.name',
      'areaPredictions.predictionId',
      'area.id',
      'areaData.name',
    ]);
    qb.where('prediction.deletedAt IS NULL');

    const predictions = await qb
      .orderBy('prediction.createdAt', Ordering.DESC)
      .take(5)
      .getMany();

    return predictions.map((prediction) => ({
      id: prediction.id,
      confidenceScore: prediction.confidenceScore,
      domainName: prediction.domain?.domainData?.[0]?.name ?? null,
      predictionStatus:
        prediction.predictionStatus?.predictionStatusData?.[0]?.name ?? null,
      title: prediction.predictionData?.[0]?.title ?? null,
      areas: prediction.areaPredictions.map(
        (areaPrediction) => areaPrediction.area.areaData[0].name,
      ),
      createdAt: DateTimeUtil.convertToVNTime(prediction.createdAt),
    }));
  }

  async getPredictionsByDomains(query: LanguageIdRequestDto) {
    const languageId = await this.getDefaultLanguageId(query.languageId);
    const domains = await this.domainRepository.find({
      relations: ['domainData', 'domainData.language'],
    });

    const result: StatsPredictionByDomainItemDto[] = [];

    for (const domain of domains) {
      const predictionCount = await this.predictionRepository.count({
        where: { domain: domain },
      });
      result.push({
        domainName:
          domain.domainData.find((d) => d.language.id === languageId)?.name ||
          '',
        predictionCount,
      });
    }

    return result;
  }

  async getPredictionsByStatus(query: LanguageIdRequestDto) {
    const languageId = await this.getDefaultLanguageId(query.languageId);
    const predictionStatus = await this.predictionStatusRepository.find({
      relations: ['predictionStatusData', 'predictionStatusData.language'],
    });

    const result: StatsPredictionByStatusItemDto[] = [];

    for (const status of predictionStatus) {
      const predictionCount = await this.predictionRepository.count({
        where: { predictionStatus: status },
      });
      result.push({
        statusName:
          status.predictionStatusData.find((d) => d.language.id === languageId)
            ?.name || '',
        predictionCount,
      });
    }

    return result;
  }

  async getPredictionsByConfidenceRange() {
    const result: StatsPredictionByConfidenceItemDto[] = [];
    const confidenceRanges = [
      [0, 20],
      [21, 40],
      [41, 60],
      [61, 80],
      [81, 100],
    ];

    for (const range of confidenceRanges) {
      const predictionCount = await this.predictionRepository.count({
        where: { confidenceScore: Between(range[0], range[1]) },
      });
      result.push({
        confidenceRange: `${range[0]}-${range[1]}%`,
        predictionCount,
      });
    }

    return result;
  }

  async bookmark(id: number, user: User) {
    const prediction = await this.predictionRepository.findOne({
      where: { id, status: PredictionStatusEnum.PUBLISHED },
    });
    if (!prediction) {
      throw new NotFoundException('Prediction not found');
    }

    const predictionBookmark = await this.predictionBookmarkRepository.findOne({
      where: { predictionId: id, userId: user.id },
    });
    if (predictionBookmark) {
      // delete bookmark
      await this.predictionBookmarkRepository.remove(predictionBookmark);
    } else {
      // add bookmark
      const predictionBookmark = this.predictionBookmarkRepository.create({
        prediction,
        user,
      });
      await this.predictionBookmarkRepository.save(predictionBookmark);
    }
  }

  private async createPredictionData(
    manager: EntityManager,
    predictionDataPayload: PredictionDataRequestDto[],
    prediction: Prediction,
  ) {
    const predictionData = manager.create(
      PredictionData,
      predictionDataPayload.map((data) => {
        const { languageId, ...rest } = data;

        return {
          ...rest,
          prediction,
          language: { id: languageId },
        };
      }),
    );
    await manager.save(predictionData);
  }

  private async createPredictionTags(
    manager: EntityManager,
    tags: string,
    prediction: Prediction,
  ) {
    if (tags) {
      const tagNames = tags.split(',').map((name) => name.trim());

      let existingTags: Tag[] = [];
      if (tagNames && tagNames.length > 0) {
        existingTags = await manager.find(Tag, {
          where: { name: In(tagNames) },
        });

        const existingTagNames = existingTags.map((t) => t.name);

        const newTagNames = tagNames.filter(
          (name) => !existingTagNames.includes(name),
        );
        const newTags = newTagNames.map((name) =>
          manager.create(Tag, { name }),
        );
        await manager.save(newTags);

        existingTags = [...existingTags, ...newTags];
      }

      const predictionTags = manager.create(
        PredictionTag,
        existingTags.map((tag) => ({
          prediction: { id: prediction.id },
          tag: { id: tag.id },
        })),
      );

      await manager.save(predictionTags);
    }
  }

  private async createAreaPredictions(
    manager: EntityManager,
    areas: number[],
    prediction: Prediction,
  ) {
    if (areas) {
      const areaPredictions = manager.create(
        AreaPrediction,
        areas.map((areaId) => ({
          area: { id: areaId },
          prediction,
        })),
      );

      await manager.save(areaPredictions);
    }
  }

  private async getDefaultLanguageId(languageId: number | undefined) {
    if (!languageId) {
      const language = await this.languageRepository.findOne({
        where: { name: LanguageName.VIETNAMESE },
      });
      return language?.id;
    }
    return languageId;
  }

  private async getBasePredictionListQuery(
    query: ListPredictionRequestDto,
    userId?: number,
  ) {
    const { languageId } = query;
    const filterLanguageId = await this.getDefaultLanguageId(languageId);
    const qb = this.predictionRepository.createQueryBuilder('prediction');
    qb.leftJoinAndSelect('prediction.domain', 'domain');
    qb.innerJoinAndSelect(
      'prediction.predictionData',
      'predictionData',
      'predictionData.language_id = :filterLanguageId',
      { filterLanguageId },
    );
    qb.leftJoinAndSelect(
      'domain.domainData',
      'domainData',
      'domainData.language_id = :filterLanguageId',
      {
        filterLanguageId,
      },
    );
    qb.leftJoinAndSelect('prediction.predictionStatus', 'predictionStatus');
    qb.leftJoinAndSelect(
      'predictionStatus.predictionStatusData',
      'predictionStatusData',
      'predictionStatusData.language_id = :filterLanguageId',
      {
        filterLanguageId,
      },
    );
    qb.leftJoinAndSelect('prediction.areaPredictions', 'areaPredictions');
    qb.leftJoinAndSelect('areaPredictions.area', 'area');
    qb.leftJoinAndSelect(
      'area.areaData',
      'areaData',
      'areaData.language_id = :filterLanguageId',
      {
        filterLanguageId,
      },
    );
    const selections: string[] = [
      'prediction.id',
      'prediction.confidenceScore',
      'prediction.createdAt',
      'domain.id',
      'domainData.name',
      'predictionData.id',
      'predictionData.title',
      'predictionData.description',
      'predictionData.summary',
      'predictionStatus.id',
      'predictionStatusData.name',
      'areaPredictions.predictionId',
      'areaPredictions.areaId',
      'area.id',
      'areaData.id',
      'areaData.name',
      'prediction.predictionDate',
      'prediction.startDate',
      'prediction.endDate',
      'prediction.type',
    ];
    if (userId) {
      qb.leftJoinAndSelect(
        'prediction.predictionBookmarks',
        'predictionBookmarks',
        'predictionBookmarks.userId = :userId',
        { userId },
      );
      selections.push('predictionBookmarks.predictionId');
    }

    qb.select(selections);
    qb.where('prediction.deletedAt IS NULL');
    qb.andWhere('prediction.status = :status', {
      status: PredictionStatusEnum.PUBLISHED,
    });

    return qb;
  }

  private convertMonthlyPredictions(predictions: Prediction[]) {
    const result: Record<string, any> = {};
    for (const prediction of predictions) {
      const predictionDate = DateTimeUtil.convertToVNTime(
        prediction.predictionDate,
      );
      const predictionMonth = predictionDate.slice(0, -3);
      const predictionData = {
        id: prediction.id,
        confidenceScore: prediction.confidenceScore,
        domainName: prediction.domain?.domainData?.[0]?.name ?? null,
        predictionStatus:
          prediction.predictionStatus?.predictionStatusData?.[0]?.name ?? null,
        title: prediction.predictionData?.[0]?.title ?? null,
        summary: prediction.predictionData?.[0]?.summary ?? null,
        areas: prediction.areaPredictions.map(
          (areaPrediction) => areaPrediction.area?.areaData?.[0]?.name ?? null,
        ),
        predictionDate: predictionMonth,
        isBookmarked: prediction.predictionBookmarks?.length > 0,
        startDate: prediction.startDate,
        endDate: prediction.endDate,
        type: prediction.type,
      };
      if (predictionMonth in result) {
        result[predictionMonth].push(predictionData);
      } else {
        result[predictionMonth] = [predictionData];
      }
    }

    return result;
  }

  private convertDailyPredictions(predictions: Prediction[]) {
    const result: Record<string, any> = {};
    for (const prediction of predictions) {
      const predictionDate = DateTimeUtil.convertToVNTime(
        prediction.predictionDate,
      );
      const predictionData = {
        id: prediction.id,
        confidenceScore: prediction.confidenceScore,
        domainName: prediction.domain?.domainData?.[0]?.name ?? null,
        predictionStatus:
          prediction.predictionStatus?.predictionStatusData?.[0]?.name ?? null,
        title: prediction.predictionData?.[0]?.title ?? null,
        summary: prediction.predictionData?.[0]?.summary ?? null,
        areas: prediction.areaPredictions.map(
          (areaPrediction) => areaPrediction.area?.areaData?.[0]?.name ?? null,
        ),
        predictionDate,
        isBookmarked: prediction.predictionBookmarks?.length > 0,
        startDate: prediction.startDate,
        endDate: prediction.endDate,
        type: prediction.type,
      };
      if (predictionDate in result) {
        result[predictionDate].push(predictionData);
      } else {
        result[predictionDate] = [predictionData];
      }
    }

    return result;
  }
}
