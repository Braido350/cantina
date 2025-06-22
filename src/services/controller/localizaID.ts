import { db } from "../utils/prisma";

/**
 * Busca o id do cliente no banco com base no nome (label).
 * Retorna null se o label não for fornecido ou se ocorrer algum erro.
 */
export async function localizaClienteId(label: string): Promise<number | null> {
  if (!label) return null;
  try {
    const cliente = await db.cliente.findFirst({
      where: { nome: label },
    });
    return cliente?.id ?? null;
  } catch (error) {
    console.error("Erro ao localizar cliente:", error);
    return null;
  }
}

/**
 * Busca o id do produto no banco com base no nome (label).
 * Retorna null se o label não for fornecido ou se ocorrer algum erro.
 */
export async function localizaProdutoId(label: string): Promise<number | null> {
  if (!label) return null;
  try {
    const produto = await db.produto.findFirst({
      where: { nome: label },
    });
    return produto?.id ?? null;
  } catch (error) {
    console.error("Erro ao localizar produto:", error);
    return null;
  }
}
