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
            const produto = await prisma.produto.create({
                data: {
                    nome,
                    quantidade,
                    valor,
                },
            });
            return NextResponse.json({ produto }, { status: 201 });
        } catch (error) {
            return NextResponse.json({ error: "Erro ao cadastrar produto" }, { status: 400 });
        }
    }
}