import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'mail@tesloshop.com' },
        password: { label: 'Password', type: 'password', placeholder: 'youpassword' },
      },
      async authorize(credentials) {
        return { name: 'juan', correo: 'pepe', role: 'admin' };
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here

  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token

        switch (account.type) {
          case 'oauth':
            break;

          case 'credentials':
            token.user = user;
            break
        }
      }
      return token;
    },
    async session({ token, session, user }) {

      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    }
  }
});
