import React from "react";
import VerificarLogin from "../components/VerificarLogin";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center">
<<<<<<< HEAD
<<<<<<< HEAD
      <div className="flex justify-center itens-center size-full">
        <VerificarLogin />
=======
      <div className="box-border h-auto w-[400px] p-4 border-4 rounded-2xl bg-white justify-center itens-center size-full">
        <div className="w-full aspect-auto">
          <h2>Login</h2>
          <VerificarLogin />
        </div>
>>>>>>> b1ee5f7 (refatora autenticação para usar axios, melhora tratamento de erros e ajusta estrutura de componentes)
=======
      <div className="flex justify-center itens-center size-full">
        <VerificarLogin />
>>>>>>> f289c2b (funcionando)
      </div>
    </div>
  );
}
