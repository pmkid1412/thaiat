import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyUserTypeUpgradeHistoriesTable1763390204788
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE user_type_upgrade_histories MODIFY upgrade_type VARCHAR(50);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
