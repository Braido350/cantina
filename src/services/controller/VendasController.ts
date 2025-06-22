import { db } from "../utils/prisma";
import { NextResponse } from "next/server";
import { localizaClienteId, localizaProdutoId } from "./localizaID";

export class VendasController {
  async index() {
    const venda = await db.venda.findMany();
    return venda;
  }

  async store(body: any) {
    try {
      const { produtosData = [], cliente } = body;

      // Se o JSON não vier com ID do cliente, busque pelo nome (cliente.label).
      let idCliente = cliente?.value || null;
      if (!idCliente && cliente?.label) {
        const clienteID = await localizaClienteId(cliente.label);
        idCliente = clienteID;
      }

      for (const item of produtosData) {
        // Se o JSON não vier com ID do produto, busque pelo nome (item.label).
        let idProduto = null;
        if (item.label) {
          idProduto = await localizaProdutoId(item.label);
        }

        // Se não encontrar o produto, pule ou trate o caso
        if (!idProduto) continue;

        const valorProduto = item.valor ?? 0;
        const quantidade = item.qty ?? 1;
        const valorTotal = valorProduto * quantidade;
        const valorDesconto = 0;
        const valorLiquido = valorTotal - valorDesconto;

        await db.venda.create({
          data: {
            idCliente: idCliente,
            idProduto,
            data: new Date(),
            quantidade,
            valorProduto,
            valorTotal,
            valorDesconto,
            valorLiquido,
          },
        });
      }

      return NextResponse.json(
        { message: "Venda registrada com sucesso." },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Erro ao cadastrar venda", details: error.message },
        { status: 400 }
      );
    }
  }
}
