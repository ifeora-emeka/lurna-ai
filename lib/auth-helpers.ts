import { auth } from "@/lib/auth"
import { User } from "@/types/auth.types"

export async function getCurrentUser(): Promise<User | null> {
  if (process.env.BUILD_TIME === "true") {
    return null
  }

  try {
    const session = await auth()

    if (!session?.user) {
      return null
    }

    return {
      id: session.user.id || "",
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    }
  } catch (error) {
    console.warn("Failed to get current user:", error)
    return null
  }
}
