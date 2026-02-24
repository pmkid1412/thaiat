import { DBFunction } from 'src/common/constants/index.constant';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('tool_usage')
export class ToolUsage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tool_code' })
  toolCode: string;

  @ManyToOne(() => User, (user) => user.toolUsages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'used_count' })
  usedCount: number;

  @Column({ name: 'max_usage' })
  maxUsage: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => DBFunction.CURRENT_TIMESTAMP,
  })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
