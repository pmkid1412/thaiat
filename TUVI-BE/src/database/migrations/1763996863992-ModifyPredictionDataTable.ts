import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyPredictionDataTable1763996863992 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE prediction_data MODIFY title TEXT;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
