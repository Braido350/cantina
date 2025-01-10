// import cadastroInPostgres from "./cadastroInPostgres.js";
// cadastroInPostgres na verdade deve ser um post hhtp para o backend

const verificacoes = {
  verificarDadosCliente: (props) => {
    const { nomeCliente, telefone, cpf, cidade } = props;

    if (!nomeCliente || !telefone || !cpf || !cidade) {
      return "Preencha todos os campos.";
    }
    if (nomeCliente.length < 3) {
      return "Nome inválido.";
    }
    if (cidade.length < 3) {
      return "Cidade inválida.";
    }
    if (telefone.length <= 8) {
      return "Telefone inválido.";
    }
    if (cpf.length <= 11) {
      return "CPF inválido.";
    }
    // cadastroInPostgres.criarDadosClientes(nomeCliente, telefone, cidade, cpf);
    return "Cliente cadastrado com sucesso!";
  },
  verificarDadosProduto: (props) => {
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
    // cadastroInPostgres.criarDadosProdutos(nomeProduto, quantidade, valor);
    return "Produto cadastrado com sucesso!";
  },

  tratarVendas: (props) => {
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
    return "Venda realizada com sucesso!";
  },
};

export default verificacoes;
