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

const verificarDadosProduto = (props) => {
  const { nomeProduto, Quantidade, Valor } = props;

  if (!nomeProduto || !Quantidade || !Valor) {
    return { error: "Preencha todos os campos." };
  }
  if (nomeProduto.length < 3) {
    return { error: "Nome inválido. Deve ter pelo menos 3 caracteres." };
  }
  if (Quantidade <= 0 || isNaN(Quantidade)) {
    return { error: "Quantidade inválida. Deve ser um número maior que zero." };
  }
  if (Valor <= 0 || isNaN(Valor)) {
    return { error: "Valor inválido. Deve ser um número maior que zero." };
  }
  return { success: true };
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

const verificarProdutoExiste = async (nomeProduto) => {
  const checkQuery = `
    SELECT * FROM produto WHERE nome = $1;
  `;
  const checkValues = [nomeProduto];
  try {
    const res = await postGres.query(checkQuery, checkValues);
    if (res.rows.length > 0) {
      console.log(`Produto com nome ${nomeProduto} já está cadastrado.`);
      return { error: "Produto já cadastrado" };
    }
  } catch (err) {
    console.log(`Erro ao verificar produto ${nomeProduto}:`, err);
    return { error: "Erro ao verificar produto" };
  }
};
export {
  verificarDadosCliente,
  verificarDadosProduto,
  tratarVendas,
  verificarClienteExiste,
  verificarProdutoExiste,
};
