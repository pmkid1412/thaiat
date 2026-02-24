import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovePredictionTypeColumns1764517224620
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE predictions DROP COLUMN prediction_type;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE predictions ADD COLUMN prediction_type int;`,
    );
  }
}
