import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DBFunction } from 'src/common/constants/index.constant';

@Entity('horoscope_prediction_logs')
export class HoroscopePredictionLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_horoscope_id' })
  userHoroscopeId: number;

  @Column()
  input: string;

  @Column()
  output: string;

  @Column()
  status: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => DBFunction.CURRENT_TIMESTAMP,
  })
  createdAt: Date;
}
