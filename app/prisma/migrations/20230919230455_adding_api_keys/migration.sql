-- CreateTable
CREATE TABLE "apikeys" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "client_secret" TEXT NOT NULL,
    "permissions" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "apikeys_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "apikeys" ADD CONSTRAINT "apikeys_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
