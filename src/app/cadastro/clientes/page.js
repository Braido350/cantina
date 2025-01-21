"use client";
import React from "react";
import CadastroClientes from "@/components/cadastro/Clientes";

export default function cadastro() {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex justify-center itens-center size-full">
        <CadastroClientes />
      </div>
    </div>
  );
}
