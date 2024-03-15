import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials) {
        const user = { id: "42", name: "Dave", password: "nextauth" };
        console.log("testing");
        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ profile }) {
      console.log(profile);
      return true;
    },
  },

  //   {
  //   iss: 'https://accounts.google.com',
  //   azp: '7620310533-s2ke3gghbdthpb589k731m7qg6ib0a3q.apps.googleusercontent.com',
  //   aud: '7620310533-s2ke3gghbdthpb589k731m7qg6ib0a3q.apps.googleusercontent.com',
  //   sub: '110578764179294976909',
  //   email: 'pallathj@gmail.com',
  //   email_verified: true,
  //   at_hash: 'uTFfwfoKIoTrtFZWNB7cmw',
  //   name: 'Jerry Pallath',
  //   picture: 'https://lh3.googleusercontent.com/a/ACg8ocLtFPVEfRicpDsKO2LYs4NUOoCsdh-ZuK7XwDfXSFZFEip_=s96-c',
  //   given_name: 'Jerry',
  //   family_name: 'Pallath',
  //   locale: 'en',
  //   iat: 1710451111,
  //   exp: 1710454711
  // }

  // pages:{
  //     signIn: "/signin"
  // }
};
