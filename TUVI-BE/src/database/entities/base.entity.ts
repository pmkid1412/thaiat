import { DeleteDateColumn } from 'typeorm';

export class SoftDelete {
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;
}
