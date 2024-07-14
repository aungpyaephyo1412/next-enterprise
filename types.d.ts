import 'next-auth';
type Role = 'User' | 'Admin' | 'SuperAdmin';

declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: string;
    name: string;
    role: Role;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    dateOfBirth?: Date | null;
    address?: string | null;
    jwt: string;
  }
  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: User;
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule

declare module '@auth/core/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    id: string;
    name: string;
    role: Role;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    dateOfBirth?: Date | null;
    address?: string | null;
    jwt: string;
  }
}
