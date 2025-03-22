import axios from "axios";

export async function BuscarProdutos(vendas) {
  // Busca a lista de produtos
  const response = await axios.get("/api/registerProducts");
  const produtos = response.data;

  // Para cada venda, encontra o produto correspondente pelo idProduto e adiciona o nome
  const vendasComNomeProduto = vendas.map((venda) => {
    const produto = produtos.find((p) => p.id === venda.idProduto);
    return {
      ...venda,
      nomeProduto: produto ? produto.nome : "Produto não encontrado",
    };
  });

  return vendasComNomeProduto;
}
