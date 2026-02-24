import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evidence } from 'src/database/entities/evidence.entity';
import { EvidenceService } from './evidence.service';
import { EvidenceController } from './evidence.controller';
import { Prediction } from 'src/database/entities/prediction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evidence, Prediction])],
  providers: [EvidenceService],
  controllers: [EvidenceController],
  exports: [EvidenceService],
})
export class EvidenceModule {}
