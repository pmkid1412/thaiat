import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsSecureColumnToSystemConfigTable1764691667085
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE system_configs ADD COLUMN is_secure boolean DEFAULT false;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE system_configs DROP COLUMN is_secure;`,
    );
  }
}
