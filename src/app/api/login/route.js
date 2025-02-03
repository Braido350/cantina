"use server";
"no cache";
import { UserController } from "@/services/controller/UserController";
import { NextResponse } from "next/server";
import { usuarios } from "@/services/dbFunctions";

const { getUsuario } = usuarios;
const usercontroller = new UserController();

export async function GET() {
  try {
    const data = await usercontroller.index();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error ao buscar Clientes:", error);
    return NextResponse.json(
      { error: "Error ao buscar Clientes" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    return usercontroller.store(body);
  } catch (error) {
    console.error("Usuario já cadastrado", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
