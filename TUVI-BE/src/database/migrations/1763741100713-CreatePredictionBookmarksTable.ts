import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePredictionBookmarksTable1763741100713
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE prediction_bookmarks (
            prediction_id bigint,
            user_id bigint,
            created_at timestamp DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (prediction_id, user_id),
            CONSTRAINT fk_prediction_bookmarks_prediction_id FOREIGN KEY (prediction_id) REFERENCES predictions(id) ON DELETE CASCADE,
            CONSTRAINT fk_prediction_bookmarks_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE prediction_bookmarks;`);
  }
}
