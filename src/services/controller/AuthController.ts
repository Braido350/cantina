import { compare } from "bcryptjs";
import { db } from "../utils/prisma";
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";

export class AuthController {
  async authenticate(body: any) {
    const { nome_usuario, senha } = body;
    const user = await db.usuario.findUnique({ where: { nome_usuario } });

    if (!user) {
      return NextResponse.json(
        { error: `Usuario ${body.nome_usuario} não encontrado` },
        { status: 400 }
      );
    }
    const isValuePassword = await compare(senha, user.senha);
    if (!isValuePassword) {
      return NextResponse.json({ error: `Senha incorreta` }, { status: 400 });
    }
    const token = sign({ id: user.id }, process.env.HASH, {
      expiresIn: "1d",
    });

    const { id } = user;

    return NextResponse.json({ id, nome_usuario, token }, { status: 201 });
  }
}
