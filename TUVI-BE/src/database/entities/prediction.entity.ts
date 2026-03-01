import { DBFunction } from 'src/common/constants/index.constant';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SoftDelete } from './base.entity';
import { PredictionTag } from './prediction-tag.entity';
import { Domain } from './domain.entity';
import { Evidence } from './evidence.entity';
import { AreaPrediction } from './area-prediction.entity';
import { ImpactLevel } from './impact-level.entity';
import { PredictionStatus } from './prediction-status.entity';
import { PredictionData } from './prediction-data.entity';
import { PredictionBookmark } from './prediction-bookmark.entity';

@Entity('predictions')
export class Prediction extends SoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ name: 'confidence_score' })
  confidenceScore: number;

  @Column({ name: 'prediction_date' })
  predictionDate: Date;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: 'thumbnail_url', nullable: true })
  thumbnailUrl: string;

  @Column()
  status: string;

  @Column({ name: 'created_by' })
  createdBy: number;

  @Column({ name: 'last_modified_by' })
  lastModifiedBy: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => DBFunction.CURRENT_TIMESTAMP,
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => DBFunction.CURRENT_TIMESTAMP,
    onUpdate: DBFunction.CURRENT_TIMESTAMP,
  })
  updatedAt: Date;

  @OneToMany(() => PredictionTag, (predictionTag) => predictionTag.prediction)
  predictionTags: PredictionTag[];

  @ManyToOne(() => Domain, (domain) => domain.predictions)
  @JoinColumn({ name: 'domain_id' })
  domain: Domain;

  @OneToMany(() => Evidence, (evidence) => evidence.prediction)
  evidences: Evidence[];

  @OneToMany(
    () => AreaPrediction,
    (areaPrediction) => areaPrediction.prediction,
  )
  areaPredictions: AreaPrediction[];

  @ManyToOne(() => ImpactLevel, (impactLevel) => impactLevel.predictions)
  @JoinColumn({ name: 'impact_level_id' })
  impactLevel: ImpactLevel;

  @ManyToOne(
    () => PredictionStatus,
    (predictionStatus) => predictionStatus.predictions,
  )
  @JoinColumn({ name: 'prediction_status_id' })
  predictionStatus: PredictionStatus;

  @OneToMany(
    () => PredictionData,
    (predictionData) => predictionData.prediction,
  )
  predictionData: PredictionData[];

  @OneToMany(() => PredictionBookmark, (bookmark) => bookmark.prediction)
  predictionBookmarks: PredictionBookmark[];

  evidenceCount?: number;
}
