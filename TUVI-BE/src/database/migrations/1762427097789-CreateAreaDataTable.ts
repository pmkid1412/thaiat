import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAreaDataTable1762427097789 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE area_data (
            id bigint PRIMARY KEY AUTO_INCREMENT,
            area_id bigint,
            language_id bigint,
            name varchar(255),

            CONSTRAINT fk_area_data_area_id FOREIGN KEY (area_id) REFERENCES areas(id) ON DELETE CASCADE,
            CONSTRAINT fk_area_data_language_id FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE area_data`);
  }
}
