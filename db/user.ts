import { prisma } from "@/lib/prisma";

export const registerUser = async (profile: any) => {
  const data = {
    email: profile.email,
    name: profile.name,
    picture: profile.picture,
  };
  try {
    return await prisma.user.create({ data });
  } catch (error) {
    throw error;
  }
};

// {
//   iss: 'https://accounts.google.com',
//   azp: '7620310533-s2ke3gghbdthpb589k731m7qg6ib0a3q.apps.googleusercontent.com',
//   aud: '7620310533-s2ke3gghbdthpb589k731m7qg6ib0a3q.apps.googleusercontent.com',
//   sub: '110578764179294976909',
//   email: 'pallathj@gmail.com',
//   email_verified: true,
//   at_hash: 'isi_PYY21W7sS54B3oRVHQ',
//   name: 'Jerry Pallath',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocLtFPVEfRicpDsKO2LYs4NUOoCsdh-ZuK7XwDfXSFZFEip_=s96-c',
//   given_name: 'Jerry',
//   family_name: 'Pallath',
//   iat: 1710855555,
//   exp: 171
