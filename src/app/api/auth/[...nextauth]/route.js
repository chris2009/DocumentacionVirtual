// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import executeQuery from "@/libs/mysql";
// import bcrypt from 'bcrypt'

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password", placeholder: "*****" },
//       },
//       async authorize(credentials, req) {
//         console.log(credentials)

//         const userFound = await executeQuery.user.findUnique({
//             where: {
//                 email: credentials.email
//             }
//         })

//         if (!userFound) throw new Error('No user found')

//         console.log(userFound)

//         const matchPassword = await bcrypt.compare(credentials.password, userFound.password)

//         if (!matchPassword) throw new Error('Wrong password')

//         return {
//             id: userFound.id,
//             name: userFound.username,
//             email: userFound.email,
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/login",
//   }
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };




import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import executeQuery from "@/libs/mysql";
import bcrypt from 'bcrypt'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        try {
          // Buscar usuario por email
          const userFound = await executeQuery(
            'SELECT * FROM user WHERE email = ?',
            [credentials.email]
          );

          if (!userFound || userFound.length === 0) {
            throw new Error('No user found');
          }

          // Verificar contraseña
          const matchPassword = await bcrypt.compare(credentials.password, userFound[0].password);

          if (!matchPassword) {
            throw new Error('Wrong password');
          }

          // Devolver los datos del usuario
          return {
            id: userFound[0].id,
            name: userFound[0].username,
            email: userFound[0].email,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
