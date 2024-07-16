import { User } from 'next-auth';

/**
 * Authorizes a user based on provided credentials.
 *
 * @param credentials - The credentials used to authorize the user.
 * @returns A Promise that resolves to a User object.
 */
const authorizeUser = async (credentials: any): Promise<User> => {
  console.log(credentials.name);

  // Example user object to return upon authorization
  return {
    id: 'id',
    name: 'name',
    role: 'User',
    phone: 'phone',
    createdAt: new Date(),
    updatedAt: new Date(),
    dateOfBirth: new Date(),
    address: 'data.data.address',
    jwt: 'data.jwt',
  };
};

export default authorizeUser;
