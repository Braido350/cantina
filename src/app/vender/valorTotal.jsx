"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select/async";
import axios from "axios";
import { FaBan } from "react-icons/fa6";
import { getClientes } from "../../services/getClientes";

const ValorTotal = ({ produtos }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      cliente: null,
    },
  });

  const [produtosData, setProdutosData] = useState([]);

  useEffect(() => {
    if (Array.isArray(produtos)) {
      const newProducts = produtos.map((item) => ({
        label: item?.produto?.label ?? "Sem Nome",
        valor: Number(item?.produto?.valor) || 0,
        qty: Number(item?.quantidade) || 1,
        desconto: parseFloat(item?.desconto) || 0,
        valorDesconto: parseFloat(item?.valorDesconto) || 0,
        ID: item?.produto?.value,
      }));
      setProdutosData((prev) => [...prev, ...newProducts]);
    }
  }, [produtos]);

  const handleCancelar = () => {
    reset({ cliente: null });
    setProdutosData([]);
  };

  const handleRemoveItem = (indexToRemove) => {
    setProdutosData((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const fetchClientes = async (inputValue, callback) => {
    try {
      const clientes = await getClientes();
      const filtered = clientes.filter((c) =>
        c.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      callback(filtered);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      callback([]);
    }
  };

  const promiseClientes = useCallback(debounce(fetchClientes, 800), []);

  const onSubmit = async (data) => {
    const payload = { produtosData, ...data };
    await axios.post("/api/registerSell", payload);
    handleCancelar();
  };

  const totalQty = produtosData.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = produtosData.reduce(
    (acc, item) => acc + item.valorDesconto,
    0
  );

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
                  Valor/Desconto
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
            {produtosData.map((produto, index) => {
              const totalItem = produto.valorDesconto;
              const desconto = produto.desconto;
              return (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">
                      {produto.label}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">
                      {produto.qty}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">
                      R${produto.valor.toFixed(2)}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">
                      R${desconto.toFixed(2)}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">
                      R${totalItem.toFixed(2)}
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
              );
            })}
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
                {totalQty} itens
              </td>
              <td
                colSpan="2"
                className="p-4 font-semibold text-slate-800 border-t border-slate-300"
              >
                R${totalPrice.toFixed(2)}
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
          onClick={handleSubmit((data) => onSubmit(data))}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Salvar Venda
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
