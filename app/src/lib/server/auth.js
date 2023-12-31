import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

import prisma from "@/prisma/index";
import { html, text } from "@/config/email-templates/signin";
import { emailConfig, sendMail } from "@/lib/server/mail";
import { createPaymentAccount, getPayment } from "@/prisma/services/customer";
import { getUserByEmail } from "@/prisma/services/user";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        const customerPayment = await getPayment(user.email);
        session.user.userId = user.id;

        if (customerPayment) {
          session.user.subscription = customerPayment.subscriptionType;
        }
      }

      return session;
    },
    signIn: async ({ user }) => {
      console.log(`Logging in user ${JSON.stringify(user)}...`);
      // Don't allow new signups
      const userAccount = await getUserByEmail(user.email);
      if (!userAccount) return false;
    },
  },
  debug: !(process.env.NODE_ENV === "production"),
  events: {
    signIn: async ({ user, isNewUser }) => {
      const customerPayment = await getPayment(user.email);

      if (isNewUser || customerPayment === null || user.createdAt === null) {
        await Promise.all([createPaymentAccount(user.email, user.id)]);
      }
    },
  },
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      server: emailConfig,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        const { host } = new URL(url);
        await sendMail({
          html: html({ email, url }),
          subject: `[Discontinuity.AI] Sign in to ${host}`,
          text: text({ email, url }),
          to: email,
        });
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || null,
  session: {
    jwt: true,
  },
};
