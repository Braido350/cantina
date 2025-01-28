import axios from "axios";

export async function isValid(data) {
  const { nome_usuario, senha } = data;
  try {
    const response = await axios.post("/api/login");
    const cliente = localizaCliente(response.data, nome_usuario, senha);
    if (cliente.error) {
      return cliente;
    }
    return cliente;
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
}

function localizaCliente(clientes, nome_usuario, senha) {
  return clientes.filter(function (el) {
    if (el.nome_usuario !== nome_usuario) {
      return { erro: "Usuário inválido" };
    } else if (el.senha !== senha) {
      return { erro: "Senha inválida" };
    }
    return el;
  });
}
