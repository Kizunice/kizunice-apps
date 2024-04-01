import NextAuth from 'next-auth/next';
import prisma from '../../../lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const res = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;

        // // check to see if email and password is there
        // if (!credentials.email || !credentials.password) {
        //   throw new Error('Please enter an email and password');
        // }

        // // check to see if user exists
        // const user = await prisma.user.findUnique({
        //   where: {
        //     email: credentials.email,
        //   },
        // });

        // // if no user was found
        // if (!user || !user?.hashedPassword) {
        //   throw new Error('No user found');
        // }

        // // check to see if password matches
        // const passwordMatch = await bcrypt.compare(
        //   credentials.password,
        //   user.hashedPassword
        // );

        // // if password does not match
        // if (!passwordMatch) {
        //   throw new Error('Incorrect password');
        // }

        // return user;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user?.error === 'my custom error') {
        throw new Error('custom error to the client');
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
