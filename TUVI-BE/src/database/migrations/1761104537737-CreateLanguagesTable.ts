import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLanguagesTable1761104537737 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE languages (
            id bigint PRIMARY KEY AUTO_INCREMENT,
            name varchar(255)
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE languages`);
  }
}
