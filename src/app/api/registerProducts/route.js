"use server";
"no cache";
import { ProdutosController } from "../../../services/controller/ProdutosController";
import { NextResponse } from "next/server";

const controller = new ProdutosController();

export async function GET() {
  const data = await controller.index();
  return NextResponse.json(data);
}

export async function POST(req) {
  console.log("req", req);
  const body = await req.json();
  return controller.store(body);
}
