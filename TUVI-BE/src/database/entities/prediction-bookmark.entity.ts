import { DBFunction } from 'src/common/constants/index.constant';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Prediction } from './prediction.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity('prediction_bookmarks')
export class PredictionBookmark {
  @ApiProperty()
  @PrimaryColumn({ name: 'prediction_id' })
  predictionId: number;

  @ApiProperty()
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @ApiProperty()
  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => DBFunction.CURRENT_TIMESTAMP,
  })
  createdAt: Date;

  @ApiProperty()
  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => DBFunction.CURRENT_TIMESTAMP,
    onUpdate: DBFunction.CURRENT_TIMESTAMP,
  })
  updated_at: Date;

  @ManyToOne(() => Prediction, (prediction) => prediction.predictionBookmarks)
  @JoinColumn({ name: 'prediction_id' })
  prediction: Prediction;

  @ManyToOne(() => User, (user) => user.predictionBookmarks)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
