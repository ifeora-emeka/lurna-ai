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
            console.log('[NextAuth] Sign In callback started');
            console.log('[NextAuth] Sign In User:', user ? { id: user.id, email: user.email } : 'No user');
            console.log('[NextAuth] Sign In Account Provider:', account?.provider);
            
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

                    if (!response.ok) {
                        console.error("[NextAuth] Failed to store user in backend");
                    } else {
                        console.log('[NextAuth] User stored in backend successfully');
                    }
                } catch (error) {
                    console.error("[NextAuth] Error storing user in backend:", error);
                }
            }
            console.log('[NextAuth] Sign In callback completed');
            return true;
        },
        async session({ session, token }) {
            console.log('[NextAuth] Session callback', { sessionUserId: session?.user?.id, tokenSub: token.sub });
            const userSession = session as UserSession;
            if (token.sub && userSession.user) {
                userSession.user.id = token.sub;
            }
            
            (userSession as any).accessToken = process.env.NEXTAUTH_SECRET 
                ? jwt.sign(token as any, process.env.NEXTAUTH_SECRET)
                : null;
            
            return userSession;
        },
        async jwt({ token, user }) {
            console.log('[NextAuth] JWT callback', { tokenId: token.id, userId: user?.id });
            if (user) {
                token.id = user.id;
            }
            return token as JWT;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith('/')) {
                const resolvedUrl = `${baseUrl}${url}`;
                console.log('[NextAuth] Resolved redirect to:', resolvedUrl);
                return resolvedUrl;
            } else if (url.startsWith(baseUrl)) {
                console.log('[NextAuth] Using absolute URL:', url);
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
