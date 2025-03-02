"use server";
"no cache";
import { UserController } from "../../../services/controller/UserController";
import { NextResponse } from "next/server";

const controller = new UserController();

export async function GET() {
  const data = await controller.index();
  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();
  console.log("req", body);
  return controller.store(body);
}
