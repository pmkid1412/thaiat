import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateImpactLevelDataTable1762427947849
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE impact_level_data (
            id bigint PRIMARY KEY AUTO_INCREMENT,
            impact_level_id bigint,
            language_id bigint,
            name varchar(255),

            CONSTRAINT fk_impact_level_data_impact_level_id FOREIGN KEY (impact_level_id) REFERENCES impact_levels(id) ON DELETE CASCADE,
            CONSTRAINT fk_impact_level_data_language_id FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE impact_level_data`);
  }
}
