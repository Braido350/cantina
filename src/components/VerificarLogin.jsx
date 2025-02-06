"use client";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { AuthContext } from "@/context/auth";
import Form from "next/form";

export default function VerificarLogin() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { signIn } = useContext(AuthContext);

  const onSubmit = async (data) => {
    await handleSave({ preventDefault: () => {} }, data, reset());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="box-border h-auto w-[400px] size-auto p-4 border-4 rounded-2xl bg-white"
    >
      <div className="w-full aspect-auto">
        <h1 className="text-center text-black text-3xl font-semibold mb-6"></h1>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <label className="text-gray-700 text-1xl font-semibold flex flex-col ">
            Nome de usuário
          </label>
          <input
            type="text"
            {...register("nome_usuario", { required: true, minLength: 1 })}
            placeholder="Nome do usuário"
            className="w-full px-4 py-2 text-lg text-gray-800 bg-gray-300 rounded"
          />
        </div>
        <div>
          <label className="text-gray-700 text-1xl font-semibold flex flex-col">
            Senha
          </label>
          <input
            type="text"
            {...register("senha", { required: true, minLength: 1 })}
            placeholder="Sua senha"
            className="w-full px-4 py-2 text-lg text-gray-800 bg-gray-300 rounded"
          />
        </div>
        <button
          onClick={handleSubmit((data) => {
            onSubmit(data);
            reset();
            console.log(data);
          })}
          className="px-20 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Entrar
        </button>
      </div>
    </form>
  );
}
