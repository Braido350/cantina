"use server";
"no cache";
import { ClientesController } from "../../../services/controller/ClientesController";
import { NextResponse } from "next/server";

const controller = new ClientesController();

export async function GET() {
  const data = await controller.index();
  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();
  return controller.store(body);
}
