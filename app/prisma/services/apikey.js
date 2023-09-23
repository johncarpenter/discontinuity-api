import prisma from "@/prisma/index";
import crypto from "crypto";

export const createApiKey = async (slug, email, permissions, name) => {
  const workspace = await prisma.workspace.findFirst({
    select: { id: true },
    where: {
      OR: [
        {
          members: {
            some: {
              email,
              deletedAt: null,
            },
          },
        },
      ],
      AND: {
        deletedAt: null,
        slug,
      },
    },
  });

  return await prisma.apiKey.create({
    data: {
      workspaceId: workspace.id,
      client_id: crypto.randomUUID(),
      client_secret: crypto.randomUUID(),
      name,
      permissions,
    },
  });
};

export const deleteApiKey = async (id) => {
  return await prisma.apiKey.delete({
    where: { id },
  });
};

export const getApiKeys = async (slug) => {
  return await prisma.apiKey.findMany({
    select: {
      name: true,
      client_id: true,
      client_secret: true,
      permissions: true,
    },
    where: {
      workspace: {
        //  deletedAt: null,
        slug,
      },
    },
  });
};
