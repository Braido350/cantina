// Desc: Funções para verificar dados de cliente, produto e venda
const verificarDadosCliente = (props) => {
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
  return { success: true };
};

const verificarDadosProduto = async (props) => {
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
};

const tratarVendas = async (props) => {
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
};

const verificarClienteExiste = async (cpf) => {
  const checkQuery = `
    SELECT * FROM client WHERE cpf = $1;
  `;
  const checkValues = [cpf];
  try {
    const res = await postGres.query(checkQuery, checkValues);
    if (res.rows.length > 0) {
      console.log(`Cliente com CPF ${cpf} já está cadastrado.`);
      return { error: "Cliente já cadastrado" };
    }
  } catch (err) {
    console.log(`Erro ao verificar cliente ${cpf}:`, err);
    return { error: "Erro ao verificar cliente" };
  }
};

export {
  verificarDadosCliente,
  verificarDadosProduto,
  tratarVendas,
  verificarClienteExiste,
};
