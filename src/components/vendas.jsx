"use client";

import { useState } from "react";
import React from "react";

function CadastrarProduto() {
  const [quantidade, setQuantidade] = useState(1);
  const [produtos, setProdutos] = useState("");
  const [cliente, setCliente] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `Produto: ${produtos} - Cliente: ${cliente} - Quantidade: ${quantidade}`
    );
  };

  return (
    <div className="box-border h-auto w-[600px] p-4 border-4 rounded-2xl bg-white">
      <div className="w-full aspect-auto">
        <h1 className="text-center text-black text-3xl font-semibold mb-6">
          Vender
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="produto"
          >
            Nome do produto
          </label>
          <input
            onSubmit={handleSubmit}
            type="text"
            id="produto"
            value={produtos}
            onChange={(e) => setProdutos(e.target.value)}
            placeholder="Nome do produto"
            className="w-full px-4 py-2 text-lg text-gray-800 bg-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="cliente"
          >
            Cliente
          </label>
          <input
            type="text"
            id="cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            placeholder="(opcional)"
            className="w-full px-4 py-2 text-lg text-gray-800 bg-gray-300 rounded"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label
            className="block text-gray-700 font-medium mr-4"
            htmlFor="quantidade"
          >
            Quantidade:
          </label>
          <input
            type="number"
            id="quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            className="px-4 py-2 w-24 text-lg text-gray-800 bg-gray-300 rounded"
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Vender
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CadastrarProduto;
