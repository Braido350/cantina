import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUserByCredentials } from "./src/services/controller/AuthController";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        nome_usuario: {},
        senha: {},
      },
      authorize: async (credentials) => {
        console.log("credentials auth");
        console.log(credentials);
        // lógica de autenticação
        // procura usuario com credenciais
        const user = await findUserByCredentials(
          credentials.nome_usuario as string,
          credentials.senha as string
        );
        console.dir(user);

        // se não autenticado, retorne null

        // se não autenticado, retorne null
        if (!user) {
          return null;
        }

        // se autenticado, retorne user
        return user;
      },
    }),
  ],
});
