import { hash } from "bcryptjs";
import { prisma } from "../utils/prisma";
import { NextResponse, NextRequest } from "next/server";

export class UserController {
    async index() {
        const users = await prisma.usuario.findMany();
        return users;
    }
    async store(body: any) {
        try{
        const { nome, nome_usuario, senha } = body;
        const hash_password = await hash(senha, 1);
        const user = await prisma.usuario.create({
            data: {
                nome,
                nome_usuario,
                senha: hash_password,
            },
        });
        return NextResponse.json({ user }, {status: 201});
    } catch (error){
        return NextResponse.json({ error:`Usuario ${body.nome_usuario} já cadastrado` }, {status: 400}); 
    }
    }
}