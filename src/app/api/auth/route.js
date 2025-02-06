import { AuthController } from "@/services/controller/AuthController";
import { NextResponse } from "next/server";

const controller = new AuthController();

export async function POST(req) {
  try {
    const body = await req.json();
    const response = await controller.authenticate(body);

    // Se AuthController retornar um NextResponse, simplesmente retorne
    if (response instanceof NextResponse) {
      return response;
    }

    // Caso contrário, retorne um erro genérico
    return NextResponse.json({ error: "Erro inesperado" }, { status: 500 });
  } catch (error) {
    console.error("Erro na rota:", error);
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    );
  }
}
