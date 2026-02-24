import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHoroscopesTable1759996270627 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE horoscopes (
        id bigint PRIMARY KEY AUTO_INCREMENT,
        name varchar(255),
        details json,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE horoscopes`);
  }
}
