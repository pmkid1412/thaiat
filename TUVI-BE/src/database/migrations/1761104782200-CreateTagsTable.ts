import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTagsTable1761104782200 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE tags (
        id bigint PRIMARY KEY AUTO_INCREMENT,
        name varchar(255),
        created_by bigint,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at timestamp,
        CONSTRAINT fk_tags_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE tags`);
  }
}
