import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDomainDataTable1762427641312 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE domain_data (
            id bigint PRIMARY KEY AUTO_INCREMENT,
            domain_id bigint,
            language_id bigint,
            name varchar(255),

            CONSTRAINT fk_domain_data_domain_id FOREIGN KEY (domain_id) REFERENCES domains(id) ON DELETE CASCADE,
            CONSTRAINT fk_domain_data_language_id FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE domain_data`);
  }
}
