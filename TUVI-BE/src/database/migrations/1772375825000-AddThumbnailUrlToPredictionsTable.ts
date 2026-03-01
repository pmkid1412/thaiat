import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddThumbnailUrlToPredictionsTable1772375825000
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE predictions ADD COLUMN thumbnail_url VARCHAR(500) NULL;`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE predictions DROP COLUMN thumbnail_url;`,
        );
    }
}
