"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select/async";
import { getClientes } from "../../services/getClientes";
import { FaBan } from "react-icons/fa6";
import axios from "axios";

const ValorTotal = ({ produtos }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cliente: null,
    },
  });

  console.log("produtos", produtos);

  const [produtosData, setProdutosData] = useState([]);

  // Atualiza os dados dos produtos sempre que "produtos" mudar (acrescentando novos itens)
  useEffect(() => {
    if (Array.isArray(produtos)) {
      const newProducts = produtos.map((item) => ({
        label: item.produto.label,
        valor: item.valor,
        qty: Number(item.quantidade) || 1,
        ID: item.produto.id,
      }));
      setProdutosData((prev) => [...prev, ...newProducts]);
    }
  }, [produtos]);

  // Limpa o formulário e a lista de produtos
  const handleCancelar = () => {
    reset({
      cliente: null,
    });
    setProdutosData([]);
  };

  // Remove um item da lista
  const handleRemoveItem = (indexToRemove) => {
    setProdutosData((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  // Função debounce para otimizar as buscas
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Busca os clientes filtrados com debounce
  const fetchClientes = async (inputValue, callback) => {
    const clientes = await getClientes();
    const filteredClientes = clientes.filter((c) =>
      c.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filteredClientes);
  };

  const promiseClientes = useCallback(debounce(fetchClientes, 1000), []);

  // Submete os dados para registrar a venda
  const onSubmit = async (data) => {
    const payload = {
      produtosData,
      ...data,
    };
    const response = await axios.post("/api/registerSell", payload);
    console.log("payload", response);
    return response.status;
  };

  const totalPrice = produtosData.reduce(
    (acc, item) => acc + item.valor * item.qty,
    0
  );
  const totalQty = produtosData.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="text-left w-full">
      <h2 className="text-lg text-center font-semibold ml-3 text-slate-800">
        Lista de Compras
      </h2>
      <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table
          id="productTable"
          className="w-full text-left table-auto min-w-max"
        >
          <thead>
            <tr>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Nome do Produto
                </p>
              </th>

              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  QTD
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Valor
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Total
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Ação
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {produtosData.map((produto, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800">
                    {produto.label}
                  </p>
                </td>

                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800">{produto.qty}</p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800">
                    ${produto.valor.toFixed(2)}
                  </p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800">
                    R${(produto.valor * produto.qty).toFixed(2)}
                  </p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    <FaBan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan="2"
                className="p-4 text-left font-bold text-slate-800 border-t border-slate-300"
              >
                Total:
              </td>
              <td
                colSpan="2"
                className="p-4 font-bold text-slate-800 border-t border-slate-300"
              >
                {totalQty}
              </td>
              <td
                colSpan="2"
                className="p-4 font-semibold text-slate-800 border-t border-slate-300"
              >
                ${totalPrice.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="text-gray-700 text-xl font-semibold mb-2 flex flex-col">
        <label>Cliente</label>
        <Controller
          rules={{ required: true }}
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
            />
          )}
        />
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handleSubmit((data) => {
            onSubmit(data);
            handleCancelar();
          })}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Carrinho
        </button>
        <button
          onClick={handleCancelar}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ValorTotal;
