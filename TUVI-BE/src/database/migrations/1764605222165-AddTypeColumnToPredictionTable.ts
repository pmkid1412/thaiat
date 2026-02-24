import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTypeColumnToPredictionTable1764605222165
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE predictions ADD COLUMN type varchar(20) DEFAULT 'Pro',
      ADD COLUMN status varchar(20) DEFAULT 'published';`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE predictions DROP COLUMN type, DROP COLUMN status;`,
    );
  }
}
