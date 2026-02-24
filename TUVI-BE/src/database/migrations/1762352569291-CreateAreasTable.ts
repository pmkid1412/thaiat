import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAreaTable1762352569291 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE areas (
            id bigint PRIMARY KEY AUTO_INCREMENT
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE areas`);
  }
}
