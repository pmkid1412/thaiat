import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSystemConfigsTable1764156252484
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE system_configs (
            code varchar(255) NOT NULL PRIMARY KEY,
            name varchar(255),
            value_type varchar(255) DEFAULT 'string',
            value text,
            description text,
            last_modified_by bigint,
            created_at timestamp DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE system_configs`);
  }
}
