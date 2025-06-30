import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserSession } from "@/types/auth.types";

export async function getSession() {
    return await getServerSession(authOptions) as UserSession;
}

export async function getCurrentUser() {
    const session = await getSession();

    if (!session?.user?.email) {
        return null;
    }

    return session.user;
}

export async function getUserFromAPI() {
    const session = await getSession();
    
    if (!session?.user?.id) {
        return null;
    }
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`, {
            headers: {
                'x-user-id': session.user.id
            }
        });
        
        if (!response.ok) {
            return null;
        }
        
        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error('Error fetching user from API:', error);
        return null;
    }
}
