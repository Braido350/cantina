"use server";
"no cache";
import { cadastrarProdutos, getProdutos } from "../_services/dbFunctions";

export async function GET(request) {
  const data = await getProdutos();
  return new Response(JSON.stringify(data));
}

export async function POST(request) {
  console.log("request", request);
  const data = await request.json();
  cadastrarProdutos();
  return new Response(JSON.stringify({ success: true, data }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
