"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { handleUsuarios } from "@/services/handle";

export default function CadastroUsuarios() {
  const { handleSave } = handleUsuarios;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await handleSave({ preventDefault: () => {} }, data, reset());
  };

  const handleCancelar = () => {
    reset();
    alert("Ação cancelada");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="box-border h-auto w-[600px] size-auto p-4 border-4 rounded-2xl bg-white"
    >
      <div className="w-full aspect-auto">
        <h2>Cadastro de Usuário</h2>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <label>Nome Completo</label>
          <input
            type="text"
            {...register("nome", { required: true })}
            placeholder="Nome"
          />
          {errors?.quantidade?.type === "required" && (
            <p className="text-red-400">Informe a Quantidade.</p>
          )}
          {errors?.quantidade?.type === "min" && (
            <p className="text-red-400">Tem que ser maior que 0.</p>
          )}
        </div>
        <div>
          <label>Nome de usuário</label>
          <input
            type="text"
            {...register("nome_usuario", { required: true, minLength: 4 })}
            placeholder="Nome do Usuário"
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="text"
            {...register("senha", { required: true, minLength: 6 })}
            placeholder="sua senha"
          />
          <p className="text-gray-400 text-sm">
            NÃO coloque caracteres especiais como # $ @ !
          </p>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handleSubmit((data) => {
              onSubmit(data);
              reset();
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
    </form>
  );
}
