import { hash } from "bcryptjs";
import { db } from "../utils/prisma";
import { NextResponse, NextRequest } from "next/server";

export class UserController {
  async index() {
    const users = await db.usuario.findMany();
    return users;
  }
  async store(body: any) {
    try {
      const { nome, nome_usuario, senha } = body;
      const user = await db.usuario.findUnique({ where: { nome_usuario } });
      if (user) {
        return NextResponse.json(
          { error: `Usuario ${body.nome_usuario} já cadastrado` },
          { status: 400 }
        );
      }
      const hash_password = await hash(senha, 1);
      const NovoUsuario = await db.usuario.create({
        data: {
          nome,
          nome_usuario,
          senha: hash_password,
        },
      });
      return NextResponse.json({ NovoUsuario }, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { error: `Usuario ${body.nome_usuario} já cadastrado` },
        { status: 400 }
      );
    }
  }
}
