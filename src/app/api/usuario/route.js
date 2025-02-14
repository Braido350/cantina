"use server";
"no cache";

import { NextResponse } from "next/server";
import { findUserByCredentials } from "../../../services/controller/AuthController";

export async function POST(req) {
  const body = await req.json();
  const { nome_usuario, senha } = body;
  console.dir(body);

  const user = await findUserByCredentials(nome_usuario, senha);

  return user
    ? NextResponse.json({ status: 200 }, user)
    : NextResponse.json(
        { error: "Usuário ou senha inválidos" },
        { status: 401 }
      );
}
