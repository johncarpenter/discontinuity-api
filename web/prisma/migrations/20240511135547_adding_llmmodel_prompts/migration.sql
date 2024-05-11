/*
  Warnings:

  - You are about to drop the column `model` on the `workspaces` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "ModelTypes" ADD VALUE 'CUSTOM';

-- AlterTable
ALTER TABLE "threads" ADD COLUMN     "llmmodelId" TEXT,
ADD COLUMN     "promptId" TEXT;

-- AlterTable
ALTER TABLE "workspaces" DROP COLUMN "model";

-- CreateTable
CREATE TABLE "llmmodels" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "souce" "ModelTypes" NOT NULL DEFAULT 'OPENAI',
    "replicate_url" TEXT,
    "apikey" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "organizationId" TEXT NOT NULL,
    "creatorId" TEXT,

    CONSTRAINT "llmmodels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompts" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "prompt" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "organizationId" TEXT NOT NULL,
    "creatorId" TEXT,

    CONSTRAINT "prompts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_llmmodelId_fkey" FOREIGN KEY ("llmmodelId") REFERENCES "llmmodels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llmmodels" ADD CONSTRAINT "llmmodels_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llmmodels" ADD CONSTRAINT "llmmodels_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
