import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Language } from './language.entity';
import { Domain } from './domain.entity';

@Entity('domain_data')
export class DomainData {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ManyToOne(() => Domain, (domain) => domain.domainData)
  @JoinColumn({ name: 'domain_id' })
  domain: Domain;

  @ManyToOne(() => Language, (language) => language.domainData)
  @JoinColumn({ name: 'language_id' })
  language: Language;
}
