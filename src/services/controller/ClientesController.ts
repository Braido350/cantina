import { prisma } from "../utils/prisma";
import { NextResponse } from "next/server";

export class ClientesController {
  async index() {
    const cliente = await prisma.cliente.findMany();
    return cliente;
  }

  async store(body: any) {
    try {
      const { nome, telefone, cidade, cpf } = body;
      const existingCliente = await prisma.cliente.findUnique({
        where: { cpf },
      });
      if (existingCliente) {
        return NextResponse.json(
          { error: `Cliente ${nome} já cadastrado` },
          { status: 400 }
        );
      }
      const newCliente = await prisma.cliente.create({
        data: {
          nome,
          telefone,
          cidade,
          cpf,
        },
      });
      return NextResponse.json({ newCliente }, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { error: "Erro ao cadastrar cliente" },
        { status: 400 }
      );
    }
  }
}
