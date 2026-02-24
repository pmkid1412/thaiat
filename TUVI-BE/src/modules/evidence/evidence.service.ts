import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evidence, Prediction, User } from 'src/database/entities/index.entity';
import { ListEvidenceRequestDto } from './dto/list-evidence.dto';
import { CreateEvidenceRequestDto } from './dto/create-evidence.dto';
import { UpdateEvidenceRequestDto } from './dto/update-evidence.dto';
import { ErrorResponseMessage } from 'src/common/constants/message.constant';

@Injectable()
export class EvidenceService {
  constructor(
    @InjectRepository(Evidence)
    private readonly evidenceRepository: Repository<Evidence>,
    @InjectRepository(Prediction)
    private readonly predictionRepository: Repository<Prediction>,
  ) {}

  async findAll(query: ListEvidenceRequestDto) {
    const { predictionId } = query;

    return await this.evidenceRepository.find({
      where: { prediction: { id: predictionId } },
      select: [
        'id',
        'title',
        'source',
        'link',
        'publishedDate',
        'confidenceScore',
        'quote',
      ],
    });
  }

  async destroy(id: number) {
    const evidence = await this.evidenceRepository.findOne({ where: { id } });
    if (!evidence) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    return this.evidenceRepository.softRemove(evidence);
  }

  async findOne(id: number) {
    const evidence = await this.evidenceRepository.findOne({
      where: { id },
      select: [
        'id',
        'title',
        'source',
        'link',
        'publishedDate',
        'confidenceScore',
        'quote',
      ],
    });
    if (!evidence) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    return evidence;
  }

  async create(createEvidenceDto: CreateEvidenceRequestDto, currentUser: User) {
    const { predictionId, ...evidenceData } = createEvidenceDto;
    const prediction = await this.predictionRepository.findOne({
      where: { id: predictionId },
    });
    if (!prediction) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }
    const currentUserId = currentUser.id;

    return this.evidenceRepository.save({
      ...evidenceData,
      prediction: prediction,
      createdBy: currentUserId,
      lastModifiedBy: currentUserId,
    });
  }

  async update(
    id: number,
    updateEvidenceDto: UpdateEvidenceRequestDto,
    currentUser: User,
  ) {
    const evidence = await this.evidenceRepository.findOne({ where: { id } });
    if (!evidence) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    const currentUserId = currentUser.id;
    Object.assign(evidence, {
      ...updateEvidenceDto,
      lastModifiedBy: currentUserId,
    });

    return this.evidenceRepository.save(evidence);
  }
}
