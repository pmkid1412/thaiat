import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from 'src/database/entities/index.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async findAll() {
    return await this.languageRepository.find({ select: ['id', 'name'] });
  }
}
