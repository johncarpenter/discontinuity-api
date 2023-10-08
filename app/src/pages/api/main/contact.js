import { validateUpdateEmail } from "@/config/api-validation/index";
import { sendMail } from "@/lib/server/mail";
import { html, text } from "@/config/email-templates/contact";

const handler = async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    await validateUpdateEmail(req, res);
    const { email, first, last, company, message } = req.body;
    await sendMail({
      html: html({ name: `${first} ${last}`, email, company, message }),
      subject: `[Discontinuity.AI] Contact Form`,
      text: text({ name: `${first} ${last}`, email, company, message }),
      to: `hello@discontinuity.ai`,
    });
    res.status(200).json({ data: { message: "sent" } });
  } else {
    res
      .status(405)
      .json({ errors: { error: { msg: `${method} method unsupported` } } });
  }
};

export default handler;
