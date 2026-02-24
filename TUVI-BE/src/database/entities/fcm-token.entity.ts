import { DBFunction } from 'src/common/constants/index.constant';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fcm_tokens')
export class FcmToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  token: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => DBFunction.CURRENT_TIMESTAMP,
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => DBFunction.CURRENT_TIMESTAMP,
  })
  updated_at: Date;
}
