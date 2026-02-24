import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateToolUsageTable1766204395573 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE tool_usage (
            id bigint PRIMARY KEY AUTO_INCREMENT,
            tool_code varchar(100),
            user_id bigint,
            used_count bigint DEFAULT 0,
            max_usage bigint DEFAULT 0,
            created_at timestamp DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT fk_tool_usage_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            UNIQUE (tool_code, user_id)
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE tool_usage;`);
  }
}
