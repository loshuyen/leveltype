import React from "react"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import type { Provider } from "next-auth/providers"
import Resend from "next-auth/providers/resend"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/mongodb"
import { Resend as ResendClient } from "resend"
import MagicLinkMail from "./components/emails/signInMail"
import routes from "./constants/routes"


const providers: Provider[] = [
    Resend({
      from: `LevelType <${process.env.FROM_EMAIL}>`,
      sendVerificationRequest: async (params) => {
        const resend = new ResendClient(process.env.AUTH_RESEND_KEY)
        const { identifier: to, provider, url } = params
        const newUrl = new URL(url)
        newUrl.searchParams.set("callbackUrl", "https://leveltype.site")

        await resend.emails.send({
          from: provider.from || "",
          to,
          subject: '登入 LevelType',
          react: React.createElement(MagicLinkMail, { magicLink: newUrl.toString() }),
        });
      },
    }),
    Google
]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")

export const config = {
    providers,
    pages: {
      signIn: routes.SIGNIN,
      verifyRequest: routes.VERIFY_REQUEST
    },
    adapter: MongoDBAdapter(client),
  }

export const { handlers, signIn, signOut, auth } = NextAuth(config)