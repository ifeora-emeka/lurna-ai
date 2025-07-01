import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { ExtendedUser, UserSession } from "@/types/auth.types";
import jwt from 'jsonwebtoken';

export type { ExtendedUser, UserSession };

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
            
            // Add the raw JWT token to the session for use in API calls
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
            console.log('[NextAuth] Redirect callback');
            console.log('[NextAuth] Redirect URL:', url);
            console.log('[NextAuth] Base URL:', baseUrl);
            
            // Safely handle redirect URLs
            if (url.startsWith('/')) {
                // For relative URLs, prepend the base URL
                const resolvedUrl = `${baseUrl}${url}`;
                console.log('[NextAuth] Resolved redirect to:', resolvedUrl);
                return resolvedUrl;
            } else if (url.startsWith(baseUrl)) {
                // URLs that are already absolute and from the same origin
                console.log('[NextAuth] Using absolute URL:', url);
                return url;
            }
            
            // For any other URL, redirect to the base URL
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
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
