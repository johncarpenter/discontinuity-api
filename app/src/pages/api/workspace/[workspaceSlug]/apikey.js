import { validateSession } from "@/config/api-validation/index";
import { createApiKey } from "@/prisma/services/apikey";

const handler = async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const session = await validateSession(req, res);
    const { permissions, name } = req.body;
    await createApiKey(
      req.query.workspaceSlug,
      session.user.email,
      permissions,
      name
    )
      .then((apikey) => res.status(200).json({ data: { apikey, name } }))
      .catch((error) =>
        res.status(404).json({ errors: { error: { msg: error.message } } })
      );
  } else {
    res
      .status(405)
      .json({ errors: { error: { msg: `${method} method unsupported` } } });
  }
};

export default handler;
