"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleUsuarios } from "../../../services/handle";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CadastroUsuarios() {
  const { handleSave } = handleUsuarios;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // espera carregar a sessão
    if (!session) {
      // router.push("/");
    }
  }, [session, status, router]);

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
      className="box-border h-auto w-[600px] p-4 border-4 rounded-2xl bg-white"
    >
      <div className="w-full">
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
          {errors.nome && <p className="text-red-400">Informe o Nome.</p>}
        </div>
        <div>
          <label>Nome de Usuário</label>
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
            placeholder="Sua senha"
          />
          <p className="text-gray-400 text-sm">
            NÃO coloque caracteres especiais como #, $, @, !
          </p>
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Salvar
          </button>
          <button
            type="button"
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
