"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storageToken = localStorage.getItem("@Auth:token");
    const storageNomeUsuario = localStorage.getItem("@Auth:nome_usuario");

    if (storageToken && storageNomeUsuario) {
      setUser(storageNomeUsuario);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
    }
  }, []);

  const signIn = async ({ nome_usuario, senha }) => {
    try {
      const response = await axios.post("/api/auth", {
        nome_usuario,
        senha,
      });
      if (response.data.error) {
        alert(response.data.error);
        return;
      }
      const { token } = response.data;
      setUser(nome_usuario);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("@Auth:token", token);
      localStorage.setItem("@Auth:nome_usuario", nome_usuario);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        console.error("Erro ao tentar logar:", err);
        alert("Erro ao tentar logar");
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
