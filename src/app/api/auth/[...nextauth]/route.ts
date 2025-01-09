import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { pages } from 'next/dist/build/templates/app-page';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'database',
  },
  secret: 'secretkey',
  providers: [
    // CredentialsProvider({
    //   type: 'credentials',
    //   name: 'credentials',
    //   credentials: {
    //     email: { label: 'Email', type: 'email' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   async authorize(credentials) {
    //     const { email, password } = credentials as {
    //       email: string;
    //       password: string;
    //     };
    //   },
    //   const user:any ={
    //     id: 1,
    //     name: 'nomos',
    //     email: 'nomos83681@chosenx.com',
    //     role: 'admin'
    //   }
    //   if(email === 'nomos83681@chosenx.com' &&
    //     password === 'nomos123'
    //   ){
    //     return user
    //   }else{
    //     return null;
    //   }
    // }),
    pages:{
      signIn: '/signin',
    }
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account.provider === 'credentials') {
        token.email = user.email;
        token.fullName = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if ('email' in token) {
        session.user.email = token.email;
      }
      if ('role' in token) {
        session.user.role = token.role;
      }
      if ('fullName' in token) {
        session.user.name = token.fullName;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
