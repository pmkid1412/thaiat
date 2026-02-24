import { DBFunction } from 'src/common/constants/index.constant';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PredictionTag } from './prediction-tag.entity';
import { SoftDelete } from './base.entity';

@Entity('tags')
export class Tag extends SoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'created_by' })
  createdBy: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => DBFunction.CURRENT_TIMESTAMP,
  })
  createdAt: Date;

  @Column()
  updated_at: Date;

  @OneToMany(() => PredictionTag, (predictionTag) => predictionTag.tag)
  predictionTags: PredictionTag[];
}
