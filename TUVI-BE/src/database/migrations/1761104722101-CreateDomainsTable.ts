import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDomainsTable1761104722101 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE domains (
        id bigint PRIMARY KEY AUTO_INCREMENT
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE domains`);
  }
}
