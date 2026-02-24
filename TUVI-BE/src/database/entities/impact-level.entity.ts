import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ImpactLevelData } from './impact-level-data.entity';
import { Prediction } from './prediction.entity';

@Entity('impact_levels')
export class ImpactLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => ImpactLevelData,
    (impactLevelData) => impactLevelData.impactLevel,
  )
  impactLevelData: ImpactLevelData[];

  @OneToMany(() => Prediction, (prediction) => prediction.impactLevel)
  predictions: Prediction[];
}
