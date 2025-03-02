import axios from "axios";

/**
 * Valida os dados do cliente.
 * @param {Object} props
 * @param {string} props.nome - Deve ter pelo menos 3 caracteres.
 * @param {string} props.telefone - Deve conter apenas números (10 ou 11 dígitos).
 * @param {string} props.cpf - Deve ter exatamente 11 dígitos.
 * @param {string} props.cidade - Deve ter pelo menos 3 caracteres.
 * @returns {Promise<Object>} { success: boolean, error?: string }
 */
const verificarDadosCliente = async ({ nome, telefone, cpf, cidade }) => {
  console.log(nome, telefone, cpf, cidade);
  if (!nome || !telefone || !cpf || !cidade) {
    return { success: false, error: "Preencha todos os campos." };
  }
  if (nome.trim().length < 3) {
    return {
      success: false,
      error: "Nome inválido: deve ter pelo menos 3 caracteres.",
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
  const response = await axios.get("/api/registerClient");
  console.log("existingClients:", response.data);
  const clientFound = response.data.find((item) => item.cpf === cpf);

  console.log("clientFound:", clientFound);
  if (clientFound) {
    return { success: false, error: "Cliente já existe no sistema." };
  }

  return { success: true };
};

/**
 * Valida os dados do produto.
 * @param {Object} props
 * @param {string} props.nome - Deve ter pelo menos 3 caracteres.
 * @param {number} props.quantidade - Deve ser um número maior que 0.
 * @param {number} props.valor - Deve ser um número maior que 0.
 * @returns {Object} { success: boolean, error?: string }
 */
const verificarDadosProduto = async ({ nome, quantidade, valor }) => {
  if (!nome || quantidade == null || valor == null) {
    return { success: false, error: "Preencha todos os campos." };
  }
  if (nome.trim().length < 3) {
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
  const valorConvertido = Number(valor.toString().replace(",", "."));
  if (isNaN(valorConvertido) || valorConvertido <= 0) {
    return {
      success: false,
      error: "Valor inválido: deve ser um número maior que zero.",
    };
  }
  const existingClients = await axios.get("/api/registerProducts");
  const clientFound = existingClients.data.some((p) => p.nome === nome);
  if (clientFound) {
    return { success: false, error: "Produto já cadastrado" };
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

export { verificarDadosCliente, verificarDadosProduto, tratarVendas };
