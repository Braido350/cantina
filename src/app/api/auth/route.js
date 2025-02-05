import { AuthController } from "@/services/controller/AuthController";
import { NextResponse } from "next/server";

const controller = new AuthController();

export async function POST(req) {
  try {
    const body = await req.json();
    return controller.authenticate(body);
  } catch (error) {
    console.dir(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
