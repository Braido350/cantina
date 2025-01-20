"use server";
"no cache";
import {  criarDadosProdutos, criarDadosClientes, testConnection,} from "../_services/dbFunctions";

export async function GET() {
  const dataClientes = await criarDadosClientes();
  const dataProdutos = await criarDadosProdutos();
  const registerData = {dataClientes, dataProdutos};
  return new Response(JSON.stringify(registerData));
}

  