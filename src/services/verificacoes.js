/**
 * Valida os dados do cliente.
 * @param {Object} props
 * @param {string} props.nomeProduto - Deve ter pelo menos 3 caracteres.
 * @param {string} props.telefone - Deve conter apenas números (10 ou 11 dígitos).
 * @param {string} props.cpf - Deve ter exatamente 11 dígitos.
 * @param {string} props.cidade - Deve ter pelo menos 3 caracteres.
 * @returns {Object} { success: boolean, error?: string }
 */
const verificarDadosCliente = ({ nomeProduto, telefone, cpf, cidade }) => {
  if (!nomeProduto || !telefone || !cpf || !cidade) {
    return { success: false, error: "Preencha todos os campos." };
  }
  if (nomeProduto.trim().length < 3) {
    return {
      success: false,
      error: "nomeProduto inválido: deve ter pelo menos 3 caracteres.",
    };
  }
  if (cidade.trim().length < 3) {
    return {
      success: false,
      error: "Cidade inválida: deve ter pelo menos 3 caracteres.",
    };
  }
  const telefoneRegex = /^\d{10,11}$/;
  if (!telefoneRegex.test(telefone)) {
    return {
      success: false,
      error: "Telefone inválido: deve conter 10 ou 11 dígitos numéricos.",
    };
  }
  const cpfRegex = /^\d{11}$/;
  if (!cpfRegex.test(cpf)) {
    return {
      success: false,
      error: "CPF inválido: deve conter exatamente 11 dígitos.",
    };
  }
  return { success: true };
};

/**
 * Valida os dados do produto.
 * @param {Object} props
 * @param {string} props.nomeProduto - Deve ter pelo menos 3 caracteres.
 * @param {number} props.quantidade - Deve ser um número maior que 0.
 * @param {number} props.valor - Deve ser um número maior que 0.
 * @returns {Object} { success: boolean, error?: string }
 */
const verificarDadosProduto = ({ nomeProduto, quantidade, valor }) => {
  if (!nomeProduto || quantidade == null || valor == null) {
    return { success: false, error: "Preencha todos os campos." };
  }
  if (nomeProduto.trim().length < 3) {
    return {
      success: false,
      error: "Nome inválido: deve ter pelo menos 3 caracteres.",
    };
  }
  if (isNaN(quantidade) || Number(quantidade) <= 0) {
    return {
      success: false,
      error: "Quantidade inválida: deve ser um número maior que zero.",
    };
  }
  if (isNaN(valor) || Number(valor) <= 0) {
    return {
      success: false,
      error: "Valor inválido: deve ser um número maior que zero.",
    };
  }
  return { success: true };
};

/**
 * Verifica os dados de venda.
 * @param {Object} props
 * @param {string} [props.cliente] - Opcional, se informado deve ter pelo menos 3 caracteres.
 * @param {string} props.produto - Deve ter pelo menos 3 caracteres.
 * @param {number} props.quantidade - Deve ser um número maior que 0.
 * @returns {Object} { success: boolean, error?: string }
 */
const tratarVendas = async ({ cliente, produto, quantidade }) => {
  if (!produto || quantidade == null) {
    return { success: false, error: "Preencha todos os campos obrigatórios." };
  }
  if (produto.trim().length < 3) {
    return {
      success: false,
      error: "Produto inválido: deve ter pelo menos 3 caracteres.",
    };
  }
  if (isNaN(quantidade) || Number(quantidade) <= 0) {
    return {
      success: false,
      error: "Quantidade inválida: deve ser um número maior que zero.",
    };
  }
  if (cliente && cliente.trim().length > 0 && cliente.trim().length < 3) {
    return {
      success: false,
      error:
        "Cliente inválido: se informado, deve ter pelo menos 3 caracteres.",
    };
  }
  return { success: true };
};

/**
 * Verifica se um cliente já está cadastrado pelo CPF.
 * @param {string} cpf
 * @returns {Promise<Object>} { success: boolean, error?: string }
 */
const verificarClienteExiste = async (cpf) => {
  if (!cpf) {
    return { success: false, error: "CPF não informado." };
  }
  const checkQuery = `
    SELECT * FROM cliente WHERE cpf = $1;
  `;
  const checkValues = [cpf];
  try {
    const res = await postGres.query(checkQuery, checkValues);
    if (res.rows.length > 0) {
      console.log(`Cliente com CPF ${cpf} já está cadastrado.`);
      return { success: false, error: "Cliente já cadastrado." };
    }
    return { success: true };
  } catch (err) {
    console.error(`Erro ao verificar cliente ${cpf}:`, err);
    return { success: false, error: "Erro ao verificar cliente." };
  }
};

/**
 * Verifica se um produto já está cadastrado pelo nomeProduto.
 * @param {string} nomeProduto - nomeProduto do produto.
 * @returns {Promise<Object>} { success: boolean, error?: string }
 */
const verificarProdutoExiste = async (nomeProduto) => {
  if (!nomeProduto) {
    return { success: false, error: "nomeProduto do produto não informado." };
  }
  const checkQuery = `
    SELECT * FROM produto WHERE nomeProduto = $1;
  `;
  const checkValues = [nomeProduto];
  try {
    const res = await postGres.query(checkQuery, checkValues);
    if (res.rows.length > 0) {
      console.log(`Produto com nomeProduto ${nomeProduto} já está cadastrado.`);
      return { success: false, error: "Produto já cadastrado." };
    }
    return { success: true };
  } catch (err) {
    console.error(`Erro ao verificar produto ${nomeProduto}:`, err);
    return { success: false, error: "Erro ao verificar produto." };
  }
};

export {
  verificarDadosCliente,
  verificarDadosProduto,
  tratarVendas,
  verificarClienteExiste,
  verificarProdutoExiste,
};
