import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePredictionDataTable1762427726789 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE prediction_data (
            id bigint PRIMARY KEY AUTO_INCREMENT,
            prediction_id bigint,
            language_id bigint,
            title varchar(255),
            summary text,
            description text,
            analysis text,

            CONSTRAINT fk_prediction_data_prediction_id FOREIGN KEY (prediction_id) REFERENCES predictions(id) ON DELETE CASCADE,
            CONSTRAINT fk_prediction_data_language_id FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
      );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE prediction_data`);
    }

}
