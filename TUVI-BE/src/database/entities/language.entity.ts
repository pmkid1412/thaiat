import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { AreaData } from './area-data.entity';
import { DomainData } from './domain-data.entity';
import { PredictionData } from './prediction-data.entity';
import { ImpactLevelData } from './impact-level-data.entity';
import { PredictionStatusData } from './prediction-status-data.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('languages')
export class Language {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.language)
  users: User[];

  @OneToMany(() => AreaData, (areaData) => areaData.language)
  areaData: AreaData[];

  @OneToMany(() => DomainData, (domainData) => domainData.language)
  domainData: DomainData[];

  @OneToMany(() => PredictionData, (predictionData) => predictionData.language)
  predictionData: PredictionData[];

  @OneToMany(
    () => ImpactLevelData,
    (impactLevelData) => impactLevelData.language,
  )
  impactLevelData: ImpactLevelData[];

  @OneToMany(
    () => PredictionStatusData,
    (predictionStatusData) => predictionStatusData.language,
  )
  predictionStatusData: PredictionStatusData[];
}
