import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { DBFunction } from 'src/common/constants/index.constant';
import { HoroscopePrediction } from './horoscope-prediction.entity';

@Entity('user_horoscopes')
export class UserHoroscope {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userHoroScopes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @Column({ name: 'solar_date_of_birth', type: 'date' })
  solarDateOfBirth: string;

  @Column({ name: 'lunar_date_of_birth', type: 'date' })
  lunarDateOfBirth: string;

  @Column({ name: 'is_lunar_leap_month' })
  isLunarLeapMonth: boolean;

  @Column({ name: 'time_of_birth' })
  timeOfBirth: string;

  @Column()
  timezone: string;

  @Column()
  gender: string;

  @Column({ name: 'is_using' })
  isUsing: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => DBFunction.CURRENT_TIMESTAMP,
  })
  createdAt: Date;

  @OneToMany(
    () => HoroscopePrediction,
    (horoscopePrediction) => horoscopePrediction.userHoroscope,
  )
  horoscopePredictions: HoroscopePrediction[];
}
