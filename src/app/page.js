"use client";
import React from "react";
import VerificarLogin from "@/components/VerificarLogin";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex justify-center itens-center size-full">
        <VerificarLogin />
      </div>
    </div>
  );
}
