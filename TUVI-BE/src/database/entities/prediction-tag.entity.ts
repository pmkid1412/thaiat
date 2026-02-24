import { DBFunction } from 'src/common/constants/index.constant';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Prediction } from './prediction.entity';
import { Tag } from './tag.entity';
import { SoftDelete } from './base.entity';

@Entity('prediction_tag')
export class PredictionTag extends SoftDelete {
  @PrimaryColumn({ name: 'prediction_id' })
  predictionId: number;

  @PrimaryColumn({ name: 'tag_id' })
  tagId: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => DBFunction.CURRENT_TIMESTAMP,
  })
  createdAt: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => Prediction, (prediction) => prediction.predictionTags)
  @JoinColumn({ name: 'prediction_id' })
  prediction: Prediction;

  @ManyToOne(() => Tag, (tag) => tag.predictionTags)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}
