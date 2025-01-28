"use server";
"no cache";
import { usuarios } from "@/services/dbFunctions";
const { getUsuario, cadastroUsuario } = usuarios;

export async function GET() {
  const data = await getUsuario();
  return new Response(JSON.stringify(data));
}

export async function POST(request) {
  try {
    const body = await request.json();
    const resultado = await cadastroUsuario(body);
    if (resultado.success) {
      return new Response(
        JSON.stringify({ success: true, cliente: resultado.cliente }),
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
