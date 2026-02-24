import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsLeapMonthToHoroscopePredictionsTable1768468523922
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE horoscope_predictions ADD COLUMN is_leap_month BOOLEAN DEFAULT FALSE;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE horoscope_predictions DROP COLUMN is_leap_month;`,
    );
  }
}
