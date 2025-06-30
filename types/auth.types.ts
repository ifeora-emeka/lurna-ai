export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
}

export interface ExtendedUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  emailVerified?: Date | null;
}

export interface UserSession {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: string;
}
