import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUsersTable1763225314396 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users ADD COLUMN is_active tinyint DEFAULT 1, 
        ADD COLUMN inactive_at datetime,
        ADD COLUMN auto_renew tinyint DEFAULT 0,
        ADD COLUMN pro_plan_type varchar(50),
        ADD COLUMN pro_plan_start_date datetime,
        ADD COLUMN pro_plan_end_date datetime,
        ADD COLUMN upgrade_plan_reason text;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users DROP COLUMN is_active, 
        DROP COLUMN inactive_at,
        DROP COLUMN auto_renew,
        DROP COlUMN pro_plan_type,
        DROP COLUMN pro_plan_start_date,
        DROP COLUMN pro_plan_end_date,
        DROP COLUMN upgrade_plan_reason;`,
    );
  }
}
