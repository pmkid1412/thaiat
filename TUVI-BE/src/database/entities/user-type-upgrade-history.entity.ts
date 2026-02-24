import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_type_upgrade_histories')
export class UserTypeUpgradeHistory {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.upgradeHistories)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'modified_by' })
  modifiedBy: number;

  @Column({ name: 'upgrade_type' })
  upgradeType: string;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ name: 'upgrade_reason' })
  upgradeReason: string;

  @Column({ name: 'created_at' })
  createdAt: Date;
}
