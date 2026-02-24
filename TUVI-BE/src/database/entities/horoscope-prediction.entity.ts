import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DBFunction } from 'src/common/constants/index.constant';
import { UserHoroscope } from './user-horoscope.entity';

@Entity('horoscope_predictions')
export class HoroscopePrediction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserHoroscope, (horoscope) => horoscope.horoscopePredictions)
  @JoinColumn({ name: 'user_horoscope_id' })
  userHoroscope: UserHoroscope;

  @Column()
  type: string;

  @Column({ type: 'date' })
  date: string;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column({ name: 'is_leap_month' })
  isLeapMonth: boolean;

  @Column({ type: 'json' })
  details: Record<string, any>;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => DBFunction.CURRENT_TIMESTAMP,
  })
  createdAt: Date;
}
