import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

if (!MONGODB_URI) {
  console.warn("MONGODB_URI is not defined. Auth features will be limited.")
}

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.warn("Google OAuth credentials are not defined. Google sign-in will not work.")
}

let client = null
let clientPromise = null

if (MONGODB_URI) {
  try {
    client = new MongoClient(MONGODB_URI)
    clientPromise = client.connect()
  } catch (error) {
    console.warn("Failed to create MongoDB client:", error)
  }
}

const createMongoAdapter = () => {
  if (MONGODB_URI && clientPromise && client) {
    try {
      return MongoDBAdapter(clientPromise)
    } catch (error) {
      console.warn("MongoDB adapter error:", error)
      return undefined
    }
  }
  return undefined
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: createMongoAdapter(),
  providers: [
    ...(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET ? [
      Google({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
      }),
    ] : []),
  ],
  session: {
    strategy: MONGODB_URI ? "database" : "jwt",
    maxAge: 21 * 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 21 * 24 * 60 * 60,
      },
    },
  },
  pages: {
    signIn: "/login",
  },  callbacks: {
    async session({ session, user }) {
      if (session?.user && user?.id) {
        session.user.id = user.id
      }
      return session
    },
  },
})
