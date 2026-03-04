import React from "react";
import Login from "../screens/login/Login"; // caminho ajusta conforme tua estrutura

const PublicLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #386641, #6A994e)",
      }}
    >
      <Login />

     
    </div>
  );
};

export default PublicLayout;
