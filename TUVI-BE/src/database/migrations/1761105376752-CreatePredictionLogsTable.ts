import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePredictionLogsTable1761105376752
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE prediction_logs (
            id bigint PRIMARY KEY AUTO_INCREMENT,
            prediction_id bigint,
            log_type varchar(255),
            details text,
            created_at timestamp DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_prediction_logs_prediction_id FOREIGN KEY (prediction_id) REFERENCES predictions(id) ON DELETE CASCADE
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE prediction_logs`);
  }
}
