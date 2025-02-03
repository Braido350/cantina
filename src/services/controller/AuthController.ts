import { compare} from "bcryptjs";
import { prisma } from "../utils/prisma";
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";

export class AuthController {
    async authenticate(body: any) {
        try{
        const { nome_usuario, senha } = body;
        const user = await prisma.usuario.findUnique({where:{nome_usuario}});

        if(!user){
            return NextResponse.json({ error:`Usuario ${body.nome_usuario} não encontrado` }, {status: 400}); 
        }
        const isValuePassword = await compare(senha, user.senha);
        if(!isValuePassword){
            return NextResponse.json({ error:`Senha incorreta` }, {status: 400}); 
        }
        const token = sign({id: user.id}, process.env.SECRET, {expiresIn: '1d'});
        
        return NextResponse.json({ user, token }, {status: 201});
    } catch (error){
        return NextResponse.json({ error:`Usuario ${body.nome_usuario} já cadastrado` }, {status: 400}); 
    }
    }
}