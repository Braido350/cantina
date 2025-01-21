"use server";

import postGres from "./db";
import {
  verificarDadosCliente,
  verificarDadosProduto,
  tratarVendas,
  verificarClienteExiste,
} from "./verificacoes.js";

const criarDadosProdutos = async () => {
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
};

const criarDadosClientes = async () => {
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
};
const cadastrarClientes = async (cliente) => {
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
};

const cadastrarProdutos = async () => {
  const produtos = verificacoes();

  for (const produto of produtos) {
    const query = `
      INSERT INTO produtos (nome, quantidade, valor)
      VALUES ($1, $2, $3)
      ON CONFLICT (nome) DO NOTHING;
    `;
    const values = [produto.nome, produto.quantidade, produto.valor];
    try {
      await postGres.query(query, values);
      console.log(`Produto ${produto.nome} cadastrado com sucesso!`);
    } catch (err) {
      console.error(`Erro ao cadastrar produto ${produto.nome}:`, err);
    }
  }
};

const getProdutos = async (req, res) => {
  const { rows } = await postGres.query(`SELECT * FROM produtos;`);
  return rows;
};

const getClientes = async (req, res) => {
  const { rows } = await postGres.query(`SELECT * FROM client;`);
  return rows;
};

const testConnection = async () => {
  const { rows } = await postGres.query("SELECT NOW()");
  return rows;
};

export {
  criarDadosProdutos,
  criarDadosClientes,
  cadastrarClientes,
  cadastrarProdutos,
  getProdutos,
  getClientes,
  testConnection,
};
