import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import executeQuery from "@/libs/mysql";
import bcrypt from 'bcrypt'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        DNI: { label: "DNI", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        try {
          // Buscar usuario por email
          const userFound = await executeQuery(
            'SELECT * FROM user WHERE DNI = ?',
            [credentials.DNI]
          );

          if (!userFound || userFound.length === 0) {
            throw new Error('Usuario no encontrado');
          }

          // Verificar contraseña
          const matchPassword = await bcrypt.compare(credentials.password, userFound[0].password);

          if (!matchPassword) {
            throw new Error('Contraseña incorrecta');
          }

          // Devolver los datos del usuario
          return {
            id: userFound[0].id,
            name: userFound[0].username,
            DNI: userFound[0].DNI,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
