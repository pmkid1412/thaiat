import { DBFunction } from 'src/common/constants/index.constant';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('prediction_logs')
export class PredictionLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'prediction_id' })
  predictionId: number;

  @Column({ name: 'log_type' })
  logType: string;

  @Column()
  details: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => DBFunction.CURRENT_TIMESTAMP,
  })
  createdAt: Date;
}
