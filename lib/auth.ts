import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserSession } from "@/types/auth.types";
import { redirect } from "next/navigation";

export async function getServerSideSession() {
  return await getServerSession(authOptions) as UserSession;
}

export async function requireAuth() {
  const session = await getServerSideSession();
  
  if (!session?.user?.email) {
    redirect('/login');
  }
  
  return session.user;
}

export async function getServerSideUser() {
  const session = await getServerSideSession();
  
  if (!session?.user?.email) {
    return null;
  }
  
  return session.user;
}
