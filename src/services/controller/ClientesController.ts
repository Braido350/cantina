import { prisma } from "../utils/prisma";
import { NextResponse } from "next/server";

export class ClientesController {
    async index() {
        const cliente = await prisma.produto.findMany();
        return cliente;
    }
    async store(body: any) {
        try {
            const { nome, telefone, cidade, cpf } = body;
            const cliente = await prisma.cliente.create({
                data: {
                    nome,
                    telefone,
                    cidade,
                    cpf,
                },
            });
            return NextResponse.json({ cliente }, { status: 201 });
        } catch (error) {
            return NextResponse.json({ error: "Erro ao cadastrar cliente" }, { status: 400 });
        }
    }
}