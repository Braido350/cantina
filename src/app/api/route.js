"use server";
"no cache";
import postGres from "../../services/db";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await testConnection();
  return NextResponse.json(data);
}

async function testConnection() {
  try {
    const { rows } = await postGres.query("SELECT NOW()");
    return rows;
  } catch (err) {
    console.error("Erro ao testar conexão:", err);
    return { error: "Erro ao testar conexão" };
  }
}
