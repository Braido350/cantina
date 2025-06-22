"use server";

import { signIn } from "../../../auth";

export async function Signin(formData: FormData) {
  console.log("Signin");
  console.log(formData);

  const result = await signIn("credentials", {
    nome_usuario: formData.get("nome_usuario"),
    senha: formData.get("senha"),
    redirect: true,
    redirectTo: "/vender",
  });
  return { success: true, message: "Usuário autenticado" };
}
