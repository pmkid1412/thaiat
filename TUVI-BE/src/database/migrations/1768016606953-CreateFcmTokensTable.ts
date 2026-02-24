import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFcmTokensTable1768016606953 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE fcm_tokens (
            id bigint PRIMARY KEY AUTO_INCREMENT,
            user_id bigint,
            token varchar(255),
            created_at timestamp DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT fk_fcm_tokens_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE fcm_tokens`);
  }
}
