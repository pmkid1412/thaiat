import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserAuthProviders1761794045915
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE social_auth (
            id bigint PRIMARY KEY AUTO_INCREMENT,
            user_id bigint,
            provider varchar(100),
            provider_user_id varchar(255),
            created_at timestamp DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_user_social_auth_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE social_auth`);
  }
}
