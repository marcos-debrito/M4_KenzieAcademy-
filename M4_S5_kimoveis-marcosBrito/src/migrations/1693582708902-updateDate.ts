import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDate1693582708902 implements MigrationInterface {
    name = 'UpdateDate1693582708902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "date" date NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "date" TIMESTAMP NOT NULL`);
    }

}
