/*
  Warnings:

  - The values [TRIAL,LIMITED,OPEN] on the enum `LicenseType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LicenseType_new" AS ENUM ('SOLO', 'TEAM', 'PRO');
ALTER TABLE "organizations" ALTER COLUMN "license" TYPE "LicenseType_new" USING ("license"::text::"LicenseType_new");
ALTER TYPE "LicenseType" RENAME TO "LicenseType_old";
ALTER TYPE "LicenseType_new" RENAME TO "LicenseType";
DROP TYPE "LicenseType_old";
COMMIT;

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "user_clerk_id" TEXT,
ALTER COLUMN "clerk_id" DROP NOT NULL;
