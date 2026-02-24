import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImpactLevel, Language } from 'src/database/entities/index.entity';
import { ImpactLevelService } from './impact-level.service';
import { ImpactLevelController } from './impact-level.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ImpactLevel, Language])],
  providers: [ImpactLevelService],
  controllers: [ImpactLevelController],
  exports: [ImpactLevelService],
})
export class ImpactLevelModule {}
