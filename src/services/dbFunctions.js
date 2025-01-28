"use server";

import postGres from "./db";
import {
  verificarDadosCliente,
  verificarDadosProduto,
  tratarVendas,
  verificarClienteExiste,
} from "./verificacoes.js";

export const usuarios = {
  criarDadosUsuarios: async () => {
    const query = `
     CREATE TABLE IF NOT EXISTS usuarios (
       id SERIAL PRIMARY KEY,
       nome VARCHAR(256) NOT NULL,
       nome_usuario VARCHAR(256) NOT NULL UNIQUE,
       senha VARCHAR(256) NOT NULL
     );
   `;
    try {
      await postGres.query(query);
      console.log("Tabela de usuários criada com sucesso!");
    } catch (err) {
      console.error("Erro ao criar tabela de usuários:", err);
    }
  },
  cadastroUsuario: async (nome, nome_usuario, senha) => {
    const query = `INSERT INTO usuarios (nome, nome_usuario, senha)
    VALUES ($1, $2, $3)
    RETURNING *;`;
    const value = [nome, nome_usuario, senha];
    try {
      const res = await postGres.query(query, value);
      return res.rows[0];
    } catch (error) {
      console.error("Erro ao cadastrar usuario:", error);
      return { error: "Erro ao cadastrar usuario" };
    }
  },
  getUsuario: async () => {
    try {
      const { rows } = await postGres.query(`SELECT * FROM usuarios;`);
      return rows;
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      return { error: "Erro ao buscar produtos" };
    }
  },
};

export const produtos = {
  criarDadosProdutos: async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS produtos (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(256) NOT NULL,
        quantidade INT NOT NULL,
        valor DECIMAL(10, 2) NOT NULL
      );
    `;
    try {
      await postGres.query(query);
      console.log("Tabela de produtos criada com sucesso!");
    } catch (err) {
      console.error("Erro ao criar tabela de produtos:", err);
    }
  },
  cadastrarProdutos: async (produtos) => {
    for (const produto of produtos) {
      const validacao = verificarDadosProduto(produto);
      if (validacao.error) {
        console.log(validacao.error);
        return { error: validacao.error };
      }

      const query = `
        INSERT INTO produtos (nome, quantidade, valor)
        VALUES ($1, $2, $3)
        ON CONFLICT (nome) DO NOTHING
        RETURNING *;
      `;
      const values = [produto.nome, produto.quantidade, produto.valor];
      try {
        const res = await postGres.query(query, values);
        if (res.rows.length > 0) {
          console.log(`Produto ${produto.nome} cadastrado com sucesso!`);
        } else {
          console.log(`Produto ${produto.nome} já está cadastrado.`);
        }
      } catch (err) {
        console.error(`Erro ao cadastrar produto ${produto.nome}:`, err);
        return { error: `Erro ao cadastrar produto ${produto.nome}` };
      }
    }
    return { success: true };
  },
  getProdutos: async () => {
    try {
      const { rows } = await postGres.query(`SELECT * FROM produtos;`);
      return rows;
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      return { error: "Erro ao buscar produtos" };
    }
  },
};

export const clientes = {
  criarDadosClientes: async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS client (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(256) NOT NULL,
        telefone VARCHAR(15) NOT NULL,
        cidade VARCHAR(50) NOT NULL,
        cpf VARCHAR(11) NOT NULL UNIQUE
      );
    `;
    try {
      await postGres.query(query);
      return "Tabela de clientes criada com sucesso!";
    } catch (err) {
      return "Erro ao criar tabela de clientes:", err;
    }
  },

  cadastrarClientes: async (cliente) => {
    const validacao = verificarDadosCliente(cliente);
    if (validacao.error) {
      console.log(validacao.error);
      return { error: validacao.error };
    }

    const clienteExiste = await verificarClienteExiste(cliente.cpf);
    if (clienteExiste && clienteExiste.error) {
      return { error: clienteExiste.error };
    }

    const query = `
      INSERT INTO client (nome, telefone, cidade, cpf)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (cpf) DO NOTHING
      RETURNING *;
    `;
    const values = [
      cliente.nomeCliente,
      cliente.telefone,
      cliente.cidade,
      cliente.cpf,
    ];
    try {
      const res = await postGres.query(query, values);
      if (res.rows.length > 0) {
        console.log(`Cliente ${cliente.nomeCliente} cadastrado com sucesso!`);
        return {
          success: true,
          cliente: res.rows[0],
        };
      } else {
        console.log(`Cliente com CPF ${cliente.cpf} já está cadastrado.`);
        return { error: "Cliente já cadastrado" };
      }
    } catch (err) {
      console.log(`Erro ao cadastrar cliente ${cliente.nomeCliente}:`, err);
      return { error: "Erro ao cadastrar cliente" };
    }
  },
  getClientes: async () => {
    try {
      const { rows } = await postGres.query(`SELECT * FROM client;`);
      return rows;
    } catch (err) {
      console.error("Erro ao buscar clientes:", err);
      return { error: "Erro ao buscar clientes" };
    }
  },
};

export const vendas = {
  criarDadosVendas: async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS vendas (
        id SERIAL PRIMARY KEY,
        client_id INT NOT NULL,
        produto_id INT NOT NULL,
        quantidade INT NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    try {
      await postGres.query(query);
      console.log("Tabela de vendas criada!");
    } catch (err) {
      console.error("Erro ao criar tabela de vendas:", err);
    }
  },

  cadastrarVenda: async ({ clientId, produtoId, quantidade, total }) => {
    const query = `
      INSERT INTO vendas (client_id, produto_id, quantidade, total)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [clientId, produtoId, quantidade, total];
    try {
      const res = await postGres.query(query, values);
      return res.rows[0];
    } catch (err) {
      console.error("Erro ao cadastrar venda:", err);
      return { error: "Erro ao cadastrar venda" };
    }
  },
};

export const testConnection = async () => {
  try {
    const { rows } = await postGres.query("SELECT NOW()");
    return rows;
  } catch (err) {
    console.error("Erro ao testar conexão:", err);
    return { error: "Erro ao testar conexão" };
  }
};
