import { DBFunction } from 'src/common/constants/index.constant';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('social_auth')
export class SocialAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  provider: string;

  @Column()
  provider_user_id: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => DBFunction.CURRENT_TIMESTAMP,
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.socialAuths)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
