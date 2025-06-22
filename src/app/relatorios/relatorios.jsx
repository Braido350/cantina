"use client";

import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select/async";
import { Controller, useForm } from "react-hook-form";
import { getClientes } from "../../services/getClientes";
import { getSell } from "../../services/getSell";
import { BuscarProdutos } from "./buscarProdutos";

function Relatorios() {
  const { control, handleSubmit } = useForm({
    defaultValues: { cliente: null },
  });
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [vendas, setVendas] = useState([]);

  // Função debounce para otimizar a busca
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const fetchClientes = async (inputValue, callback) => {
    const clientes = await getClientes();
    const filteredClientes = clientes.filter((c) =>
      c.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filteredClientes);
  };

  const promiseClientes = useCallback(debounce(fetchClientes, 1000), []);

  const onSubmit = async () => {
    if (!selectedCliente) {
      alert("Por favor, selecione um cliente.");
      return;
    }
    try {
      const response = await getSell();
      const idClient = selectedCliente.value;
      let filteredVendas = response.filter(
        (venda) => venda.idCliente === idClient
      );
      filteredVendas = await BuscarProdutos(filteredVendas);
      setVendas(filteredVendas);
    } catch (error) {
      console.error("Erro ao carregar vendas:", error);
    }
  };

  // Calcula o valor total das vendas
  const totalGeral = vendas.reduce((acc, venda) => acc + venda.valorTotal, 0);

  return (
    <div className="p-4 border-4 rounded-2xl bg-white max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-4">
        Relatórios de Clientes
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Selecione um cliente:
          </label>
          <Controller
            name="cliente"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                cacheOptions
                defaultOptions
                loadOptions={promiseClientes}
                placeholder="Nome do Cliente"
                className="w-full text-lg text-gray-800 bg-gray-300 rounded"
                isClearable
                onChange={(selectedOption) => {
                  field.onChange(selectedOption);
                  setSelectedCliente(selectedOption);
                }}
              />
            )}
          />
        </div>

        <div className="flex justify-end mb-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Gerar Relatório
          </button>
        </div>
      </form>

      <div className="mt-6">
        {vendas.length === 0 ? (
          <p className="text-center text-gray-600">
            Nenhum relatório disponível.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left table-auto bg-white shadow-md rounded-lg">
              <thead>
                <tr>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    ID Venda
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    Produto
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    Data
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    Horário
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    Quantidade
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    Valor Produto
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    Valor Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {vendas.map((venda) => (
                  <tr key={venda.id} className="hover:bg-slate-100">
                    <td className="p-4 border-b border-slate-200">
                      {venda.id}
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      {venda.nomeProduto}
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      {new Date(venda.data).toLocaleDateString()}
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      {new Date(venda.data).toLocaleTimeString()}
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      {venda.quantidade}
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      R${venda.valorProduto.toFixed(2)}
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      R${venda.valorTotal.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan="6"
                    className="p-4 text-right font-bold text-slate-800 border-t border-slate-300"
                  >
                    Total Geral:
                  </td>
                  <td
                    colSpan="1"
                    className="p-4 font-bold text-slate-800 border-t border-slate-300"
                  >
                    R${totalGeral.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Relatorios;
