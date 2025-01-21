import axios from "axios";

async function verificarDadosCliente(props) {
  const { nomeCliente, telefone, cpf, cidade } = props;
  const telefoneRegex = /^\d{10,11}$/;

  if (!nomeCliente || !telefone || !cpf || !cidade) {
    return { error: "Preencha todos os campos." };
  }
  if (nomeCliente.length < 3) {
    return { error: "Nome inválido. Deve ter pelo menos 3 caracteres." };
  }
  if (cidade.length < 3) {
    return { error: "Cidade inválida. Deve ter pelo menos 3 caracteres." };
  }
  if (!telefoneRegex.test(telefone)) {
    return {
      error: "Telefone inválido. Deve conter apenas números e conter o DDD.",
    };
  }
  const cpfRegex = /^\d{11}$/;
  if (!cpfRegex.test(cpf)) {
    return { error: "CPF inválido. Deve conter exatamente 11 dígitos." };
  }
  try {
    const response = await axios.post("/api/registerClient", props);
    if (response.status === 200 && response.data.success) {
      return { success: true };
    } else {
      return {
        error:
          "Erro ao cadastrar cliente. Verifique os dados e tente novamente.",
      };
    }
  } catch (error) {
    return `Erro ao cadastrar cliente. ${error}`;
  }
}

async function verificarDadosProduto(props) {
  const { nomeProduto, quantidade, valor } = props;

  if (!nomeProduto || !quantidade || !valor) {
    return "Preencha todos os campos.";
  }
  if (nomeProduto.length < 3) {
    return "Nome inválido.";
  }
  if (quantidade <= 0) {
    return "Quantidade inválida.";
  }
  if (valor <= 0) {
    return "Valor inválido.";
  }

  try {
    await axios.post("/api/", props);
    return "Produto cadastrado com sucesso!";
  } catch (error) {
    return `Erro ao cadastrar o produto. ${error}`;
  }
}

async function tratarVendas(props) {
  const { cliente, produto, quantidade } = props;

  if (cliente && cliente.length < 3) {
    return "Cliente inválido.";
  }
  if (!produto || !quantidade) {
    return "Preencha todos os campos.";
  }
  if (produto.length < 3) {
    return "Produto inválido.";
  }
  if (quantidade <= 0) {
    return "Quantidade inválida.";
  }

  try {
    await axios.post("/api/", props);
    return "Venda realizada com sucesso!";
  } catch (error) {
    return `Erro ao realizar a venda. ${error}`;
  }
}

export { verificarDadosCliente, verificarDadosProduto, tratarVendas };
