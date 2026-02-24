import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveAnalysisColumnFromPredictionDataTable1764603681525
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE prediction_data DROP COLUMN analysis;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE prediction_data ADD COLUMN analysis TEXT;`,
    );
  }
}
