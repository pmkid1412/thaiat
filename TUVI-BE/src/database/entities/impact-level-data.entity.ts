import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Language } from './language.entity';
import { ImpactLevel } from './impact-level.entity';

@Entity('impact_level_data')
export class ImpactLevelData {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ManyToOne(() => ImpactLevel, (impactLevel) => impactLevel.impactLevelData)
  @JoinColumn({ name: 'impact_level_id' })
  impactLevel: ImpactLevel;

  @ManyToOne(() => Language, (language) => language.impactLevelData)
  @JoinColumn({ name: 'language_id' })
  language: Language;
}
