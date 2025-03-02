"use server";
"no cache";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { VendasController } from "../../../services/controller/VendasController";

const prisma = new PrismaClient();
const controller = new VendasController();

export async function GET() {
  const data = await controller.index();
  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("REGISTERSELL", body);

    const { produtosData = [], cliente } = body;
    const idCliente = cliente?.value || null;

    for (const item of produtosData) {
      // Busca o produto pelo nome (label)
      const produtoDB = await prisma.produto.findUnique({
        where: { nome: item.label },
      });

      if (!produtoDB) {
        // Caso o produto não seja encontrado, pule ou faça outro tratamento
        continue;
      }

      const valorProduto = item.valor || 0;
      const quantidade = item.qty || 1;
      const valorTotal = valorProduto * quantidade;
      const valorDesconto = 0;
      const valorLiquido = valorTotal - valorDesconto;

      // Cria registro de venda na tabela Venda
      await prisma.venda.create({
        data: {
          idCliente: idCliente,
          idProduto: produtoDB.id,
          data: new Date(),
          quantidade,
          valorProduto,
          valorTotal,
          valorDesconto,
          valorLiquido,
        },
      });
    }

    return NextResponse.json({ message: "Venda registrada com sucesso." });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
