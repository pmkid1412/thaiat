import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('horoscopes')
export class Horoscope {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  details: string;
}
