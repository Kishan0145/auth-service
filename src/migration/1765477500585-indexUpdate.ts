import type { MigrationInterface, QueryRunner } from 'typeorm';

export class IndexUpdate1765477500585 implements MigrationInterface {
   name = 'IndexUpdate1765477500585';

   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
         `CREATE INDEX "IDX_4ca7f2f579cda8a6158c7fc165" ON "users" ("restaurantId") `
      );
      await queryRunner.query(
         `CREATE INDEX "IDX_265bec4e500714d5269580a021" ON "refreshTokens" ("userId") `
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
         `DROP INDEX "public"."IDX_265bec4e500714d5269580a021"`
      );
      await queryRunner.query(
         `DROP INDEX "public"."IDX_4ca7f2f579cda8a6158c7fc165"`
      );
   }
}
