import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { DBFunction } from 'src/common/constants/index.constant';

@Entity('user_logs')
export class UserLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

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

  @ManyToOne(() => User, (user) => user.logs)
  @JoinColumn({ name: 'user_id' })
  user: Promise<User>;
}
