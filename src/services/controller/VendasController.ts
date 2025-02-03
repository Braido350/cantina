import { prisma } from "../utils/prisma";
import { NextResponse } from "next/server";

export class VendasController {
    async index() {
        const venda = await prisma.venda.findMany();
        return venda;
    }
    async store(body: any) {
        try {
            const { clientId, produtoId, quantidade, total } = body;
            const venda = await prisma.venda.create({
                data: {
                    clientId,
                    produtoId,
                    quantidade,
                    total,
                },
            });
            return NextResponse.json({ venda }, { status: 201 });
        } catch (error) {
            return NextResponse.json({ error: "Erro ao cadastrar venda" }, { status: 400 });
        }
    }
}