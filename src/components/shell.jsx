"use client";

import { useState } from "react";
import React from "react";
import Input from "./input/Shell";

function Vender() {
  const [vender, setVender] = useState([
    {
      id: 1,
      txt: "Nome do produto",
      placeholder: "Nome do Produto",
      name: "produto",
    },
    {
      id: 2,
      txt: "Cliente",
      placeholder: "(Opicional)",
      name: "produto",
    },
    {
      id: 3,
      txt: "Quantidade",
      placeholder: "",
      name: "quantidade",
    },
  ]);

  return (
    <div className="box-border h-auto w-[600px] size-auto p-4 border-4 rounded-2xl bg-white">
      <div className="w-full aspect-auto">
        <h1 className="text-center text-black text-3xl font-semibold mb-6">
          Vender
        </h1>
      </div>
      <Input imp={vender} />
    </div>
  );
}

export default Vender;
