import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAreaPredictionTable1762353018972
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE area_prediction (
            area_id bigint,
            prediction_id bigint,
            created_at timestamp DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted_at timestamp,
            PRIMARY KEY (area_id, prediction_id),
            CONSTRAINT fk_area_prediction_prediction_id FOREIGN KEY (prediction_id) REFERENCES predictions(id) ON DELETE CASCADE,
            CONSTRAINT fk_area_prediction_area_id FOREIGN KEY (area_id) REFERENCES areas(id) ON DELETE CASCADE
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE area_prediction`);
  }
}
