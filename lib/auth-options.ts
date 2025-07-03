import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { ExtendedUser, UserSession } from "@/types/auth.types";
import jwt from 'jsonwebtoken';

export const authOptions: NextAuthOptions = {
    debug: process.env.NODE_ENV === 'development',
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, credentials }) {
            
            if (user && account?.provider === "google") {
                const extendedUser = user as ExtendedUser;
                try {
                    console.log('[NextAuth] Calling backend API callback');
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

                } catch (error) {
                }
            }
            return true;
        },
        async session({ session, token }) {
            const userSession = session as UserSession;
            if (token.sub && userSession.user) {
                userSession.user.id = token.sub;
            }
            
            if (process.env.NEXTAUTH_SECRET) {
                (userSession as any).accessToken = jwt.sign(
                    { 
                        sub: token.sub,
                        email: token.email,
                        name: token.name,
                        iat: Math.floor(Date.now() / 1000),
                        exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
                    }, 
                    process.env.NEXTAUTH_SECRET
                );
            }

            
            return userSession;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token as JWT;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith('/')) {
                const resolvedUrl = `${baseUrl}${url}`;
                return resolvedUrl;
            } else if (url.startsWith(baseUrl)) {
                return url;
            }
            
            console.log('[NextAuth] Defaulting to base URL');
            return baseUrl;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
};
