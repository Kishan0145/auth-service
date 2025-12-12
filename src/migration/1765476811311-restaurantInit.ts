import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RestaurantInit1765476811311 implements MigrationInterface {
   name = 'RestaurantInit1765476811311';

   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
         `CREATE TYPE "public"."restaurants_type_enum" AS ENUM('1', '2', '3')`
      );
      await queryRunner.query(
         `CREATE TABLE "restaurants" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "address" character varying(200) NOT NULL, "type" "public"."restaurants_type_enum" NOT NULL, CONSTRAINT "PK_e2133a72eb1cc8f588f7b503e68" PRIMARY KEY ("id"))`
      );
      await queryRunner.query(`ALTER TABLE "users" ADD "restaurantId" integer`);
      await queryRunner.query(
         `ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"`
      );
      await queryRunner.query(
         `CREATE TYPE "public"."users_role_enum" AS ENUM('customer', 'admin', 'manager', 'super-admin')`
      );
      await queryRunner.query(
         `ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`
      );
      await queryRunner.query(
         `ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" USING "role"::"text"::"public"."users_role_enum"`
      );
      await queryRunner.query(
         `ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'customer'`
      );
      await queryRunner.query(`DROP TYPE "public"."users_role_enum_old"`);
      await queryRunner.query(
         `ALTER TABLE "users" ADD CONSTRAINT "FK_4ca7f2f579cda8a6158c7fc1650" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
         `ALTER TABLE "users" DROP CONSTRAINT "FK_4ca7f2f579cda8a6158c7fc1650"`
      );
      await queryRunner.query(
         `CREATE TYPE "public"."users_role_enum_old" AS ENUM('customer', 'admin', 'manger')`
      );
      await queryRunner.query(
         `ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`
      );
      await queryRunner.query(
         `ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum_old" USING "role"::"text"::"public"."users_role_enum_old"`
      );
      await queryRunner.query(
         `ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'customer'`
      );
      await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
      await queryRunner.query(
         `ALTER TYPE "public"."users_role_enum_old" RENAME TO "users_role_enum"`
      );
      await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "restaurantId"`);
      await queryRunner.query(`DROP TABLE "restaurants"`);
      await queryRunner.query(`DROP TYPE "public"."restaurants_type_enum"`);
   }
}
