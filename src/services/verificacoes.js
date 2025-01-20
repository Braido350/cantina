import axios from 'axios';

// import cadastroInPostgres from "./cadastroInPostgres.js";
// cadastroInPostgres na verdade deve ser um post hhtp para o backend

const verificacoes = {
  verificarDadosCliente: async (props) => {
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

    try {
      await axios.post('/api/cadastro', props);
      return "Cliente cadastrado com sucesso!";
    } catch (error) {
      return `Erro ao cadastrar cliente. ${error}`;
    }
  },
  verificarDadosProduto: async (props) => {
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
      await axios.post('/api/cadastro', props);
      return "Produto cadastrado com sucesso!";
    } catch (error) {
      return `Erro ao verificar o produto. ${error}`;
    }
  },

  tratarVendas: async (props) => {
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
      await axios.post('/api/cadastro', props);
      return "Venda realizada com sucesso!";
    } catch (error) {
      return `Erro ao realizar a venda. ${error}`;
    }
  },
};

export default verificacoes;
