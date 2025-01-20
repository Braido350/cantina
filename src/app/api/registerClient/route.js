"use server";
"no cache";
import { getClientes, cadastrarClientes } from "../_services/dbFunctions";

export async function GET(request) {
  const data = await getClientes();
  return new Response(JSON.stringify(data));
}

export async function POST(request) {
  console.log("request ------", request);
  if (!request) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const body = await request.json(); // Extrai o corpo da requisição como JSON
    const cliente = body.cliente; // Extrai a propriedade 'cliente' do corpo
    if (!cliente) {
      return new Response(
        JSON.stringify({ error: "Dados do cliente não fornecidos" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    await cadastrarClientes(cliente);
    return new Response(JSON.stringify({ success: true, cliente }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
