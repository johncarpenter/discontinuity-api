import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";

export const emailConfig = {
  auth: {
    api_key: process.env.EMAIL_SERVER_API_KEY,
    domain: "discontinuity.ai",
  },
};

//const transporter = nodemailer.createTransport(emailConfig);
const transporter = nodemailer.createTransport(mg(emailConfig));

export const sendMail = async ({ from, html, subject, text, to }) => {
  const data = {
    from: from ?? process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html,
  };

  //process.env.NODE_ENV === 'production'
  await transporter.sendMail(data);
  //: console.log(data);
};

export default transporter;
