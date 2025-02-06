"use client";

import { AuthContext } from "@/context/auth";
import React, { useContext } from "react";
import Form from "next/form";

export default function VerificarLogin() {
  const { signIn } = useContext(AuthContext);

  async function handleAction(formData) {
    const nome_usuario = formData.get("nome_usuario");
    const senha = formData.get("senha");
    console.log("Dados do formulário:", { nome_usuario, senha });
    await signIn({ nome_usuario, senha });
  }

  return (
    <Form
      action={handleAction}
      className="box-border h-auto w-[400px] size-auto p-4 border-4 rounded-2xl bg-white"
    >
      <div className="w-full aspect-auto">
        <h2>Login</h2>
      </div>
      <div className="flex flex-col gap-3">
        <label>
          Nome de Usuário
          <input name="nome_usuario" required />
        </label>
        <label>
          Senha
          <input name="senha" type="password" required />
        </label>
        <button
          type="submit"
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Entrar
        </button>
      </div>
    </Form>
  );
}
