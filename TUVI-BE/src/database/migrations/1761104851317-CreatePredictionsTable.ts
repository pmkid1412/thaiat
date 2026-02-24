import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePredictionsTable1761104851317 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE predictions (
        id bigint PRIMARY KEY AUTO_INCREMENT,
        start_date date,
        end_date date,
        domain_id bigint,
        impact_level_id bigint,
        prediction_status_id bigint,
        prediction_type int,
        prediction_date date,
        confidence_score float,
        created_by bigint,
        last_modified_by bigint,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at timestamp,
        CONSTRAINT fk_predictions_domain_id FOREIGN KEY (domain_id) REFERENCES domains(id) ON DELETE SET NULL,
        CONSTRAINT fk_predictions_impact_level_id FOREIGN KEY (impact_level_id) REFERENCES impact_levels(id) ON DELETE SET NULL,
        CONSTRAINT fk_predictions_prediction_status_id FOREIGN KEY (prediction_status_id) REFERENCES prediction_status(id) ON DELETE SET NULL,
        CONSTRAINT fk_predictions_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
        CONSTRAINT fk_predictions_last_modified_by FOREIGN KEY (last_modified_by) REFERENCES users(id) ON DELETE SET NULL
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE predictions`);
  }
}
