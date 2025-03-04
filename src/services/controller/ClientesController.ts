import { db } from "../utils/prisma";
import { NextResponse } from "next/server";

export class ClientesController {
  async index() {
    const cliente = await db.cliente.findMany();
    return cliente;
  }

  async store(body: any) {
    try {
      const { nome, telefone, cidade, cpf } = body;
      const existingCliente = await db.cliente.findUnique({
        where: { cpf },
      });
      if (existingCliente) {
        return NextResponse.json(
          { error: `Cliente ${nome} já cadastrado` },
          { status: 400 }
        );
      }
      const NewCliente = await db.cliente.create({
        data: {
          nome,
          telefone,
          cidade,
          cpf,
        },
      });
      return NextResponse.json({ nome }, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { error: "Erro ao cadastrar cliente" },
        { status: 400 }
      );
    }
  }
}
