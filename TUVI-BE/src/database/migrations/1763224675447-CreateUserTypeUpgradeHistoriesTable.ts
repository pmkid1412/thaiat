import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTypeUpgradeHistoriesTable1763224675447
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE user_type_upgrade_histories (
            id bigint PRIMARY KEY AUTO_INCREMENT,
            user_id bigint,
            modified_by bigint,
            upgrade_type int,
            start_date datetime,
            end_date datetime,
            upgrade_reason text,
            created_at timestamp DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_user_type_upgrade_histories_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            CONSTRAINT fk_user_type_upgrade_histories_modified_by FOREIGN KEY (modified_by) REFERENCES users(id) ON DELETE SET NULL
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user_type_upgrade_histories;`);
  }
}
