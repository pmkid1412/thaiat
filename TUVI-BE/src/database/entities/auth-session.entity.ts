import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth_sessions')
export class AuthSession {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'refresh_token_hash' })
  refreshTokenHash: string;

  @Column({ name: 'expires_at' })
  expiresAt: Date;

  @Column({ name: 'max_expires_at' })
  maxExpiresAt: Date;

  @Column({ name: 'revoked_at' })
  revokedAt: Date;

  @Column({ name: 'ip_address' })
  ipAddress: string;

  @Column({ name: 'user_agent' })
  userAgent: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
