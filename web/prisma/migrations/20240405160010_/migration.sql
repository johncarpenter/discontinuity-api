/*
  Warnings:

  - You are about to drop the column `inviteCode` on the `workspaces` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceCode` on the `workspaces` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "workspaces_inviteCode_key";

-- DropIndex
DROP INDEX "workspaces_workspaceCode_inviteCode_key";

-- DropIndex
DROP INDEX "workspaces_workspaceCode_key";

-- AlterTable
ALTER TABLE "workspaces" DROP COLUMN "inviteCode",
DROP COLUMN "workspaceCode";
