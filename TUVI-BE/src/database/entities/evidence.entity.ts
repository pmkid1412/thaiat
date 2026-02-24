import { DBFunction } from 'src/common/constants/index.constant';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SoftDelete } from './base.entity';
import { Prediction } from './prediction.entity';

@Entity('evidences')
export class Evidence extends SoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  source: string;

  @Column()
  link: string;

  @Column({ name: 'published_date', type: 'date' })
  publishedDate: Date;

  @Column({ name: 'confidence_score' })
  confidenceScore: number;

  @Column()
  quote: string;

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

  @Column()
  updated_at: Date;

  @ManyToOne(() => Prediction, (prediction) => prediction.evidences)
  @JoinColumn({ name: 'prediction_id' })
  prediction: Prediction;
}
