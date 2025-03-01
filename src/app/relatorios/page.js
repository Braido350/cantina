import React from "react";
import Relatorios from "./relatorios";

export default async function Vender() {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex justify-center itens-center size-full">
        <Relatorios />
      </div>
    </div>
  );
}
