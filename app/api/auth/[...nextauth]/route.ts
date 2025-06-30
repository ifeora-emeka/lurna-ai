import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { ExtendedUser, UserSession } from "@/types/auth.types";

export type { ExtendedUser, UserSession };

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (user && account?.provider === "google") {
                const extendedUser = user as ExtendedUser;
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/callback`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            emailVerified: extendedUser.emailVerified,
                        }),
                    });

                    if (!response.ok) {
                        console.error("Failed to store user in backend");
                    }
                } catch (error) {
                    console.error("Error storing user in backend:", error);
                }
            }
            return true;
        },
        async session({ session, token }) {
            const userSession = session as UserSession;
            if (token.sub && userSession.user) {
                userSession.user.id = token.sub;
            }
            return userSession;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token as JWT;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
