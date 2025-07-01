import NextAuth from "next-auth";
import { ExtendedUser, UserSession } from "@/types/auth.types";
import { authOptions } from "@/lib/auth-options";

export type { ExtendedUser, UserSession };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
