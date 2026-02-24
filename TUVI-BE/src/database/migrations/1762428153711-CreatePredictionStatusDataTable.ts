import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePredictionStatusDataTable1762428153711
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE prediction_status_data (
            id bigint PRIMARY KEY AUTO_INCREMENT,
            prediction_status_id bigint,
            language_id bigint,
            name varchar(255),

            CONSTRAINT fk_prediction_status_data_prediction_status_id FOREIGN KEY (prediction_status_id) REFERENCES prediction_status(id) ON DELETE CASCADE,
            CONSTRAINT fk_prediction_status_data_language_id FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE prediction_status_data`);
  }
}
