-- CreateTable
CREATE TABLE "flows" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "endpoint" TEXT NOT NULL,
    "apikey" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "flows_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "flows" ADD CONSTRAINT "flows_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
