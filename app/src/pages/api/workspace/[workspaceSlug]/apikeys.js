import { getApiKeys } from "@/prisma/services/apikey";
import { validateSession } from "@/config/api-validation";

const handler = async (req, res) => {
  const { method } = req;

  if (method === "GET") {
    await validateSession(req, res);
    const apikeys = await getApiKeys(req.query.workspaceSlug);
    res.status(200).json({ data: { apikeys } });
  } else {
    res.status(405).json({ error: `${method} method unsupported` });
  }
};

export default handler;
