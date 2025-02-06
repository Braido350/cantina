import { AuthContext } from "@/context/auth";
import { useContext } from "react";

export const PrivateRoutes = ({ children }) => {
  const { segned } = useContext(AuthContext);

  return segned ? { children } : redirect("/vender");
};
