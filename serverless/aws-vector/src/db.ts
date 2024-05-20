import { Pool } from "pg";
import { QueryResult } from "pg";
import { createId } from "@paralleldrive/cuid2";
/**
 * 
model files {
  id          String         @id @default(cuid())
  filename    String
  oai_fileid  String?
  status      FileStatusType @default(PROCESSING)
  createdAt   DateTime?      @default(now())
  deletedAt   DateTime?
  updatedAt   DateTime?
  workspaceId String
  workspaces  workspaces     @relation(fields: [workspaceId], references: [id])
  creator     users?         @relation(fields: [creatorId], references: [id])
  creatorId   String?
}

enum FileStatusType {
  PROCESSING
  INDEXED
  ERROR
  UNPROCESSED
}

 */

enum FileStatusType {
  PROCESSING,
  INDEXED,
  ERROR,
  UNPROCESSED,
}

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION,
});

const getFirstOpenAIKey = async (workspaceId: string) => {
  const response: QueryResult = await pool.query(
    'select apikey from llmmodels l left join workspaces w on w."ownerId" = l."organizationId" where w.id = $1 and l."deletedAt" is null and l.source = $2',
    [workspaceId, "OPENAI"]
  );

  if (response.rows.length > 0) {
    return response.rows[0].apikey;
  }
  return null;
};

const upsertFileStatus = async (
  workspaceId: string,
  filename: string,
  status: FileStatusType
) => {
  return await pool.query(
    'insert into files(id, "workspaceId", filename, status) values($4, $1, $2, $3) on conflict ("workspaceId", filename) do update set status = $3 , "updatedAt" = now(), "deletedAt" = null',
    [workspaceId, filename, FileStatusType[status], createId()]
  );
};

const addFileId = async (
  workspaceId: string,
  filename: string,
  fileId: string
) => {
  return await pool.query(
    'update files set oai_fileid = $1 where "workspaceId" = $2 and filename = $3',
    [fileId, workspaceId, filename]
  );
};

const getFileID = async (workspaceId: string, filename: string) => {
  const response = await pool.query(
    'select oai_fileid from files where "workspaceId" = $1 and filename = $2',
    [workspaceId, filename]
  );
  if (response.rows.length > 0) {
    return response.rows[0].oai_fileid;
  }
  return null;
};

const archiveFile = async (workspaceId: string, filename: string) => {
  return await pool.query(
    'update files set "deletedAt" = now() where "workspaceId" = $1 and filename = $2',
    [workspaceId, filename]
  );
};

export {
  getFirstOpenAIKey,
  upsertFileStatus,
  addFileId,
  FileStatusType,
  archiveFile,
  getFileID,
};
