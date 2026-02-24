import { DBFunction } from 'src/common/constants/index.constant';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('system_configs')
export class SystemConfig {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column({ name: 'value_type' })
  valueType: string;

  @Column()
  description: string;

  @Column({ name: 'is_secure' })
  isSecure: boolean;

  @Column({ name: 'last_modified_by' })
  lastModifiedBy: number;

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
    onUpdate: DBFunction.CURRENT_TIMESTAMP,
  })
  updatedAt: Date;
}
