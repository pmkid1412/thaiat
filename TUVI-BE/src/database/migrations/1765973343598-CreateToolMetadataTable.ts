import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateToolMetadataTable1765973343598
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE tool_metadata (
            id bigint PRIMARY KEY AUTO_INCREMENT,
            tool_name varchar(255),
            tool_code varchar(100),
            language_id bigint,
            name varchar(255),
            name_code varchar(100),
            meta_key varchar(100),
            meta_value text,
            created_at timestamp DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT fk_tool_metadata_language_id FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE SET NULL,
            INDEX idx_tool_metadata_toolcode_language_namecode (tool_code, language_id, name_code)
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE tool_metadata;`);
  }
}
