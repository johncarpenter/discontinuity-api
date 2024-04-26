/*
  Warnings:

  - The `type` column on the `flows` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "FlowTypes" AS ENUM ('OPENAI', 'ANTHROPIC', 'GEMINI', 'IMAGEGEN', 'TEXTGEN', 'AGENT', 'CODEGEN', 'CODEINTEPRETER', 'RAG', 'OTHERML');

-- AlterTable
ALTER TABLE "flows" DROP COLUMN "type",
ADD COLUMN     "type" "FlowTypes" NOT NULL DEFAULT 'TEXTGEN';
