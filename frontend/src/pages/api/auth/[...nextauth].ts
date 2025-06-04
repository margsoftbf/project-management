import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PropertyApi } from '@/lib/api';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: 'admin' | 'landlord' | 'tenant';
      firstName?: string | null;
      lastName?: string | null;
    };
    accessToken: string;
  }

  interface User {
    role: 'admin' | 'landlord' | 'tenant';
    firstName?: string | null;
    lastName?: string | null;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'admin' | 'landlord' | 'tenant';
    firstName?: string | null;
    lastName?: string | null;
    accessToken: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          console.log('Logowanie:', credentials.email);

          // 1. Login używając PropertyApi
          const { access_token } = await PropertyApi.login({
            email: credentials.email,
            password: credentials.password,
          });
          console.log('Token otrzymany');

          // 2. Pobierz dane usera używając PropertyApi
          const userInfo = await PropertyApi.getUserInfo(access_token);
          console.log('User info pobrane:', userInfo.email);

          return {
            id: userInfo.slug,
            name: userInfo.email,
            email: userInfo.email,
            role: userInfo.role,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            image: userInfo.avatarUrl,
            accessToken: access_token,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.id = token.sub!;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
