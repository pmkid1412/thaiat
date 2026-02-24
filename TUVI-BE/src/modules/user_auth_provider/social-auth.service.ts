import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialAuth } from 'src/database/entities/social-auth.entity';

@Injectable()
export class SocialAuthService {
  constructor(
    @InjectRepository(SocialAuth)
    private readonly userAuthProviderRepository: Repository<SocialAuth>,
  ) {}

  async findByUserId(userId: number): Promise<SocialAuth | null> {
    return await this.userAuthProviderRepository.findOne({
      where: { user: { id: userId } },
    });
  }
}
