/*
  Warnings:

  - A unique constraint covering the columns `[filename,workspaceId]` on the table `files` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "files_filename_workspaceId_key" ON "files"("filename", "workspaceId");
