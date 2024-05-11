/*
  Warnings:

  - You are about to drop the column `souce` on the `llmmodels` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "llmmodels" DROP COLUMN "souce",
ADD COLUMN     "source" "ModelTypes" NOT NULL DEFAULT 'OPENAI';
