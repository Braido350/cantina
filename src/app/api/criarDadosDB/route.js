"use server";
"no cache";
import { clientes, produtos, usuarios } from "@/services/dbFunctions";
const { criarDadosUsuarios } = usuarios;
const { criarDadosClientes } = clientes;
const { criarDadosProdutos } = produtos;

export async function GET() {
  const dataUsuarios = await criarDadosUsuarios();
  const dataClientes = await criarDadosClientes();
  const dataProdutos = await criarDadosProdutos();
  const registerData = { dataClientes, dataProdutos, dataUsuarios };
  return new Response(JSON.stringify(registerData));
}
