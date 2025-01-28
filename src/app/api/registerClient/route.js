"use server";
"no cache";
import { clientes } from "../../../services/dbFunctions";
const { getClientes, cadastrarClientes } = clientes;

export async function GET() {
  const data = await getClientes();
  return new Response(JSON.stringify(data));
}

export async function POST(request) {
  try {
    const body = await request.json();
    const resultado = await cadastrarClientes(body);
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
