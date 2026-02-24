import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tool_metadata')
export class ToolMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tool_name' })
  toolName: string;

  @Column({ name: 'tool_code' })
  toolCode: string;

  @Column({ name: 'language_id' })
  languageId: number;

  @Column()
  name: string;

  @Column({ name: 'name_code' })
  nameCode: string;

  @Column({ name: 'meta_key' })
  metaKey: string;

  @Column({ name: 'meta_value' })
  metaValue: string;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'updated_at' })
  updatedAt: string;
}
