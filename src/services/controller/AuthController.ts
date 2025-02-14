import { compareSync } from "bcryptjs";
import { db } from "../utils/prisma";

type User = {
  nome_usuario: string;
  senha?: string;
  name: string;
};

export async function findUserByCredentials(
  nome_usuario: string,
  senha: string
): Promise<User | false> {
  const user = await db.usuario.findFirst({
    where: {
      nome_usuario,
    },
  });

  if (!user) {
    return false;
  }

  const passwoordMatch = compareSync(senha, user.senha);
  console.dir(passwoordMatch);

  if (passwoordMatch) {
    return { name: user.nome, nome_usuario: user.nome_usuario };
  }

  return false;
}
