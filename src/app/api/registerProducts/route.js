"use server";
"no cache";
import { ProdutosController } from "@/services/controller/ProdutosController";
import { NextResponse } from "next/server";

const controller = new ProdutosController();

export async function GET() {
  const authResponse = AuthMiddlwares(req);
  if (authResponse.status !== 200) {
    return authResponse;
  }
  const data = await controller.index();
  return NextResponse.json(data);
}

export async function POST(req) {
  const authResponse = AuthMiddlwares(req);
  if (authResponse.status !== 200) {
    return authResponse;
  }
  try {
    const body = await req.json();
    return controller.store(body);
  } catch (error) {
    console.error("Erro ao cadastrar produto", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
