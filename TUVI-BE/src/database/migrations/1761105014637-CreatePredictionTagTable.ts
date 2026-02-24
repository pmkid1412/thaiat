import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePredictionTagTable1761105014637
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE prediction_tag (
        prediction_id bigint,
        tag_id bigint,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at timestamp,
        PRIMARY KEY (prediction_id, tag_id),
        CONSTRAINT fk_prediction_tag_prediction_id FOREIGN KEY (prediction_id) REFERENCES predictions(id) ON DELETE CASCADE,
        CONSTRAINT fk_prediction_tag_tag_id FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE prediction_tag`);
  }
}
