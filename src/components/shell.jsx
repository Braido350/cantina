"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select/async";
import { getClientes } from "@/services/getClientes";
import { getProdutos } from "@/services/getProdutos";

function Shell() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      produto: "",
      quantidade: 1,
    },
  });

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
  const fetchProdutos = async (inputValue, callback) => {
    const Produtos = await getProdutos();
    const filteredProdutos = Produtos.filter((c) =>
      c.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filteredProdutos);
  };

  const promiseClientes = debounce(fetchClientes, 1000);
  const promiseProdutos = debounce(fetchProdutos, 1000);

  const onSubmit = (data) => {
    console.log(data);
  };
  const handleCancelar = () => {
    reset({
      produto: null,
      quantidade: 1,
      cliente: null,
    });
  };

  return (
    <div className="box-border h-auto w-[600px] size-auto p-4 border-4 rounded-2xl bg-white">
      <div className="w-full aspect-auto">
        <h1 className="text-center text-black text-3xl font-semibold mb-6">
          Vender
        </h1>
        <div className="text-gray-700 text-1xl font-semibold mb-2 flex flex-col">
          <label className="px-2">Produto</label>
          <Controller
            rules={{ required: true }}
            name="produto"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                cacheOptions
                defaultOptions
                loadOptions={promiseProdutos}
                className="w-full text-lg text-gray-800 bg-gray-300 rounded"
                placeholder="Nome do produto"
              />
            )}
          />
          {errors?.produto?.type === "required" && (
            <p className="text-red-400">Informe o Produto.</p>
          )}
        </div>
        <div className="text-gray-700 text-1xl font-semibold mb-2 flex flex-col">
          <label className="px-2">Cliente</label>
          <Controller
            name="cliente"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                cacheOptions
                defaultOptions
                loadOptions={promiseClientes}
                placeholder="Nome do Cliente (opcional)"
                className="w-full text-lg text-gray-800 bg-gray-300 rounded"
              />
            )}
          />
          <div className="text-gray-700 text-1xl font-semibold mb-2 flex flex-col mt-2">
            <label className="px-2">Quantidade</label>
            <select
              type="number"
              defaultValue="1"
              className="text-gray-700 text-1xl font-semibold mt-1 bg-gray-200 p-2.5 rounded"
              {...register("quantidade", { required: true, min: 1 })}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {errors?.quantidade?.type === "required" && (
              <p className="text-red-400">Informe a Quantidade.</p>
            )}
            {errors?.quantidade?.type === "min" && (
              <p className="text-red-400">Tem que ser maior que 0.</p>
            )}
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handleSubmit((data) => {
              onSubmit(data);
              handleCancelar();
            })}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Vender
          </button>
          <button
            onClick={handleCancelar}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Shell;
