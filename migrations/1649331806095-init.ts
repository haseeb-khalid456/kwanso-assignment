import { MigrationInterface, QueryRunner } from "typeorm";

export class init1649331806095 implements MigrationInterface {
  name = 'init1649331806095'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "kwanso"."user" ("id" SERIAL NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "accessToken" text, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE INDEX "IDX_cace4a159ff9f2512dd4237376" ON "kwanso"."user" ("id") `);
    await queryRunner.query(`CREATE TABLE "kwanso"."task" ("id" SERIAL NOT NULL, "name" text, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE INDEX "IDX_fb213f79ee45060ba925ecd576" ON "kwanso"."task" ("id") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "kwanso"."IDX_fb213f79ee45060ba925ecd576"`);
    await queryRunner.query(`DROP TABLE "kwanso"."task"`);
    await queryRunner.query(`DROP INDEX "kwanso"."IDX_cace4a159ff9f2512dd4237376"`);
    await queryRunner.query(`DROP TABLE "kwanso"."user"`);
  }
}
