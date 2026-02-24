import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthSessionsTable1766631159098
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE auth_sessions (
            id CHAR(36) NOT NULL PRIMARY KEY,
            user_id bigint NOT NULL,
            refresh_token_hash VARCHAR(255) NOT NULL,
            expires_at DATETIME NOT NULL,
            max_expires_at DATETIME NULL,
            revoked_at DATETIME NULL,
            ip_address VARCHAR(45) NULL,
            user_agent VARCHAR(255) NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT fk_auth_sessions_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            INDEX idx_auth_sessions_user_id (user_id),
            INDEX idx_auth_sessions_expires_at (expires_at),
            INDEX idx_auth_sessions_revoked_at (revoked_at)
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE auth_sessions;`);
  }
}
