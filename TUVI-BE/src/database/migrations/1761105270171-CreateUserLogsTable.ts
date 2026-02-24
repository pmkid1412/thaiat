import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserLogsTable1761105270171 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE user_logs (
            id bigint PRIMARY KEY AUTO_INCREMENT,
            user_id bigint,
            log_type varchar(255),
            details text,
            created_at timestamp DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_user_logs_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user_logs`);
  }
}
