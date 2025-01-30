"use client";
import { createContext, useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadingStoreData = async () => {
      const storageToken = localStorage.getItem("@Auth:token");
      const storageUser = localStorage.getItem("@Auth:user");

      if (storageToken && storageUser) {
        setUser(storageToken);
      }
    };
    loadingStoreData();
  }, []);

  const Signin = async ({ name_usuario, senha }) => {
    const response = await fetch("/api/login", {
      name_usuario,
      senha,
    });

    if (response.data.error) {
      alert(response.data.error);
    } else {
      setUser(response.data);
      localStorage.setItem("@Auth:token", response.data.token);
      localStorage.setItem("@Auth:user", response.data.name_usuario);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, Signin }}>
      {children}
    </AuthContext.Provider>
  );
};
