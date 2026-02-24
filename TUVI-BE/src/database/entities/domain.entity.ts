import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Prediction } from './prediction.entity';
import { DomainData } from './domain-data.entity';

@Entity('domains')
export class Domain {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Prediction, (prediction) => prediction.domain)
  predictions: Prediction[];

  @ApiProperty({ type: () => [DomainData] })
  @OneToMany(() => DomainData, (domainData) => domainData.domain)
  domainData: DomainData[];
}
