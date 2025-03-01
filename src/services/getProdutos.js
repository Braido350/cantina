import axios from "axios";

export async function getProdutos() {
  try {
    const response = await axios.get("/api/registerProducts");
    const Produtos = response.data.map((produto) => ({
      value: produto.id,
      label: produto.nome,
      valor: produto.valor,
    }));
    return Produtos;
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
}

// Chamada da função para exibir os dados no console
// getClientes()
//   .then((data) => {
//     console.log("Clientes:", data);
//   })
//   .catch((error) => {
//     console.error("Erro ao buscar clientes:", error);
//   });
