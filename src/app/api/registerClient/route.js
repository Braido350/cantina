"use server";
"no cache";
import { getClientes, cadastrarClientes } from "../_services/dbFunctions";

export async function GET(request) {
  const data = await getClientes();
  return new Response(JSON.stringify(data));
}

export async function POST(request) {
  try {
    const body = await request.json();
    await cadastrarClientes(body);
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
