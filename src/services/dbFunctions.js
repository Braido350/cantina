"use server";

import postGres from "../app/api/db.js";
import {
  verificarDadosCliente,
  verificarDadosProduto,
  tratarVendas,
  verificarClienteExiste,
} from "./verificacoesDB.js";

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
    return validacao;
  }

  const clienteExiste = await verificarClienteExiste(cliente.cpf);
  if (clienteExiste && clienteExiste.error) {
    return clienteExiste;
  }
  const query = `
    INSERT INTO client (nome, telefone, cidade, cpf)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (cpf) DO NOTHING;
  `;
  const values = [
    cliente.nomeCliente,
    cliente.telefone,
    cliente.cidade,
    cliente.cpf,
  ];
  try {
    await postGres.query(query, values);
    console.log(`Cliente ${cliente.nomeCliente} cadastrado com sucesso!`);
  } catch (err) {
    console.log(`Erro ao cadastrar cliente ${cliente.nome}:`, err);
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
