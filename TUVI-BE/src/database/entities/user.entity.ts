import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserLog } from './user-log.entity';
import {
  DBFunction,
  UserRole,
  UserType,
} from 'src/common/constants/index.constant';
import { SoftDelete } from './base.entity';
import { Language } from './language.entity';
import { SocialAuth } from './social-auth.entity';
import { UserTypeUpgradeHistory } from './user-type-upgrade-history.entity';
import { PredictionBookmark } from './prediction-bookmark.entity';
import { UserHoroscope } from './user-horoscope.entity';
import { ToolUsage } from './tool-usage.entity';

@Entity('users')
export class User extends SoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ name: 'email_verified_at', type: 'timestamp' })
  emailVerifiedAt: Date;

  @Column({
    name: 'verification_code',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  verificationCode: string | null;

  @Column({
    name: 'verification_code_expires',
    type: 'timestamp',
    nullable: true,
  })
  verificationCodeExpires: Date | null;

  @Column({
    name: 'password_reset_code',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  passwordResetCode: string | null;

  @Column({
    name: 'password_reset_code_expires',
    type: 'timestamp',
    nullable: true,
  })
  passwordResetCodeExpires: Date | null;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column({ name: 'date_of_birth', type: 'date' })
  dateOfBirth: Date;

  @Column({ name: 'time_of_birth', type: 'time' })
  timeOfBirth: string;

  @Column({ name: 'place_of_birth' })
  placeOfBirth: string;

  @Column({ name: 'user_type', default: 0, enum: UserType })
  userType: number;

  @Column({ name: 'user_role', default: 1, enum: UserRole })
  userRole: number;

  @Column()
  timezone: string;

  @Column()
  password: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @ManyToOne(() => Language, (language) => language.users)
  @JoinColumn({ name: 'language_id' })
  language: Language;

  @Column({ name: 'horoscope_id' })
  horoscopeId: number;

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

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'inactive_at', type: 'timestamp', nullable: true })
  inactiveAt: Date | null;

  @Column({ name: 'auto_renew', default: false })
  autoRenew: boolean;

  @Column({
    name: 'pro_plan_type',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  proPlanType: string | null;

  @Column({ name: 'pro_plan_start_date', type: 'timestamp', nullable: true })
  proPlanStartDate: Date | null;

  @Column({ name: 'pro_plan_end_date', type: 'timestamp', nullable: true })
  proPlanEndDate: Date | null;

  @Column({ name: 'upgrade_plan_reason', type: 'text', nullable: true })
  upgradePlanReason: string | null;

  @OneToMany(() => UserLog, (log) => log.user)
  logs: Promise<UserLog[]>;

  @OneToMany(() => SocialAuth, (socialAuth) => socialAuth.user)
  socialAuths: SocialAuth[];

  @OneToMany(() => UserTypeUpgradeHistory, (history) => history.user)
  upgradeHistories: UserTypeUpgradeHistory[];

  @OneToMany(() => PredictionBookmark, (bookmark) => bookmark.user)
  predictionBookmarks: PredictionBookmark[];

  @OneToMany(() => UserHoroscope, (horoscope) => horoscope.user)
  userHoroScopes: UserHoroscope[];

  @OneToMany(() => ToolUsage, (toolUsage) => toolUsage.user)
  toolUsages: ToolUsage[];
}
