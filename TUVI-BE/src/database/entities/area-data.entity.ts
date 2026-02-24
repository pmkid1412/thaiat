import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Area } from './area.entity';
import { Language } from './language.entity';

@Entity('area_data')
export class AreaData {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ManyToOne(() => Area, (area) => area.areaData)
  @JoinColumn({ name: 'area_id' })
  area: Area;

  @ManyToOne(() => Language, (language) => language.areaData)
  @JoinColumn({ name: 'language_id' })
  language: Language;
}
