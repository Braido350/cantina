"use server";
"no cache";
import { UserController } from "@/services/controller/UserController";
import { AuthMiddlwares } from "@/services/middlewares/auth";
import { NextResponse } from "next/server";

const controller = new UserController();

export async function GET(req) {
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
    console.error("Usuario já cadastrado", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
