-- CreateEnum
CREATE TYPE "ModelTypes" AS ENUM ('OPENAI', 'ANTHROPIC', 'COHERE', 'GEMINI', 'MISTRAL', 'LLAMA3');

-- AlterTable
ALTER TABLE "workspaces" ADD COLUMN     "model" "ModelTypes" NOT NULL DEFAULT 'OPENAI';

-- CreateTable
CREATE TABLE "threads" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "threads_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
