import axios from "axios";

export async function getValueProducts() {
  const response = await axios.get("/api/registerProducts");
  const produtos = response.data.map((produto) => ({
    nome: produto.nome,
    valor: produto.valor,
  }));
  return produtos;
}
