import prisma from '@/prisma/index'

/**model files {
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

  @@unique([filename, workspaceId])
} */
export const getFilesForWorkspace = async (workspaceId) => {
  return await prisma.files.findMany({
    select: {
      id: true,
      filename: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      deletedAt: null,
      workspaces: {
        deletedAt: null,
        id: workspaceId,
      },
    },
  })
}

export const upsertFileStatus = async (workspaceId, filename, status) => {
  return await prisma.files.upsert({
    where: {
      filename_workspaceId: {
        filename,
        workspaceId,
      },
    },
    update: {
      status,
      deletedAt: null,
    },
    create: {
      filename,
      status,
      createdAt: new Date(),
      workspaces: {
        connect: {
          id: workspaceId,
        },
      },
    },
  })
}
