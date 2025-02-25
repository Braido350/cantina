"use client";

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f289c2b (funcionando)
import { AuthContext } from "../context/auth";
import React, { useContext } from "react";
import Form from "next/form";
=======
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Signin } from "../services/controller/SignIn";
import { redirect } from "next/dist/server/api-utils";
>>>>>>> b1ee5f7 (refatora autenticação para usar axios, melhora tratamento de erros e ajusta estrutura de componentes)

export default function VerificarLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    await axios
      .post("/api/usuario", {
        nome_usuario: data.nome_usuario,
        senha: data.senha,
      })
      .then(() => {
        const formData = new FormData();
        formData.append("nome_usuario", data.nome_usuario);
        formData.append("senha", data.senha);

        const signinResponse = Signin(formData);
        return redirect("/vender");
      })
      .catch((err) => {
        setErrorMessage(`${err.response.status} - ${err.response.data.error}`);
        return;
      });
  };

  // console.log(errorMessage);

  return (
    <>
      {errorMessage && (
        <div
          className="text-xs mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Erro! </strong>
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <label>
            Nome de Usuário
            <input
              {...register("nome_usuario", { required: "Campo obrigatório" })}
              required
            />
          </label>
          {errors.nome_usuario && (
            <span className="text-xs text-red-500">
              {errors.nome_usuario.message}
            </span>
          )}
          <label>
            Senha
            <input
              type="password"
              {...register("senha", { required: "Campo obrigatório" })}
              required
            />
          </label>
          {errors.senha && (
            <span className="text-xs text-red-500">{errors.senha.message}</span>
          )}
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            disabled={isSubmitting}
          >
            Entrar
          </button>
        </div>
      </form>
    </>
  );
}
