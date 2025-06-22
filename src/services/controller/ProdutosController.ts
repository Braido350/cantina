import { db } from "../utils/prisma";
import { NextResponse } from "next/server";

export class ProdutosController {
  async index() {
    const produtos = await db.produto.findMany();
    return produtos;
  }
  async store(body: any) {
    const { nome, quantidade, valor } = body;
    console.log("ProdutosController", body);
    const produto = await db.produto.findUnique({ where: { nome } });
    if (produto) {
      return NextResponse.json(
        { error: `Produto ${body.nome} já cadastrado` },
        { status: 400 }
      );
    }
    await db.produto.create({
      data: {
        nome,
        quantidade: parseInt(quantidade, 10),
        valor: parseFloat(valor.replace(",", ".")),
      },
    });
    return NextResponse.json(true, { status: 201 });
  }
}
