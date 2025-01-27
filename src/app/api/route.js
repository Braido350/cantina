"use server";
"no cache";
import { getProdutos, cadastrarProdutos } from "../../services/dbFunctions";

export async function GET(request) {
  const data = await getProdutos();
  return new Response(JSON.stringify(data));
}

export async function POST(request) {
  try {
    const body = await request.json();
    const resultado = await cadastrarProdutos(body);
    if (resultado.success) {
      return new Response(
        JSON.stringify({ success: true, produto: resultado.produto }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(JSON.stringify({ error: resultado.error }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
