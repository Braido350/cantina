import { prisma } from "../utils/prisma";
import { NextResponse } from "next/server";

export class ProdutosController {
  async index() {
    const produtos = await prisma.produto.findMany();
    return produtos;
  }
  async store(body: any) {
    try {
      const { nome, quantidade, valor } = body;
      console.dir(body);
      const produto = await prisma.produto.findUnique({ where: { nome } });
      if (produto) {
        return NextResponse.json(
          { error: `Produto ${body.nome} já cadastrado` },
          { status: 400 }
        );
      }
      const NewProduto = await prisma.produto.create({
        data: {
          nome,
          quantidade: parseInt(quantidade, 10),
          valor: parseFloat(valor.replace(",", ".")),
        },
      });
      return NextResponse.json({ NewProduto }, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { error: "Erro ao cadastrar produto" },
        { status: 400 }
      );
    }
  }
}
