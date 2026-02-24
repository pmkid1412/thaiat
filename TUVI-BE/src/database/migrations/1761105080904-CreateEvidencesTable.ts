import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEvidencesTable1761105080904 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE evidences (
        id bigint PRIMARY KEY AUTO_INCREMENT,
        prediction_id bigint,
        title varchar(255),
        source text,
        link text,
        published_date date,
        confidence_score float,
        quote text,
        created_by bigint,
        last_modified_by bigint,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at timestamp,
        CONSTRAINT fk_evidences_prediction_id FOREIGN KEY (prediction_id) REFERENCES predictions(id) ON DELETE CASCADE,
        CONSTRAINT fk_evidences_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
        CONSTRAINT fk_evidences_last_modified_by FOREIGN KEY (last_modified_by) REFERENCES users(id) ON DELETE SET NULL
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE evidences`);
  }
}
